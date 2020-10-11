<template>
  <v-card color="grey lighten-4" flat height="70px" tile>
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="headline text-uppercase mr-4">
        <span>Teste </span>
        <span>Grupo A</span>
      </v-toolbar-title>

      <v-toolbar-items>
        <v-btn flat to="/">Início</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {};
</script>
