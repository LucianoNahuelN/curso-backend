const express = require('express');
const {controllerPostCart,
    controllerDeleteCart,
    controllerPostCartProduct,
    controllerGetCartProducts,
    controllerDeleteCartProduct} = require('../controllers/controllerShoppingCart');

const routerApiCart = express.Router()

routerApiCart.post('/shoppingcart', controllerPostCart)
routerApiCart.delete('/shoppingcart/:id_cart', controllerDeleteCart)
routerApiCart.post('/shoppingcart/:id_cart/products', controllerPostCartProduct)
routerApiCart.get('/shoppingcart/:id_cart/products', controllerGetCartProducts)
routerApiCart.delete('/shoppingcart/:id_cart/products/:id_prod', controllerDeleteCartProduct)

exports.routerApiCart = routerApiCart;