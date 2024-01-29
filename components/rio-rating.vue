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
  <v-row v-for="(dungeon, key) in rioTable" no-gutters justify="space-between">
    <v-col> {{ key }}</v-col>
    <v-col v-for="affix in dungeon" class="d-flex justify-space-around ml-2">
      <span v-if="affix.mythic_level" class="text-right d-block">
      {{ affix.mythic_level }} +{{ affix.num_keystone_upgrades }}
      </span>
      <span v-else>-</span>
      <sub  v-if="affix.score" class="text-right">{{ affix.score }}</sub>

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
</style>