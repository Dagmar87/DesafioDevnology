<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Adicionar Artigo</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="artigo.titulo"
          :rules="[(v) => !!v || 'O título é obrigatório']"
          label="Titulo"
          required
        ></v-text-field>

        <v-text-field
          v-model="artigo.url"
          :rules="[(v) => !!v || 'O url é obrigatório']"
          label="URL"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveArtigo">Enviar</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Enviado com sucesso! </v-card-title>

        <v-card-subtitle>
          Clique no botão para adicionar um novo Artigo.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newArtigo">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import ArtigoDataService from "../services/ArtigoDataService";

export default {
  name: "add-artigo",
  data() {
    return {
      artigo: {
        id: null,
        titulo: "",
        url: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveArtigo() {
      var data = {
        titulo: this.artigo.titulo,
        url: this.artigo.url,
      };

      ArtigoDataService.create(data)
        .then((response) => {
          this.artigo.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newArtigo() {
      this.submitted = false;
      this.artigo = {};
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
}
</style>
