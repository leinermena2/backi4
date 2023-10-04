const { Lista } = require("../models/models");

const crearLista = async (req, res) => {
  try {
    const lista = await Lista.create(req.body);
    return res.status(201).json(lista);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la lista" });
  }
};

const obtenerListas = async (req, res) => {
  try {
    const listas = await Lista.findAll();
    return res.status(200).json(listas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener listas" });
  }
};

const obtenerListasPorTipoListaId = async (req, res) => {
  const tipoListaId = req.params.tipoListaId;

  try {
    const listas = await Lista.findAll({
      where: {
        tipo_lista_id: tipoListaId,
      },
    });

    if (!listas || listas.length === 0) {
      return res
        .status(404)
        .json({
          error: "No se encontraron listas para el tipo_lista_id proporcionado",
        });
    }

    return res.status(200).json(listas);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener las listas por tipo_lista_id" });
  }
};

const obtenerListasAsociado = async (req, res) => {
  const idAsociado = req.params.idAsociado;

  try {
    const listas = await Lista.findAll({
      where: {
        asociado: idAsociado,
      },
    });

    if (!listas || listas.length === 0) {
      return res
        .status(404)
        .json({
          error: "No se encontraron listas para el tipo_lista_id proporcionado",
        });
    }

    return res.status(200).json(listas);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener las listas por tipo_lista_id" });
  }
};

module.exports = {
  crearLista,
  obtenerListas,
  obtenerListasPorTipoListaId,
  obtenerListasAsociado,
};
