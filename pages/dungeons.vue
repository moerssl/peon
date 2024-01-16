<template>
    <v-row>
      <v-col>
        <v-text-field label="Realm" v-model="realm" @keydown.enter="add"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Name" v-model="name" @keydown.enter="add"></v-text-field>
      </v-col>
      <v-col  class="mt-2">
        <v-btn @click="add">Hinzufügen</v-btn>
      </v-col>
    </v-row>
 
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
  
              {{ element.name }} <span v-if="element?.runs">({{ element.runs.mythic_plus_scores_by_season[0].scores.all }})</span>
              
            </v-card-title>
            <v-card-text v-if="element.runs">
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
const realm = ref()
const name = ref()
const chars = ref(getItem(STORAGE_KEY))
const dungeons = ref({})

const loadRuns = async char => {
  const slug = `${char.realm}-${char.name}`;
  const data = await $fetch(`/api/dungeons?name=${char.name}&realm=${char.realm}`)
  dungeons.value[slug] = data
  char["runs"] = data
  save()
}



chars.value?.map(loadRuns)

const add = () => {
  if (chars.value == undefined) {
    chars.value = []
  }

  const char = {
    "realm": realm.value,
    "name": name.value
  }

  chars.value.push({
    "realm": realm.value,
    "name": name.value
  })

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