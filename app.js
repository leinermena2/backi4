const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tipoListaController = require('./src/controllers/tipoListaController');
const listaController = require('./src/controllers/listaController');
const encuestaController = require('./src/controllers/encuestaController');
const usuariosController = require('./src/controllers/usuariosController');
const verificarToken = require('./src/middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200 
  }));

// Rutas para TipoListas (requiere autenticación)
app.post('/tipos-lista', tipoListaController.crearTipoLista);
app.get('/tipos-lista', tipoListaController.obtenerTiposLista);

// Rutas para Listas (requiere autenticación)
app.post('/listas', listaController.crearLista);
app.get('/listas', listaController.obtenerListas);
app.get('/listasByType/:tipoListaId', listaController.obtenerListasPorTipoListaId);
app.get('/listasAsociadas/:idAsociado', listaController.obtenerListasAsociado);

// Rutas para Encuestas (requiere autenticación)
app.post('/encuestas', encuestaController.crearEncuesta);
app.get('/encuestas', encuestaController.obtenerEncuestasVista);
app.put('/encuestas/:identificacion', encuestaController.editarEncuesta);
app.put('/inactivar-encuestas/:identificacion', encuestaController.inactivarEncuesta);

// Resto para usuarios
app.post('/usuarios', usuariosController.crearUsuario);
app.post('/login', usuariosController.iniciarSesion);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
