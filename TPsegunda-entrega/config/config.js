//firestore

const cnxStrFirestore = './config/coderhouse32185-9605c-firebase-adminsdk-yl72n-7d3ad2205f.json'

export const CNX_STR_FIRESTORE = cnxStrFirestore

//mongoDb

const cnxStrMongoLocal = 'mongodb://root:mongopassword@localhost:27017/ecommerce?authSource=admin'

export const CNX_STR_MONGO = cnxStrMongoLocal
export const DB_NAME = 'ecommerce'

//files
export const RUTA = '../products.txt';
export const CART_ROUT = '../cart.txt';


// PERSISTENCIA
export const PERSISTENCIA = 'mongodb';
// export const PERSISTENCIA = 'firestore';
// export const PERSISTENCIA = 'fs'