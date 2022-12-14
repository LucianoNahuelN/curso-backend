import { chosenCartContainer, chosenProdsContainer } from '../containers/Container.js';
import { randomUUID } from 'crypto';

// ---- CART MODEL ES USADO POR EL CONTROLADOR  ---- 


// post crea un carrito  con una lista vacia de productos
// y devuelve su id
export async function createCart() { 
  try {
    const idRandom = randomUUID();
    const cart = {
      id: idRandom,
      products: []
    }
    const saveCart = await chosenCartContainer.save(cart);
    return saveCart.id;
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear el carrito');
  }
}

//para incorporar productos al carrito, necesitamos le id del producto
export async function saveProduct(idProd, idCart) {
  let newArray = [];
  try {
    const product = await chosenProdsContainer.getById(idProd); // busca el producto
    const cart = await chosenCartContainer.getById(idCart); // busca el carrito
    if (!product) throw new Error('El producto no se encuentra')
    if (!cart) throw new Error('El carrito no se encuentra')
    newArray = cart.products.slice();
    newArray.push(product);
    const updateCart = {
      id: cart.id,
      products: newArray.slice()
    };
    await chosenCartContainer.updateById(cart, updateCart); // andara asi ?
  } catch (err) {
    console.log(err);
    throw new Error('Error al guardar productos en el carrito');
  }
}

//para visualizar los productos que hay en el carrito
export async function getAllProducts(idCart) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    return cart.products;
  } catch (err) {
    console.log(err);
    throw new Error('Error al visualizar los productos del carrito');
  }
}

// delete -- vaciar el carrito -- recibe id_carrito
export async function deleteProducts(idCart) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    if (cart) { 
      const updateCart = {
        id: cart.id,
        products: []
      };
      await chosenCartContainer.updateById(cart, updateCart);
    }
  } catch (err) {
    console.log(err);
    throw new Error('Error al borrar los productos de un carrito');
  }
}

// Eliminar un solo articulo del carrito, obtiene ambos ID por params
export async function deleteOneProduct(idCart, idProd) {
  try {
    const cart = await chosenCartContainer.getById(idCart);
    // const array = cart.products.filter(ele => ele.id !== idProd);
    const allProducts = cart.products;
   
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id === idProd) {
          allProducts.splice(i, 1);
      }
  }
  const newCart = {
    id: cart.id,
    products: allProducts
  }
  newCart.id = cart.id;
    await chosenCartContainer.updateById(cart, newCart);
  } catch (err) {
    console.log(err);
    throw new Error('Error al intentar eliminar un producto del carrito');
  }
}