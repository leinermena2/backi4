const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Usuario } = require("../models/models");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

const crearUsuario = async (req, res) => {
  try {
    const { usuario, contrasena, estado } = req.body;

    const contrasenaCodificada = crypto
      .createHash("md5")
      .update(contrasena)
      .digest("hex");

    const nuevoUsuario = await Usuario.create({
      usuario,
      contrasena: contrasenaCodificada,
      estado,
    });

    const token = jwt.sign(
      { usuario: nuevoUsuario.usuario, id: nuevoUsuario.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const dotenvFilePath = path.join(__dirname, "..", "..", ".env");

    if (!process.env.JWT_SECRET) {
      fs.appendFileSync(dotenvFilePath, `\nJWT_SECRET=${token}`);
    }
       

    return res.status(201).json({ usuario: nuevoUsuario, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    const contrasenaCodificada = crypto
      .createHash("md5")
      .update(contrasena)
      .digest("hex");

    const usuarioExistente = await Usuario.findOne({
      where: { usuario, contrasena: contrasenaCodificada },
    });

 
    if (!usuarioExistente) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
        { usuario: usuarioExistente.usuario, id: usuarioExistente.id },
        "secret_key",
        {
            expiresIn: "1h",
        }
        );
        
        const dotenvFilePath = path.join(__dirname, "..", "..", ".env");
        
        if (!process.env.JWT_SECRET) {
            fs.appendFileSync(dotenvFilePath, `\nJWT_SECRET=${token}`);
        }

    return res.status(200).json({ usuario: usuarioExistente, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = {
  crearUsuario,
  iniciarSesion,
};
