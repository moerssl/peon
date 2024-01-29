<template>
    <v-row>
      <v-col v-for="af in affixes?.affix_details" :key="af.id" :to="af.wowhead_url" :title="af.name">
       <v-card :href="af.wowhead_url" target="affix">
          <v-card-text>
            <h3 class="text-subtitle-1">{{ af.name }}</h3>
            <p>{{ af.description }}</p>
          </v-card-text>
          
       </v-card>
      </v-col>
    </v-row>
    <v-form ref="form">
      <v-row>
        <v-col>
          <v-text-field label="Realm" 
          v-model="realm" 
          required 
          @keydown.enter="add" 
          aria-required="true"
          :rules="[v => !!v || 'Der Realm wird benötigt.']"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Name" 
          v-model="name" 
          required 
          @keydown.enter="add" 
          aria-required="true"
          :rules="[v => !!v || 'Der Name wird benötigt.']"
          ></v-text-field>
        </v-col>
        <v-col  class="mt-2">
          <v-btn @click="add">Hinzufügen</v-btn>
          <v-btn @click="loadAll" class="ml-5">Aktualisieren</v-btn>
        </v-col>
      </v-row>
    </v-form>
    

      <draggableComponent
      v-model="chars" 
      group="people" 
      delay="500"
      delayOnTouchOnly="true"
      item-key="name"
      class="v-row"
      @end="save"
      
      >
      <template #item="{element}">
       

        <v-col cols="12" :lg="element.showMore ? 3 : 2"  @click="element.showMore = !element.showMore; save()" :id="'char-' + element.name+'-'+element.realm"><!-- /v-col>v-for="value in chars" -->
          <v-card class="pa-2" :class="{ char: element.cheese}">
            <v-card-title>
  
              {{ element.name }}
              
              <v-icon @click.stop="dismissVault(element)" class="text-subtitle-1" icon="mdi-treasure-chest-outline" v-if="element?.runs?.mythic_plus_previous_weekly_highest_level_runs?.length > 0 && element?.vaultDismissedForPeriod != euCurrentPeriod.period"></v-icon>
              <span class="text-subtitle-2" v-if="element?.runs">&nbsp;({{ element.runs.mythic_plus_scores_by_season[0].scores.all }})</span>
              <v-icon :icon="element.showMore ? 'mdi-chevron-down' : 'mdi-chevron-left'" class="float-right mt-2" size="small"></v-icon>
          </v-card-title>
            <v-card-text v-if="element.runs != undefined && element.runs.mythic_plus_weekly_highest_level_runs != undefined">
                <h3 class="text-subtitle-1">Aktuelle Woche</h3>
                <p class="text-center" v-if="element.runs.mythic_plus_weekly_highest_level_runs.length == 0"> - Noch keine Dungeons - </p>
                <v-row v-for="run in element.runs.mythic_plus_weekly_highest_level_runs" no-gutters :key="run.short_name">
                  <v-col>
                    {{ run.short_name }}
                  </v-col>
                  <v-col class="text-right">
                    {{ run.mythic_level }}
                  </v-col>
                  <v-col>
                    +{{ run.num_keystone_upgrades }}
                  </v-col>
                </v-row>

              <h3 class="text-subtitle-1" v-if="element.showMore">Wertung</h3>
              <RioRating :weekaffix="affixes?.affix_details[0].id" v-if="element.showMore" :best="element.runs.mythic_plus_alternate_runs" :alternate="element.runs.mythic_plus_best_runs" ></RioRating>

            </v-card-text>
            <v-card-actions class="float-right">
              <v-btn icon="mdi-monitor-screenshot" variant="plain" @click.stop="screenshot('char-' + element.name+'-'+element.realm, element)"></v-btn>
              <v-btn icon="mdi-trash-can-outline" variant="plain" @click="remove(element)"></v-btn>
            </v-card-actions>
          </v-card>

            
        </v-col>

      </template>
    </draggableComponent>
   
</template>
<script setup>
import draggableComponent from 'vuedraggable';
import html2canvas from 'html2canvas';

const STORAGE_KEY ="dungeon-chars"
const PERIODS_KEY="periods"
const realm = ref()
const name = ref()
const chars = ref(getItem(STORAGE_KEY))
const periods = ref(getItem(PERIODS_KEY))
const dungeons = ref({})
const affixes = ref()

const save = () => {
  setItem(STORAGE_KEY, chars.value)
}

const euCurrentPeriod = computed(() => {
  if (periods.value == null) return null;

  const eu = periods.value.filter(region => region.region == "eu")

  return eu[0].current;
})

const loadRuns = async char => {
  if (char.realm == undefined || char.name == undefined) return

  const slug = `${char.realm}-${char.name}`;
  const data = await $fetch(`/api/dungeons?name=${char.name}&realm=${char.realm}`)
  dungeons.value[slug] = data
  char["runs"] = data
  return char;
}

if (chars.value) {
  chars.value = chars.value.filter(item => item != {} && item != undefined && item.name != undefined)
}

if (periods.value == null || new Date(euCurrentPeriod.value.end) < new Date()) {
  periods.value = (await $fetch('/api/periods')).periods;
  setItem(PERIODS_KEY, periods.value)
}

const loadAll = async () => {
  await chars.value?.map(loadRuns)
  save()
}

loadAll();



const add = async () => {



  if (realm.value == undefined 
  || realm.value == ""
  || name.value == undefined
  || name.value == "") return
  if (chars.value == undefined) {
    chars.value = []
  }

  const char = {
    "realm": realm.value,
    "name": name.value
  }

  chars.value.push(await loadRuns(char))

}



const remove = (runToRemove, slugToRemove) => {


  const removeName = runToRemove.name.toLowerCase()
  const removeRealm = runToRemove.realm.toLowerCase()

  delete dungeons.value[slugToRemove]

  // dungeons.value[slugToRemove] = undefined


  const index = chars.value.findIndex(character => {
    
    const charName = character.name.toLowerCase()
    const charRealm = character.realm.toLowerCase()


    return removeName == charName
  } )
  /*
  const filtered = chars.value.filter(character => {
    
    const charName = character.name.toLowerCase()
    const charRealm = character.realm.toLowerCase()

    console.log(removeName, removeRealm, charName, charRealm)

    return removeName != charName
  })
  */


  chars.value.splice(index,1)
  save()
}

const dismissVault = (char) => {

  char["vaultDismissedForPeriod"] = euCurrentPeriod.value.period
  save()
}

function getItem(item) {
  if (process.client) {
    return JSON.parse(localStorage.getItem(item))
  } else {
    return undefined
  }
}

function setItem(item, value) {
  if (process.client) {
    localStorage.setItem(item, JSON.stringify(value))
  
    return true
  } else {
    return false  } 
}

const loadAffix = async () => {
  //$fetch("/api/affix").then(data => affixes.value = data)

  affixes.value = await $fetch("/api/affix");
}

const screenshot = (componentId, element) => {
  element.cheese = true

  setTimeout(() => {
    const componentElement = document.querySelector('#'+componentId);
    html2canvas(componentElement).then(canvas => {
      canvas.toBlob(blob => {
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
      });

      element.cheese = false
    });
  }, 750)


  
}

loadAffix()
</script>
<style scoped lang="scss">
.char, .char * {
  box-shadow: unset !important;
}
.v-card {
  cursor: pointer;
  &:hover {
    animation: grabCursor 5000ms forwards;
  }

  &-title {
    text-transform: capitalize;
  }
  .sortable-chosen {
    cursor: grabbing;    
  }

  @keyframes grabCursor {
  0% {
    cursor: pointer;
  }
  100% {
    cursor: grab;
  }
}
}
</style>