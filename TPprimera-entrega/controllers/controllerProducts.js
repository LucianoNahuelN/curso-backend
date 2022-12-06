const fs = require('fs')
const { randomUUID } = require('crypto')

const ContainerFile = require("../ContainerFiles")
const container =  new ContainerFile('products.txt')

async function controllerGetProducts(req, res){
    try {
        products = await container.getAll()
        res.json(products) 
    } catch (error) {
        res.status(500);
        res.json({message: "Error al mostrar los productos"})
    }
} 
async function controllerGetProductsWithId({params: {id}}, res){
    try {
        const wantedProduct = await container.getById(id);
        if (!wantedProduct) {
            res.status(404);
            res.json({ message: `no se encontró producto con el id (${id})` });
        } else {
            res.json(wantedProduct);
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Error al mostrar el producto por id"})
    }
} 
async function controllerPostProducts(req, res){
    try {
        const newProduct = req.body;
        newProduct.id = randomUUID();
        await container.save(newProduct);
        res.status(201);
        res.json(newProduct);
    } catch (error) {
        res.status(500);
        res.json({message: "Error al agregar un producto"})
    }
} 
async function controllerPutProductsWithId({body, params: {id}}, res) {
   try {
    const products = await container.getAll();
    const wantedindex = products.findIndex(c => c.id === id);
    if (wantedindex === -1) {
        res.status(404);
        res.json({ message: `no se encontró producto con ese id (${id})` });
    } else {
        body.id = id
        products[wantedindex] = body;
        container.update(products);
        res.json(body);
    }
   } catch (error) {
    res.status(500);
    res.json({message: "Error al cambiar producto"})
   }
}
async function controllerDeleteProductsWithId({ params: { id } }, res) {
    try {
        const products = await container.getAll();
        const wantedindex = products.findIndex(c => c.id === id);
        if (wantedindex === -1) {
            res.status(404);
            res.json({ message: `no se encontró producto con ese id (${id})` });
        } else {
            await container.deleteById(id);
            res.json({message: "exito al eliminar el producto"});
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Error al eliminar el producto"})
    }
}

exports.controllerGetProducts = controllerGetProducts;
exports.controllerGetProductsWithId = controllerGetProductsWithId;
exports.controllerPostProducts = controllerPostProducts;
exports.controllerPutProductsWithId = controllerPutProductsWithId;
exports.controllerDeleteProductsWithId = controllerDeleteProductsWithId;