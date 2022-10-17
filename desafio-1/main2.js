class Contenedor{
    #objetos;
    constructor(){
        this.#objetos = [];
    }
    save(id, title, price, thumbnail){
        let productos = 
        {
        id: id, 
        title: title,
        price: price,
        thumbnail: thumbnail
        };
        this.#objetos.push(productos);
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

const producto = new Contenedor;

// Agrego los productos al contenedor
producto.save(1, "cafe", 500, "url");
producto.save(2, "te", 150, "url");

//Busco los productos por su id
console.log(producto.getById(1));
console.log(producto.getById(2));

//Busco todos los productos
console.log(producto.getAll());

//Elimino un producto por id
producto.deleteById(2);

//Elimino todos los productos
// producto.deleteAll();

