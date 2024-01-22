<template>
  <v-row>
    <v-col></v-col>
    <v-col class="d-flex justify-space-between pl-10">
      Verstärkt
    </v-col>
    <v-col>
      Tyrannisch
    </v-col>
  </v-row>
  <v-row v-for="(dungeon, key) in rioTable" no-gutters justify="space-between">
    <v-col> {{ key }}</v-col>
    <v-col v-for="affix in dungeon" class="d-flex justify-space-between pl-10 text-right">
      <span v-if="affix.mythic_level" class="text-right d-block">
      {{ affix.mythic_level }} +{{ affix.num_keystone_upgrades }}
      </span>
      <sub  class="text-right">{{ affix.score }}</sub>

    </v-col>

  </v-row>

</template>
<script setup>
  const props = defineProps(["best", "alternate"])

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