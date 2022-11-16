const fs = require('fs')
const { randomUUID } = require('crypto')

const Contenedor = require("../ContenedorArchivos")
const contenedor =  new Contenedor('productos.txt')

async function controladorGetProductos(peticion, res){
    try {
        productos = await contenedor.getAll()
        res.json(productos) 
    } catch (error) {
        res.status(500);
        res.json({mensaje: "Error al mostrar los productos"})
    }
} 
async function controladorGetProductosSegunId({params: {id}}, res){
    try {
        productos = await contenedor.getAll()
        const buscado = productos.find(c => c.id === id);
        if (!buscado) {
            res.status(404);
            res.json({ mensaje: `no se encontró producto con el id (${id})` });
        } else {
            res.json(buscado);
        }
    } catch (error) {
        res.status(500);
        res.json({mensaje: "Error al mostrar el producto por id"})
    }
} 
async function controladorPostProductos(peticion, res){
    try {
        const nuevoProducto = req.body;
        nuevoProducto.id = randomUUID();
        await save(nuevoProducto);
        res.status(201);
        respuesta.json(nuevoProducto);
    } catch (error) {
        res.status(500);
        res.json({mensaje: "Error al agregar un producto"})
    }
} 
async function controladorPutProductosSegunId({body, params: {id}}, res) {
   try {
    productos = await contenedor.getAll()
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        productos[indiceBuscado] = body;
        res.json(body);
    }
   } catch (error) {
    res.status(500);
        res.json({mensaje: "Error al cambiar producto"})
   }
}
async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    try {
        const borrados = await deleteById(id)
        res.json(borrados);
        
    } catch (error) {
        res.status(500);
        res.json({mensaje: "Error al eliminar el producto"})
    }
}

exports.controladorGetProductos = controladorGetProductos;
exports.controladorGetProductosSegunId = controladorGetProductosSegunId;
exports.controladorPostProductos = controladorPostProductos;
exports.controladorPutProductosSegunId = controladorPutProductosSegunId;
exports.controladorDeleteProductosSegunId = controladorDeleteProductosSegunId;