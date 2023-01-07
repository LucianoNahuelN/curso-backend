import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js';
import routerApiAdmin from './routers/routerApiAdmin.js';
import routerApiCart from './routers/routerApiShoppingCart.js';

const server = express()

//middlewares
server.use(express.json()) //para interpretar cuando enviamos json
server.use(express.urlencoded({extended: true})) //para interpretar cuiando envio formulario
server.use('/views', express.static('views')) //para acceder a carpeta

//rutas
server.use('/api/products',routerApiProducts)
server.use('/api', routerApiAdmin)
server.use('/api', routerApiCart)

//rutas no validas
import { notFound } from './controllers/controllerProducts.js';
server.all('*', notFound);

export function connect(port) {
    return new Promise((resolve, reject) => {
        const serverConnect = server.listen(port, () => {
            resolve(serverConnect)
        })
        serverConnect.on("error", error => reject(error))
    })
}


