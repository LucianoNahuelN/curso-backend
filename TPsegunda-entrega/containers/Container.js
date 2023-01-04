// en este contenedor invoco los contenedores (firestore, mongodb )
import { CART_ROUT, PERSISTENCIA, RUTA } from '../config/config.js';
import { MongoDBContainer } from './ContainerMongoDB.js';
import { FirestoreContainer } from './ContainerFirestone.js';
import  ContainerFiles  from './ContainerFiles.js';


export let chosenProdsContainer;
export let chosenCartContainer;

switch (PERSISTENCIA) {
  case 'mongodb':
    chosenProdsContainer = new MongoDBContainer('products');
    chosenCartContainer = new MongoDBContainer('cart');
    break;
  case 'firestore':
    chosenProdsContainer = new FirestoreContainer('products');
    chosenCartContainer = new FirestoreContainer('cart');
    break;
  case 'fs':
    chosenProdsContainer = new ContainerFiles(RUTA);
    chosenCartContainer = new ContainerFiles(CART_ROUT);
    break;
  default:
    throw new Error("Elegir la forma de guardar datos")
}