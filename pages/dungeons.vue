<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="realm" v-model="realm"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="name" v-model="name"></v-text-field>
      </v-col>
      <v-col  class="mt-2">
        <v-btn @click="add">Hinzufügen</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" lg="2" v-for="value, key in dungeons">
          <h3>{{ value.name }} ({{ value.mythic_plus_scores_by_season[0].scores.all }})</h3>
          <table>
            <tr v-for="run in value.mythic_plus_weekly_highest_level_runs">
              <td>
                {{ run.short_name }}
              </td>
              <td>
                {{ run.mythic_level }}
              </td>
              <td>
                +{{ run.num_keystone_upgrades }}
              </td>
            </tr>
          </table>
          
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const STORAGE_KEY ="dungeon-chars"
const realm = ref()
const name = ref()
const chars = ref(getItem(STORAGE_KEY))
const dungeons = ref({})

const loadRuns = async char => {
  const slug = `${char.realm}-${char.name}`;
  const data = await $fetch(`/api/dungeons?name=${char.name}&realm=${char.realm}`)
  dungeons.value[slug] = data
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
    return false
  }
}
</script>