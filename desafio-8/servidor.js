import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { engine } from 'express-handlebars';

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
import { randomUUID as generarId } from 'crypto'
import { contenedorDeProductos } from './contenedorDeProductos.js'
import { contenedorDeMensajes } from './contenedorDeMensajes.js'
import { routerProductos } from './routerProductos.js'

server.use('/productos', routerProductos)

//socket ------------------------------------------------

io.on('connection', async (socket) => {    
    console.log("usuario conectado: " + socket.id)
    
    //productos
    const productos = await contenedorDeProductos.recuperar()
    io.sockets.emit('productosActualizados', productos)

    socket.on('nuevoProducto', async producto => {
        const nuevoProducto = producto;
        nuevoProducto.id = generarId();
        await contenedorDeProductos.guardar(nuevoProducto);
        io.sockets.emit('productosActualizados', await contenedorDeProductos.recuperar());
    })
    
    //mensajes
    const mensajes = await contenedorDeMensajes.recuperar()
    io.sockets.emit('mensajesActualizados', mensajes)

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        await contenedorDeMensajes.guardar(mensaje)
        io.sockets.emit('mensajesActualizados', await contenedorDeMensajes.recuperar());
    })

})



export function conectar(puerto) {
    return new Promise((resolve, reject) => {
        const servidorConectador = httpServer.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}


