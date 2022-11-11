const fs = require('fs');
const express = require('express')
const server = express()

const Contenedor = require("./ContenedorArchivos")
const contenedor =  new Contenedor('productos.txt')


server.get('/productos', async (peticion, respuesta) => {
    respuesta.send(await contenedor.getAll()) 
})

server.get('/productoRandom', async (peticion, respuesta) => {
    respuesta.send(await contenedor.getRandom()) 
})

function conectar(puerto) {
    return new Promise((resolve, reject) => {
        const servidorConectador = server.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}


module.exports = { conectar }