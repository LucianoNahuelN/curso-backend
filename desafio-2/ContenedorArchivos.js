const fs = require('fs');

class ContenedorArchivos {
    archivo
    objetos

    constructor(rutaArchivo) {
        this.archivo = rutaArchivo;
        this.objetos = [];
    }

    async save(nuevoProducto) {
        try {
            this.objetos = await this.getAll();
            this.objetos.push(nuevoProducto);
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos, null, 2));
            return "Producto agregado";
        } catch (error) {
            throw new Error("Error al guardar el producto")
        }
    }

    async getById(id) {
        try {
            this.objetos = await this.getAll();
            const productoBuscado = this.objetos.find(elemento => elemento.id === id);
            if (productoBuscado === undefined) {
                return null;
            }
            else {
                return productoBuscado;
            }
        } catch (error) {
            throw new Error("Error al llamar el producto")
        }
    }

    async getAll() {
        try {
            this.objetos = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
            return this.objetos
        } catch (error) {
            return []
        }
    }

    async deleteById(id) {
        try {
            this.objetos = await this.getAll();
            for (let i = 0; i < this.objetos.length; i++) {
                if (this.objetos[i].id === id) {
                    this.objetos.splice(i, 1);
                }
            }
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos, null, 2));
            return "Producto con id: " + id + " eliminado";
        } catch (error) {
            throw new Error("Error al eliminar el producto")
        }
    }

    async deleteAll() {
        try {
            this.objetos = []
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.objetos, null, 2));
        } catch (error) {
            throw new Error("Error al eliminar todos los productos")
        }
    }
}

module.exports = ContenedorArchivos