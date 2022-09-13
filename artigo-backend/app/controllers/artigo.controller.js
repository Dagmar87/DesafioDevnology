const db = require("../models");
const Artigo = db.artigos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.titulo) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!",
    });
    return;
  }
  const artigo = {
    titulo: req.body.titulo,
    url: req.body.url,
  };
  Artigo.create(artigo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar o Artigo.",
      });
    });
};

exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condicao = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;
  Artigo.findAll({ where: condicao })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao recuperar os artigos.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Artigo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível encontrar o artigo com id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao recuperar o artigo com id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Artigo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "O Artigo foi atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não é possível atualizar o Artigo com id=${id}. Talvez Artigo não foi encontrado ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao atualizar o Artigo com id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Artigo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "O Artigo foi excluído com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível excluir o Artigo com id=${id}. Talvez o Artigo não tenha sido encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível excluir o Artigo com id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Artigo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Artigos foram excluídos com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao remover todos os Artigos.",
      });
    });
};
