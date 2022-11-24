const express = require('express');
const { controladorGetProductos, controladorPostProductos } = require("../controllers/controllerProductos");

const webRouter = express.Router()

webRouter.get('/productos', controladorGetProductos);
webRouter.post('/productos', controladorPostProductos);

module.exports = { webRouter }
