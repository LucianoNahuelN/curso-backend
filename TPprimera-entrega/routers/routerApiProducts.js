const express = require('express');
const { controllerGetProducts,
    controllerGetProductsWithId,
    controllerPostProducts,
    controllerPutProductsWithId,
    controllerDeleteProductsWithId } = require("../controllers/controllerProducts");
const {adminTest} = require("../controllers/controllerAdmin");

const routerApiProducts = express.Router();

routerApiProducts.get('/', controllerGetProducts);
routerApiProducts.get('/:id', controllerGetProductsWithId);
routerApiProducts.post('/', adminTest, controllerPostProducts);
routerApiProducts.put('/:id', adminTest, controllerPutProductsWithId);
routerApiProducts.delete('/:id', adminTest, controllerDeleteProductsWithId);

exports.routerApiProducts = routerApiProducts;