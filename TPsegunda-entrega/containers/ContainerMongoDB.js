import { mongoDatabase } from "../config/mongoClient.js";


export class MongoDBContainer {
  #collection;
  constructor(collectionName) {
    this.#collection = mongoDatabase.collection(collectionName);
  }

  async save(object) { // guardar objeto - anda bien
    try {
      await this.#collection.insertOne(object);
    } catch (err) {
      console.log(err);
      throw new Error('Error al guardar en mongodb');
    }
    return object;
  }

  async getAll() { // obtener todo - anda bien 
    try {
      return await this.#collection.find({}).toArray(); // es necesario el objeto vacio ??
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener elementos en mongodb');
    }
  }

  async getById(id) { // anda bien
    try {
      return await this.#collection.findOne({ id: id });
    } catch (err) {
      console.log(err);
      throw new Error('Error al obtener un dato en mongodb');
    }
  }

  async updateById(oldObject, obj) { // anda bien
    try {
      await this.#collection.updateOne(oldObject, { $set: obj }); // corregir "metodo coleccion.updateById ?"
    } catch (err) {
      console.log(err);
      throw new Error('Error al actualizar un dato en mongodb');
    }
  }

  async deleteById(object) {
    try {
      await this.#collection.deleteOne({ id: object.id });
    } catch (err) {
      console.log(err);
      throw new Error('Error al eliminar un dato en mongodb');
    }
  }

  async deleteAll() {
    try {
      await this.#collection.deleteMany({});
      // borra toda la coleccion con un objeto literal vacio
    } catch (err) {
      console.log(err);
      throw new Error('Error al intentear eliminar todos los datos, en mongodb');
    }
  }
}