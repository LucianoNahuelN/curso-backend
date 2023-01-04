import fs from 'fs';

export default class ContainerFiles {
    files
    objets

    constructor(routeFiles) {
        this.files = routeFiles;
        this.objets = [];
    }

    async save(newProduct) {
        try {
            this.objets = await this.getAll();
            this.objets.push(newProduct);
            await fs.promises.writeFile(this.files, JSON.stringify(this.objets, null, 2));
            return "Producto agregado";
        } catch (error) {
            throw new Error("Error al guardar el producto")
        }
    }

    async getById(id) {
        try {
            this.objets = await this.getAll();
            const wantedProduct = this.objets.find(e => e.id === id);
            if (wantedProduct === undefined) {
                return null;
            }
            else {
                return wantedProduct;
            }
        } catch (error) {
            throw new Error("Error al llamar el producto")
        }
    }

    async getAll() {
        try {
            this.objets = JSON.parse(await fs.promises.readFile(this.files, 'utf-8'))
            return this.objets
        } catch (error) {
            return []
        }
    }

    async deleteById(id) {
        try {
            this.objets = await this.getAll();
            for (let i = 0; i < this.objets.length; i++) {
                if (this.objets[i].id === id) {
                    this.objets.splice(i, 1);
                }
            }
            await fs.promises.writeFile(this.files, JSON.stringify(this.objets, null, 2));
            return "Producto con id: " + id + " eliminado";
        } catch (error) {
            throw new Error("Error al eliminar el producto")
        }
    }

    async deleteAll() {
        try {
            this.objets = []
            await fs.promises.writeFile(this.files, JSON.stringify(this.objets, null, 2));
        } catch (error) {
            throw new Error("Error al eliminar todos los productos")
        }
    }

    async getRandom() {
        try {
            this.objets = await this.getAll();
            //math.floor redondea hacia abajo
            let posRandom = Math.floor(Math.random() * this.objets.length)
            return this.objets[posRandom]
        } catch (error) {
            throw new Error("Error al traer el producto random")
        }
    }
    async update(data){
        try {
            await fs.promises.writeFile(this.files, JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error("Error al actualizar") 
        }
    }
}

