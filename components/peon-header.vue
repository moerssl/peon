<template>
  <header> <v-row class="mt-5 ">
    <v-col cols="12" lg="4">
      
      <h1>Peon</h1>
      <h2>Multiple chars made easy </h2>
    </v-col>
    <spacer></spacer>
    <v-col class="text-right">
      <NuxtLink to="/"> Gear </NuxtLink>
      <NuxtLink class="ml-5" to="/dungeons"> Dungeons </NuxtLink>
      <theme-switch class="ml-5"></theme-switch>
    </v-col>
  </v-row>
</header>
 
</template>
<style scoped lang="scss">
  header a {
    color: #333;
    text-decoration: none;
    .v-theme--dark & {
      color: #ccc;
    }
  }
</style>