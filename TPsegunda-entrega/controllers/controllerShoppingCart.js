import {
    createCart,
    saveProduct,
    deleteOneProduct,
    deleteProducts,
    getAllProducts
  } from '../models/cartModel.js';

async function controllerPostCart(req, res) {
    try {
        const id = await createCart();
        res.status(201);
        res.json({'Cart ID': id});
    } catch (error) {
        res.status(500);
        res.json({message: "Error al crear el carrito"})
    }
}

async function controllerDeleteCart({params: {id_cart}}, res) {
    try {
        // const cart = await containerCarts.getAll();
        // const wantedindex = cart.findIndex(c => c.id === id_cart);
        // if (wantedindex === -1) {
        //     res.status(404);
        //     res.json({ message: `no se encontró carrito con ese id (${id_cart})` });
        // } else {
        //     cart[wantedindex].products = [];
        //     await containerCarts.update(cart)
        //     res.json({message: "exito al eliminar el carrito"});
        // }
        await deleteProducts(id_cart);
        res.status(200);
        res.json({message: "exito al eliminar el carrito"});
    } catch (error) {
        res.status(500);
        res.json({message: "Error al vaciar el carrito"})
    }
}

async function controllerPostCartProduct({body, params: {id_cart}}, res) {
    try {
        // const carts = await containerCarts.getAll();
        // const cartIndex = carts.findIndex(c => c.id === id_cart)
        // if (cartIndex === -1) {
        //     res.status(404);
        //     res.json({message: `No se encontró el carrito con el id: ${id_cart}`});
        // } else {
        //     const allProducts = await containerProducts.getAll();
        //     const newCartProduct = allProducts.find(c => c.id === body.id)
        //     if (!newCartProduct) {
        //         res.status(404);
        //         res.json({message: `No se encontró el producto con el id: ${body.id}`});
        //     } else {
        //         carts[cartIndex].products.push(newCartProduct)
        //         await containerCarts.update(carts)
        //         res.status(201);
        //         res.json(carts[cartIndex].products);
        //     }
        // }    
        const id = body.id;
        if (!id) {
            res.status(404);
            res.json({message: `No se encontró el producto`});
        } else {
            await saveProduct(id, id_cart);
            res.status(200);
            res.json({message: "producto agregado con exito"})
        }
    } catch (error) {
        res.status(500);
        res.json({message: `Error al agregar productos al carrito con id: ${id_cart} `})
    }
}

async function controllerGetCartProducts({params: {id_cart}}, res) {
    try {
        // const cart = await containerCarts.getAll();
        // const wantedindex = cart.find(c => c.id === id_cart);
        // if (!wantedindex) {
        //     res.status(404);
        //     res.json({message: `No se encontró el carrito con el id: ${id_cart}`});
        // } else {
        //     res.status(200);
        //     res.json(wantedindex);
        // }
        const products = await getAllProducts(id_cart);
        if (!products) {
            res.status(404);
            res.json({message: `No se encontró el carrito con el id: ${id_cart}`});
        } else {
            res.status(200);
            res.json(products);
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Error al mostrar los productos del carrito"})
    }
}

async function controllerDeleteCartProduct({params: {id_cart, id_prod}}, res) {
    try {
        // const cart = await containerCarts.getAll();
        // const wantedindex = cart.findIndex(c => c.id === id_cart);
        // if (wantedindex === -1) {
        //     res.status(404);
        //     res.json({message: `No se encontró el carrito con el id: ${id_cart}`});
        // } else {
        //     const allProducts = cart[wantedindex].products
        //     // allProducts.splice(o => o.id == id_prod)
        //     for (let i = 0; i < allProducts.length; i++) {
        //         if (allProducts[i].id === id_prod) {
        //             allProducts.splice(i, 1);
        //         }
        //     }
        //     await containerCarts.update(cart)
        //     res.status(200);
        //     res.json(cart[wantedindex].products);
        // }
        await deleteOneProduct(id_cart, id_prod);
        res.status(200);
        res.json({message: "exito al eliminar el producto"});
        
    } catch (error) {
        res.status(500);
        res.json({message: "Error al eliminar el producto del carrito"})
    }
}

export { controllerPostCart, controllerDeleteCart, controllerPostCartProduct, controllerGetCartProducts, controllerDeleteCartProduct }

