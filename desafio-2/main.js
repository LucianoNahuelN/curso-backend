const Contenedor = require("./ContenedorArchivos")
async function test() {
    const rutaArchivo = 'productos.txt'

    // //creo el contenedor
    const contenedorProductos = new Contenedor(rutaArchivo)

    //agrego productos
    const producto1 = {
        id: 1,
        title: "cafe",
        price: 500,
        thumbnail: "url"
    }
    const producto2 = {
        id: 2,
        title: "cocacola",
        price: 250,
        thumbnail: "url"
    }
    const producto3 = {
        id: 3,
        title: "pepsi",
        price: 200,
        thumbnail: "url"
    }
    const producto4 = {
        id: 4,
        title: "te",
        price: 100,
        thumbnail: "url"
    }
    console.log(await contenedorProductos.save(producto1))
    console.log(await contenedorProductos.save(producto2))

    // //Busco los productos por su id
    // console.log(await producto.getById(1))

    // //Elimino un producto por id
    console.log(await contenedorProductos.deleteById(2))

    // //Busco todos los productos
    console.log(await contenedorProductos.getAll())

    //agrego mas productos
    console.log(await contenedorProductos.save(producto3))
    console.log(await contenedorProductos.save(producto4))

    //get all
    console.log(await contenedorProductos.getAll())

    //Elimino todos los productos
    // await contenedorProductos.deleteAll()
    // console.log(await contenedorProductos.getAll())
}

test()