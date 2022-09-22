<template>
    <div v-if="currentArtigo" class="edit-form py-3">
        <p class="headline">Editar artigo</p>

        <v-form ref="form" lazy-validation>
            <v-text-field v-model="currentArtigo.titulo" :rules="[(v) => !!v || 'O título é obrigatório']"
                label="Titulo" required></v-text-field>

            <v-text-field v-model="currentArtigo.url" :rules="[(v) => !!v || 'O url é obrigatório']" label="URL"
                required></v-text-field>



            <v-btn color="error" small class="mr-2" @click="deleteArtigo">
                Excluir
            </v-btn>

            <v-btn color="success" small @click="updateArtigo">
                Atualizar
            </v-btn>
        </v-form>

        <p class="mt-3">{{ message }}</p>
    </div>
    <div v-else>
        <p>Por favor, clique em um artigo...</p>
    </div>
</template>
<script>
import ArtigoDataService from "../services/ArtigoDataService";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "artigo",
    data() {
        return {
            currentArtigo: null,
            message: "",
        };
    },
    methods: {
        getArtigo(id) {
            ArtigoDataService.get(id)
                .then((response) => {
                    this.currentArtigo = response.data;
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        updateArtigo() {
            ArtigoDataService.update(this.currentArtigo.id, this.currentArtigo)
                .then((response) => {
                    console.log(response.data);
                    this.message = "O artigo foi atualizado com sucesso!";
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        deleteArtigo() {
            ArtigoDataService.delete(this.currentArtigo.id)
                .then((response) => {
                    console.log(response.data);
                    this.$router.push({ name: "artigos" });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.message = "";
        this.getArtigo(this.$route.params.id);
    },
};
</script>
<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>
