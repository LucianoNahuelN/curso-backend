const fs = require('fs');
const express = require('express')
const server = express()

async function read() {
    try {
        const result = JSON.parse(await fs.promises.readFile(`./productos.txt`,'utf-8'))
        return result
    } catch (error) {
        return(`Archivo no encontrado`)
    }
}

class Contenedor {
    archivo
    
    constructor(rutaArchivo) {
        this.archivo = rutaArchivo;
    }

    async getRandom() {
        let resultadoPorId
        await read(this.archivo).then(result => {
            if (result == `Archivo ${this.archivo} no encontrado`) {
                resultadoPorId = result
            } else {
                let a = result.find(el => el.id === 1)
                if (a) {
                    resultadoPorId = a
                } else {
                    resultadoPorId = 'Producto no encontrado'
                }
            }
        })
        return resultadoPorId
    }

    async getAll() {
        let resultadoTotal
        await read(this.archivo).then(result => {
            resultadoTotal = result
        })
        return resultadoTotal
    }

}


server.get('/productos', async (peticion, respuesta) => {
    const contenedor =  new Contenedor('productos')
    respuesta.send(await contenedor.getAll()) 
})

server.get('/productoRandom', async (peticion, respuesta) => {
    const contenedor =  new Contenedor('productos')
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