<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field
        v-model="titulo"
        label="Pesquisar por título"
      ></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitulo"> Pesquisar </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Artigos</v-card-title>

        <v-data-table
          :headers="headers"
          :items="artigos"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editArtigo(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteArtigo(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="artigos.length > 0">
          <v-btn small color="error" @click="removeAllArtigos">
            Remover Todos
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import ArtigoDataService from "../services/ArtigoDataService";
export default {
  name: "artigos-list",
  data() {
    return {
      artigos: [],
      titulo: "",
      headers: [
        { text: "Titulo", align: "start", sortable: false, value: "titulo" },
        { text: "URL", value: "url", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveArtigos() {
      ArtigoDataService.getAll()
        .then((response) => {
          this.artigos = response.data.map(this.getDisplayArtigo);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveArtigos();
    },

    removeAllArtigos() {
      ArtigoDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitulo() {
      ArtigoDataService.findByTitulo(this.titulo)
        .then((response) => {
          this.artigos = response.data.map(this.getDisplayArtigo);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editArtigo(id) {
      this.$router.push({ name: "artigo-details", params: { id: id } });
    },

    deleteArtigo(id) {
      ArtigoDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayArtigo(artigo) {
      return {
        id: artigo.id,
        titulo:
          artigo.titulo.length > 30
            ? artigo.titulo.substr(0, 30) + "..."
            : artigo.titulo,
        url:
          artigo.url.length > 30
            ? artigo.url.substr(0, 30) + "..."
            : artigo.url,
      };
    },
  },
  mounted() {
    this.retrieveArtigos();
  },
};
</script>
<style>
.list {
  max-width: 1000px;
}
</style>
