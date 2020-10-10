<template>
  <v-app id="inspire">
    <v-card color="grey lighten-4" flat height="20px" tile>
      <v-toolbar dense>
        <v-toolbar-title class="headline text-uppercase mr-4">
          <span>
            <v-img
              max-height="100"
              max-width="100"
              src="../assets/grupoa.png"
            ></v-img>
          </span>
          <span></span>
        </v-toolbar-title>
        <v-toolbar-items>
          <v-btn flat to="/">Início</v-btn>
          <v-btn flat to="/students">Lista de Estudantes</v-btn>
          <v-btn flat to="/forms">Cadastrar Estudantes</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
export default {};
</script>
