const { Encuesta, EncuestasView } = require("../models/models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;
const buscarEncuestaPorIdentificacion = async (identificacion) => {
  return Encuesta.findOne({ where: { identificacion: parseInt(identificacion) } });
};

const crearNuevaEncuesta = async (encuestaData) => {
  return Encuesta.create(encuestaData);
};

const crearEncuesta = async (req, res) => {
  try {
    const { identificacion } = req.body;
    const encuestaExistente = await buscarEncuestaPorIdentificacion(identificacion);
    if (encuestaExistente) {
      return res.status(400).json({
        status: "error",
        message: "El número de identificación proporcionado ya tiene una encuesta asignada",
      });
    }
    const encuesta = await crearNuevaEncuesta(req.body);
    return res.status(201).json({
      status: "success",
      message: "Encuesta almacenada correctamente",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al guardar encuesta" });
  }
};

const obtenerEncuestas = async (req, res) => {
  try {
    const encuestas = await Encuesta.findAll({ where: { estado: { [Op.ne]: 0 } } });
    return res.status(200).json(encuestas);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener encuestas" });
  }
};

const obtenerEncuestasVista = async (req, res) => {
  try {
    const encuestas = await EncuestasView.findAll({
      attributes: [
        "id",
        "identificacion",
        "calificacion_manejo",
        "calificacion_satisfaccion",
        "marca_item",
        "modelo_item",
        "factor_diferencial_item",
        "marca",
        "modelo",
        "factor_diferencial",
      ],
      where: {
        estado: {
          [Op.ne]: 0,
        },
      },
    });
    return res.status(200).json(encuestas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener encuestas desde la vista" });
  }
};

const editarEncuesta = async (req, res) => {
  const { identificacion } = req.params;
  try {
    const encuestaExistente = await Encuesta.findByPk(parseInt(identificacion));
    if (!encuestaExistente) {
      return res.status(404).json({ status: "error", message: "Encuesta no encontrada" });
    }

    const {
      marca,
      modelo,
      factor_diferencial,
      calificacion_manejo,
      calificacion_satisfaccion,
    } = req.body;

    await encuestaExistente.update({
      marca: marca,
      modelo: modelo,
      factor_diferencial: factor_diferencial,
      calificacion_manejo: calificacion_manejo,
      calificacion_satisfaccion: calificacion_satisfaccion,
    });

    return res.status(200).json({
      status: "success",
      message: "Encuesta actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Error al actualizar la encuesta" });
  }
};

const inactivarEncuesta = async (req, res) => {
  const { identificacion } = req.params;
  try {
    const encuestaExistente = await Encuesta.findByPk(parseInt(identificacion));
    if (!encuestaExistente) {
      return res.status(404).json({ status: "error", message: "Encuesta no encontrada" });
    }

    await encuestaExistente.update({
      estado: 0,
    });

    return res.status(200).json({
      status: "success",
      message: "Encuesta inactivada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Error al inactivar la encuesta" });
  }
};

module.exports = {
  crearEncuesta,
  obtenerEncuestas,
  obtenerEncuestasVista,
  editarEncuesta,
  inactivarEncuesta,
};
