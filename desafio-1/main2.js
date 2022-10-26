class Contenedor{
    #objetos;
    constructor(id, title, price, thumbnail){
        this.#objetos = [{id: id, title: title, price: price, thumbnail: thumbnail}];
    }
    save(nuevoProducto){
        this.#objetos.push(nuevoProducto);
        return 'Producto agregado.'
    }
    getById(id){
        const productoBuscado = this.#objetos.find(elemento => elemento.id === id);
        if(productoBuscado === undefined){
            return null;
        }
        else{
            return productoBuscado; 
        }
    }
    getAll(){
        return this.#objetos;
    }
    deleteById(id){
        for(let i = 0; i < this.#objetos.length; i++){
            if(this.#objetos[i].id === id){
                this.#objetos.splice(i,1);
            }
        }
    }
    deleteAll(){
        this.#objetos.splice(0, this.#objetos.length+1);
    }
}

const producto = new Contenedor();

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

// Agrego los productos al contenedor
producto.save(producto1);
producto.save(producto2);
producto.save(producto3);

//Busco los productos por su id
console.log(producto.getById(1));
console.log(producto.getById(2));

//Busco todos los productos
console.log(producto.getAll());

//Elimino un producto por id
producto.deleteById(3);

//Elimino todos los productos
// producto.deleteAll();
