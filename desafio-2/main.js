const fs = require('fs');

class Contenedor {
    archivo
    objetos
    
    constructor(rutaArchivo, id, title, price, thumbnail) {
        this.archivo = rutaArchivo;
        this.objetos = [{id: id, title: title, price: price, thumbnail: thumbnail}];
    }
    
    async save(nuevoProducto) {
        this.objetos.push(nuevoProducto);
        await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos));
        return "Producto agregado";
    }

    async getById(id) {
        this.objetos = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
        const productoBuscado = this.objetos.find(elemento => elemento.id === id);
        if(productoBuscado === undefined){
            return null;
        }
        else{
             return productoBuscado; 
        }
    }

    async getAll() {
        this.objetos = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
        return this.objetos
    }

    async deleteById(id) {
        this.objetos = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
        for(let i = 0; i < this.objetos.length; i++){
            if(this.objetos[i].id === id){
                this.objetos.splice(i,1);
            }
        }
        await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos));
        return "Producto con id: "+ id + " eliminado";
    }

    async deleteAll() {
    
        this.objetos = []
        await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos));
    }
}


async function test() {
    const rutaArchivo = 'productos.txt'
    await fs.promises.writeFile(rutaArchivo, JSON.stringify([]))
    //./curso-backend/desafio-2/
    //creo el contenedor
    const producto = new Contenedor(rutaArchivo)
    
    //agrego productos
    const producto1 = {
        id: 1,
        title:"cafe",
        price: 500,
        thumbnail: "url"
    }
    const producto2 = {
        id: 2,
        title:"cocacola",
        price: 250,
        thumbnail: "url"
    }
    const producto3 = {
        id: 3,
        title:"pepsi",
        price: 200,
        thumbnail: "url"
    }
    const producto4 = {
        id: 4,
        title:"te",
        price: 100,
        thumbnail: "url"
    }
    console.log(await producto.save(producto1))
    console.log(await producto.save(producto2))
    
    //Busco los productos por su id
    console.log(await producto.getById(1))
    
    //Elimino un producto por id
    console.log(await producto.deleteById(2))
    
    //Busco todos los productos
    console.log(await producto.getAll())
    
    //agrego mas productos
    console.log(await producto.save(producto3))
    console.log(await producto.save(producto4))

    //get all
    console.log(await producto.getAll())
    
   //Elimino todos los productos
    //await producto.deleteAll()
    //console.log(await producto.getAll())
}

test()