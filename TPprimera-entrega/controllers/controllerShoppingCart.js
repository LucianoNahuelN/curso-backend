const { randomUUID } = require('crypto')
const ContainerFile = require("../ContainerFiles")
const containerCarts =  new ContainerFile('carts.txt')
const containerProducts =  new ContainerFile('products.txt')

async function controllerPostCart(req, res) {
    try {
        const newCart = {id: randomUUID(), products: []};
        await containerCarts.save(newCart);
        res.status(201);
        res.json(newCart);
    } catch (error) {
        res.status(500);
        res.json({message: error})
    }
}

async function controllerDeleteCart({params: {id_cart}}, res) {
    try {
        const cart = await containerCarts.getAll();
        const wantedindex = cart.findIndex(c => c.id === id_cart);
        if (wantedindex === -1) {
            res.status(404);
            res.json({ message: `no se encontró carrito con ese id (${id_cart})` });
        } else {
            cart[wantedindex].products = [];
            await containerCarts.update(cart)
            res.json({message: "exito al eliminar el carrito"});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Error al eliminar el carrito"})
    }
}

async function controllerPostCartProduct({body, params: {id_cart}}, res) {
    try {
        const carts = await containerCarts.getAll();
        const cartIndex = carts.findIndex(c => c.id === id_cart)
        if (cartIndex === -1) {
            res.status(404);
            res.json({message: `No se encontró el carrito con el id: ${id_cart}`});
        } else {
            const allProducts = await containerProducts.getAll();
            const newCartProduct = allProducts.find(c => c.id === body.id)
            if (!newCartProduct) {
                res.status(404);
                res.json({message: `No se encontró el producto con el id: ${body.id}`});
            } else {
                carts[cartIndex].products.push(newCartProduct)
                await containerCarts.update(carts)
                res.status(201);
                res.json(carts[cartIndex].products);
            }
        }    
    } catch (error) {
        res.status(500);
        res.json({message: "Error al agregar productos al carrito: " + error.message})
    }
}

async function controllerGetCartProducts({params: {id_cart}}, res) {
    try {
        const cart = await containerCarts.getAll();
        const wantedindex = cart.find(c => c.id === id_cart);
        if (!wantedindex) {
            res.status(404);
            res.json({message: `No se encontró el carrito con el id: ${id_cart}`});
        } else {
            res.status(200);
            res.json(wantedindex);
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Error al mostrar los productos del carrito"})
    }
}

async function controllerDeleteCartProduct({params: {id_cart, id_prod}}, res) {
    try {
        const cart = await containerCarts.getAll();
        const wantedindex = cart.findIndex(c => c.id === id_cart);
        if (wantedindex === -1) {
            res.status(404);
            res.json({message: `No se encontró el carrito con el id: ${id_cart}`});
        } else {
            const allProducts = cart[wantedindex].products
            // allProducts.splice(o => o.id == id_prod)
            for (let i = 0; i < allProducts.length; i++) {
                if (allProducts[i].id === id_prod) {
                    allProducts.splice(i, 1);
                }
            }
            await containerCarts.update(cart)
            res.status(200);
            res.json(cart[wantedindex].products);
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Error al eliminar el producto del carrito"})
    }
}

exports.controllerPostCart = controllerPostCart;
exports.controllerDeleteCart = controllerDeleteCart;
exports.controllerPostCartProduct = controllerPostCartProduct;
exports.controllerGetCartProducts = controllerGetCartProducts;
exports.controllerDeleteCartProduct = controllerDeleteCartProduct;

