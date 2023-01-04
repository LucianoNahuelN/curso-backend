import express from 'express';
import{ controllerGetProducts,
    controllerGetProductsWithId,
    controllerPostProducts,
    controllerPutProductsWithId,
    controllerDeleteProductsWithId } from "../controllers/controllerProducts.js";
import {adminTest} from "../controllers/controllerAdmin.js";

const routerApiProducts = express.Router();

routerApiProducts.get('/', controllerGetProducts);
routerApiProducts.get('/:id', controllerGetProductsWithId);
routerApiProducts.post('/', adminTest, controllerPostProducts);
routerApiProducts.put('/:id', adminTest, controllerPutProductsWithId);
routerApiProducts.delete('/:id', adminTest, controllerDeleteProductsWithId);

export default routerApiProducts;