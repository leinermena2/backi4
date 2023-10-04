const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verificarToken(req, res, next) {
/*   const token = req.body.token;
  console.log(token);
  if (!token) {
    console.log(process.env.JWT_SECRET);
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido." });
    }
    req.usuario = usuario; */
/* }); */
next();
}

module.exports = verificarToken;
