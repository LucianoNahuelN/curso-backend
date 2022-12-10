const fs = require('fs')
const { randomUUID } = require('crypto')

const Contenedor = require("../ContenedorArchivos")
const contenedor =  new Contenedor('productos.txt')

async function controladorGetProductos(peticion, res){
    try {
        productos = await contenedor.getAll()
        res.render('productos', {mensaje: 'Lista de productos', productos});
    } catch (error) {
        res.status(500);
        res.json({mensaje: "Error al mostrar los productos"})
    }
} 
async function controladorPostProductos(req, res){
    try {
        const nuevoProducto = req.body;
        nuevoProducto.id = randomUUID();
        await contenedor.save(nuevoProducto);
        res.status(201);
        res.redirect('/');
    } catch (error) {
        res.status(500);
        res.json({mensaje: "Error al agregar un producto"})
    }
} 

exports.controladorGetProductos = controladorGetProductos;
exports.controladorPostProductos = controladorPostProductos;