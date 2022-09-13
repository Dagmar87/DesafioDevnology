module.exports = (sequelize, Sequelize) => {
    const Artigo = sequelize.define("artigo", {
        titulo: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        }
    });
    return Artigo;
};