class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName() {
        let mensaje = "El nombre completo del usuario es " + this.nombre + " " + this.apellido;
        return mensaje;
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    getMascota(){
        return this.mascotas
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(libro, autor){
        this.libros.push({libro: libro, autor: autor})
    }
    getBookNames(){
        const librosMap = this.libros.map(elemento => elemento.libro);
        return librosMap;
    }
}

const usuario1 = new Usuario("Luciano", "Nuñez") ;

usuario1.addBook("met, el muerto", "pepito");
usuario1.addBook("juego de tronos", "George Martin");
usuario1.addMascota("Teo");
usuario1.addMascota("Ragnar");
usuario1.addMascota("Cati");

console.log(usuario1.getFullName());
console.log(usuario1.getBookNames());
console.log(usuario1.getMascota())
console.log(usuario1.countMascotas());

