module.exports = app => {
    const artigos = require("../controllers/artigo.controller.js");

    var router = require("express").Router();

    router.post("/", artigos.create);
    router.get("/", artigos.findAll);
    router.get("/:id", artigos.findOne);
    router.put("/:id", artigos.update);
    router.delete("/:id", artigos.delete);
    router.delete("/", artigos.deleteAll);

    app.use('/api/artigos', router);
};