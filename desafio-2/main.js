const fs = require('fs')

class Contenedor {
    archivo
    objetos
    
    constructor(nombre) {
        this.archivo = nombre;
        this.objetos = [];
    }
    
    async save(id, title, price, thumbnail) {
        this.objetos.push({id: id, title: title, price: price, thumbnail: thumbnail});
        await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos));
    }

    async getById(id) {
        this.objetos = JSON.parse(await fs.promises.readFile(this.archivos, 'utf-8'))
        const productoBuscado = this.objetos.find(elemento => elemento.id === id);
        if(productoBuscado === undefined){
            return null;
        }
        else{
             return productoBuscado; 
        }
    }

    async getAll() {
        this.objetos = JSON.parse(await fs.promises.readFile(this.archivos, 'utf-8'))
        return this.objetos
    }

    async deleteById(id) {
        this.objetos = JSON.parse(await fs.promises.readFile(this.archivos, 'utf-8'))
        for(let i = 0; i < this.objetos.length; i++){
            if(this.objetos[i].id === id){
                this.objetos.splice(i,1);
            }
        }
        await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos));
    }

    async deleteAll() {
    
        this.objetos = []
        await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos));
    }
}


async function test() {
    const rutaArchivo = './productos.txt'
    await fs.promises.writeFile(rutaArchivo, JSON.stringify(this.objetos))

    //creo el contenedor
    const producto = new Contenedor(rutaArchivo)
    
    //agrego productos
    console.log(await producto.save(1, 'cafe', 500, 'url'))
    console.log(await producto.save(2, 'te', 170,'url'))
    
    //Busco los productos por su id
    console.log(await producto.getById(1))
    
    //Elimino un producto por id
    console.log(await producto.deleteById(2))
    
    //Busco todos los productos
    console.log(await producto.getAll())
    
    //agrego mas productos
    console.log(await producto.save(3, 'coca cola', 300,'url'))
    console.log(await producto.save(4, 'pepsi', 250,'url'))

    //get all
    console.log(await producto.getAll())
    
   //Elimino todos los productos
    //await producto.deleteAll()
}

test()