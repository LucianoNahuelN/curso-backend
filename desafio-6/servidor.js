const fs = require('fs')
const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
// const { webRouter } = require('./routers/webRouter.js');
const { engine } = require('express-handlebars');

const server = express();
const httpServer = new HttpServer(server);
const io = new IOServer(httpServer);

//middlewares
server.use(express.json()) //para interpretar cuando enviamos json
server.use(express.urlencoded({extended: true})) //para interpretar cuiando envio formulario
server.use('/views', express.static('views')) //para acceder a carpeta
server.use(express.static('public'))

//handlebars
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')

//rutas
// server.use(webRouter)

//socket ------------------------------------------------
const Contenedor = require("./ContenedorArchivos")
const contenedorProductos =  new Contenedor('productos.txt')
const contenedorMensajes =  new Contenedor('mensajes.txt')


const personas = []
io.on('connection', async (socket) => {    
    console.log("usuario conectado: " + socket.id)
    const productos = await contenedorProductos.getAll()

    //productos

    io.sockets.emit('productosActualizados', productos)

    socket.on('nuevoProducto', async producto => {
        await contenedorProductos.save(producto);
        io.sockets.emit('productosActualizados', await contenedorProductos.getAll());
    })
    
    //mensajes

    const mensajes = await contenedorMensajes.getAll()

    io.sockets.emit('mensajesActualizados', mensajes)

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        await contenedorMensajes.save(mensaje)
        io.sockets.emit('mensajesActualizados', await contenedorMensajes.getAll());
    })

})



function conectar(puerto) {
    return new Promise((resolve, reject) => {
        const servidorConectador = httpServer.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}


module.exports = { conectar }