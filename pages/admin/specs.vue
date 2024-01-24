<template>
  <v-row v-for="spec in specs">
    <v-col>{{ spec.name }}</v-col>
    <v-col>DE ({{ spec.dejson }}): {{ spec["de-DE"] }} <v-btn @click="renderJson('de-DE', spec)">DE Aktualisieren</v-btn></v-col>
    <v-col>EN ({{ spec.enjson }}): {{ spec["en-US"] }} <v-btn @click="renderJson('en-US', spec)">EN  Aktualisieren</v-btn></v-col>

  </v-row>
</template>
<script setup>
import { onMounted } from 'vue';

const specs = ref()
const loadSpecs = () => {
  $fetch('/api/specs').then(data => {
    specs.value = data[0];

    specs.value.map(async singleSpec => {
      singleSpec.defile = `/gear/de/${singleSpec.filename}`;
      singleSpec["dejson"] = await checkFile(`/gear/de/${singleSpec.filename}`)
      singleSpec["enjson"] = await checkFile(`/gear/en/${singleSpec.filename}`)
      
    })
  })
}

const renderJson = (lang, spec) => {
  spec[lang] = "running..."
  $fetch(`/api/bis?playedclass=${spec.playedClass}&spec=${spec.specName}&langslot=${lang}&force=true`).then(() => {
    spec[lang] = "finish."
  }).catch(() => {
    spec[lang] = "ERROR."
  })
}

const checkFile = async (file) => {
  const response = await fetch(file, { method: 'HEAD' });
      if (response.ok) {
        return "OK"
      } else {
        return "missing"
      }
}
onMounted(loadSpecs);
</script>