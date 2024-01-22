<template>
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
        </v-col>
      </v-row>
    </v-form>
      <draggableComponent
      v-model="chars" 
      group="people" 

      item-key="name"
      class="v-row"
      @end="save"
      >
      <template #item="{element}">
        <v-col cols="6" lg="2" ><!-- /v-col>v-for="value in chars" -->
          <v-card class="pa-2">
            <v-card-title>
  
              {{ element.name }} 
              
              <v-icon @click="dismissVault(element)" class="text-subtitle-1" icon="mdi-treasure-chest-outline" v-if="element?.runs?.mythic_plus_previous_weekly_highest_level_runs?.length > 0 && element?.vaultDismissedForPeriod != euCurrentPeriod.period"></v-icon>
              <span class="text-subtitle-2" v-if="element?.runs">&nbsp;({{ element.runs.mythic_plus_scores_by_season[0].scores.all }})</span>
          </v-card-title>
            <v-card-text v-if="element.runs != undefined && element.runs.mythic_plus_weekly_highest_level_runs != undefined">
              <table>
                <tr v-for="run in element.runs.mythic_plus_weekly_highest_level_runs">
                  <td>
                    {{ run.short_name }}
                  </td>
                  <td class="text-right">
                    {{ run.mythic_level }}
                  </td>
                  <td>
                    +{{ run.num_keystone_upgrades }}
                  </td>
                </tr>
              </table>
  
            </v-card-text>
            <v-card-actions class="float-right">
              <v-btn icon="mdi-trash-can-outline" variant="plain" @click="remove(element)"></v-btn>
            </v-card-actions>
          </v-card>

            
        </v-col>
      </template>
    </draggableComponent>
   
</template>
<script setup>
import draggableComponent from 'vuedraggable';

const STORAGE_KEY ="dungeon-chars"
const PERIODS_KEY="periods"
const realm = ref()
const name = ref()
const chars = ref(getItem(STORAGE_KEY))
const periods = ref(getItem(PERIODS_KEY))
const dungeons = ref({})

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
  save()
}

if (chars.value) {
  chars.value = chars.value.filter(item => item != {} && item != undefined && item.name != undefined)
}

if (periods.value == null || new Date(euCurrentPeriod.value.end) < new Date()) {
  periods.value = (await $fetch('/api/periods')).periods;
  setItem(PERIODS_KEY, periods.value)
}
chars.value?.map(loadRuns)



const add = async () => {
  const { valid } = await this.$refs.form.validate()

  if (!valid) return

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

  chars.value.push(char)

  loadRuns(char)

  setItem(STORAGE_KEY, chars.value)
}

const save = () => {
  setItem(STORAGE_KEY, chars.value)

}

const remove = (runToRemove, slugToRemove) => {


  console.log("remove wirked", slugToRemove, runToRemove)
  const removeName = runToRemove.name.toLowerCase()
  const removeRealm = runToRemove.realm.toLowerCase()

  delete dungeons.value[slugToRemove]

  // dungeons.value[slugToRemove] = undefined


  const index = chars.value.findIndex(character => {
    
    const charName = character.name.toLowerCase()
    const charRealm = character.realm.toLowerCase()

    console.log(removeName, removeRealm, charName, charRealm)

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

  console.log(index)
  chars.value.splice(index,1)
  save()
}

const dismissVault = (char) => {
  console.log(char)
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
</script>
<style scoped lang="scss">
.v-card {
  cursor: grab;
  &-title {
    text-transform: capitalize;
  }
  .sortable-chosen {
    cursor: grabbing;
  }
}
</style>