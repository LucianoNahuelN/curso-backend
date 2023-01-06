import { Router } from 'express'
import { contenedorDeProductos } from './contenedorDeProductos.js'

export const routerProductos = Router()

routerProductos.post('/', async (req, res) => {
    const nuevoProducto = req.body
    await contenedorDeProductos.guardar(nuevoProducto)
    res.json(nuevoProducto)
})

routerProductos.get('/', async (req, res) => {
    res.json(await contenedorDeProductos.recuperar())
})