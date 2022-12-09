const express = require('express');
const { routerApiProducts } = require('./routers/routerApiProducts');
const { routerApiAdmin } = require('./routers/routerApiAdmin');
const { routerApiCart } = require('./routers/routerApiShoppingCart');
const server = express()

//middlewares
server.use(express.json()) //para interpretar cuando enviamos json
server.use(express.urlencoded({extended: true})) //para interpretar cuiando envio formulario
server.use('/views', express.static('views')) //para acceder a carpeta

//rutas
server.use('/api/products',routerApiProducts)
server.use('/api', routerApiAdmin)
server.use('/api', routerApiCart)

function connect(port) {
    return new Promise((resolve, reject) => {
        const serverConnect = server.listen(port, () => {
            resolve(serverConnect)
        })
        serverConnect.on("error", error => reject(error))
    })
}


module.exports = { connect }