const express = require('express');
const { routerApi } = require('./routers/routerApi');
const server = express()

//middlewares
server.use(express.json()) //para interpretar cuando enviamos json
server.use(express.urlencoded({extended: true})) //para interpretar cuiando envio formulario
server.use('/views', express.static('views')) //para acceder a carpeta

//rutas
server.use('/api',routerApi)

function conectar(puerto) {
    return new Promise((resolve, reject) => {
        const servidorConectador = server.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}


module.exports = { conectar }