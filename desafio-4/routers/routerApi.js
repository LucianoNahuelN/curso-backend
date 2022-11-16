const express = require('express');
const { controladorGetProductos,
    controladorGetProductosSegunId,
    controladorPostProductos,
    controladorPutProductosSegunId,
    controladorDeleteProductosSegunId } = require("../controllers/controllerProductos");

const routerApi = express.Router();

routerApi.get('/', controladorGetProductos);
routerApi.get('/:id', controladorGetProductosSegunId);
routerApi.post('/', controladorPostProductos);
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);

exports.routerApi = routerApi;