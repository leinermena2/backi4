const Sequelize = require("sequelize");
const sequelize = require("../../sequelize");

const TipoLista = sequelize.define("tipo_listas", {
  lista: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: Sequelize.TEXT,
    defaultValue: "None",
  },
});

const Lista = sequelize.define("listas", {
  tipo_lista_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  item_lista: {
    type: Sequelize.STRING(100),
  },
  asociado: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  estado: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

const Encuesta = sequelize.define("encuestas", {
  identificacion: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
  },
  marca: {
    type: Sequelize.INTEGER,
  },
  modelo: {
    type: Sequelize.INTEGER,
  },
  factor_diferencial: {
    type: Sequelize.INTEGER,
  },
  calificacion_manejo: {
    type: Sequelize.FLOAT,
  },
  calificacion_satisfaccion: {
    type: Sequelize.FLOAT,
  },
  estado: {
    type: Sequelize.INTEGER,
  },
});

const EncuestasView = sequelize.define(
  "encuestas_view",
  {
    identificacion: {
      type: Sequelize.INTEGER,
    },
    marca_item: {
      type: Sequelize.STRING,
    },
    modelo_item: {
      type: Sequelize.STRING,
    },
    factor_diferencial_item: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "encuestas_view",
    timestamps: false,
  }
);

const Usuario = sequelize.define("usuarios", {
  usuario: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  contrasena: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  estado: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

TipoLista.hasMany(Lista, { foreignKey: "tipo_lista_id" });
Lista.belongsTo(TipoLista, { foreignKey: "tipo_lista_id" });

Lista.hasMany(Encuesta, { foreignKey: "marca" });
Lista.hasMany(Encuesta, { foreignKey: "modelo" });
Lista.hasMany(Encuesta, { foreignKey: "factor_diferencial" });
Encuesta.belongsTo(Lista, { foreignKey: "marca" });
Encuesta.belongsTo(Lista, { foreignKey: "modelo" });
Encuesta.belongsTo(Lista, { foreignKey: "factor_diferencial" });

module.exports = {
  TipoLista,
  Lista,
  Encuesta,
  EncuestasView,
  Usuario,
};
