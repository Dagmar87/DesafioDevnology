<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">Artigos do Mundo Tech</div>

      <v-btn to="/artigos" text> Artigos </v-btn>

      <v-btn to="/add" text> Adicionar </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
