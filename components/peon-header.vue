<template>
  <header  class="mb-5 "> 
    <v-container>
      <v-row>
        <v-col cols="12" lg="4">
          
          <h1>Peon</h1>
          <h2>Multiple chars made easy </h2>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="text-right">
          <NuxtLink to="/gear"> Gear </NuxtLink>
          <NuxtLink class="ml-5" to="/"> Dungeons </NuxtLink>
          <theme-switch class="ml-5"></theme-switch>
        </v-col>
      </v-row>
    </v-container>
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