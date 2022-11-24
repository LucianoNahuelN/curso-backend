const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { webRouter } = require('./routers/webRouter.js');
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
server.use(webRouter)

//socket ------------------------------------------------

async function read(name) {
    try {
        const result = JSON.parse(await fs.promises.readFile(`./${name}.txt`,'utf-8'))
        return result
    } catch (error) {
        return([])
    }
}

io.on('connection', async (socket) => {    
    
    const productos = await read("productos")

    //productos

    io.sockets.emit('productosActualizados', productos)

    socket.on('nuevoProducto', async producto => {
        await read("productos")
        .then(resultado => {
            io.sockets.emit('productosActualizados', resultado);
        })
    })

    //mensajes

    const mensajes = await read("mensajes")

    io.sockets.emit('mensajesActualizados', mensajes)

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        await read("mensajes")
        .then(async resultado => {
            const mensajes = resultado
            mensajes.push(mensaje)
            await fs.promises.writeFile(`./mensajes.txt`,JSON.stringify(mensajes))
            io.sockets.emit('mensajesActualizados', resultado);
        })
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