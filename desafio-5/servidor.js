const express = require('express');
const { webRouter } = require('./routers/webRouter.js');
const { engine } = require('express-handlebars');
const server = express();

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

function conectar(puerto) {
    return new Promise((resolve, reject) => {
        const servidorConectador = server.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}


module.exports = { conectar }