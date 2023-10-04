const { TipoLista } = require("../models/models");

const crearTipoLista = async (req, res) => {
  try {
    const tipoLista = await TipoLista.create(req.body);
    return res.status(201).json(tipoLista);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el tipo de lista" });
  }
};

const obtenerTiposLista = async (req, res) => {
  try {
    const tiposLista = await TipoLista.findAll();
    return res.status(200).json(tiposLista);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener tipos de lista" });
  }
};

module.exports = {
  crearTipoLista,
  obtenerTiposLista,
};
