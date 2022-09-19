import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/artigos",
      name: "artigos",
      component: () => import("./components/ArtigosList"),
    },
    {
      path: "/artigos/:id",
      name: "artigo-details",
      component: () => import("./components/Artigo"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddArtigo"),
    },
  ],
});
