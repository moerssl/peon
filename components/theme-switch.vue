<template>
  <v-btn @click="toggleTheme" >toggle theme</v-btn>
</template>
<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>