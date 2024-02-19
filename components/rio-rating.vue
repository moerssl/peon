<template>
  <v-row>
    <v-col></v-col>
    <v-col :class="{ bold: props.weekaffix == 10}" class="text-center">
      Verstärkt
    </v-col>
    <v-col :class="{ bold: props.weekaffix != 10}" class="text-center">
      Tyrannisch
    </v-col>
  </v-row>
  <v-row v-for="(dungeon, key) in rioTable" no-gutters justify="space-between" class="highlight">
    <v-col> {{ key }}</v-col>
    <v-col v-for="affix in dungeon" class="d-flex">
      <v-row no-gutters class="pr-5 pl-5">
        <v-col v-if="affix.mythic_level" class="text-right d-block">
        {{ affix.mythic_level }}&nbsp;+{{ affix.num_keystone_upgrades }}
        </v-col>
        <v-col v-else>-</v-col>
        <v-col v-if="affix.score" class="text-right score">{{ affix.score }}</v-col>
      </v-row>
      

    </v-col>

  </v-row>

</template>
<script setup>
  const props = defineProps(["best", "alternate","weekaffix"])

  const ratedRuns = computed(() => {
   const best = props.best || []
   const alt = props.alternate || []

    return [...best,...alt]
  })

  const rioTable = computed(() => {
    const ratings = {}


    ratedRuns.value.map(run => {
      if (ratings[run.short_name] == undefined) {
        ratings[run.short_name] = {
          fortified: {},
          tyrannical: {}
        }
      }

      ratings[run.short_name][run.affixes[0].name.toLowerCase()] = run
    })

    return ratings;
  })
</script>
<style scoped>
.bold {
  font-weight: bold;
}
.highlight:hover {
  background-color: #efefef;
}
.score {
  font-size: 0.8em;
}
</style>