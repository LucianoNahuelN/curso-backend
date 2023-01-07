import { chosenProdsContainer } from "../containers/Container.js";
import { saveProduct, updateProductById, deleteProduct } from "../models/productModel.js";


async function controllerGetProducts(req, res){
    try {
        const products = await chosenProdsContainer.getAll()
        res.json(products)
        res.status(200);
    } catch (error) {
        res.status(500);
        res.json({message: "Error al mostrar los productos"})
    }
} 
async function controllerGetProductsWithId({params: {id}}, res){
    try {
        const wantedProduct = await chosenProdsContainer.getById(id);
        if (!wantedProduct) {
            res.status(404);
            res.json({ message: `no se encontró producto con el id (${id})` });
        } else {
            res.status(200);
            res.json(wantedProduct);
        }
    } catch (error) {
        res.status(500);
        res.json({message: "Error al mostrar el producto por id"})
    }
} 
async function controllerPostProducts(req, res){
    try {
        const newProduct = req.body;
        await saveProduct(newProduct);
        res.status(201);
        res.json(newProduct);
    } catch (error) {
        res.status(500);
        res.json({message: "Error al agregar un producto"})
    }
} 
async function controllerPutProductsWithId({body, params: {id}}, res) {
   try {
    // const products = await container.getAll();
    // const wantedindex = products.findIndex(c => c.id === id);
    // if (wantedindex === -1) {
    //     res.status(404);
    //     res.json({ message: `no se encontró producto con ese id (${id})` });
    // } else {
    //     body.id = id
    //     products[wantedindex] = body;
    //     container.update(products);
    //     res.json(body);
    // }
    const object = body;
    await updateProductById(id, object);
    res.status(201);
    res.json(object); //ver respuesta
   } catch (error) {
    res.status(500);
    res.json({message: "Error al cambiar producto"})
   }
}
async function controllerDeleteProductsWithId({ params: { id } }, res) {
    try {
        // const products = await container.getAll();
        // const wantedindex = products.findIndex(c => c.id === id);
        // if (wantedindex === -1) {
        //     res.status(404);
        //     res.json({ message: `no se encontró producto con ese id (${id})` });
        // } else {
        //     await container.deleteById(id);
        //     res.json({message: "exito al eliminar el producto"});
        // }
        await deleteProduct(id);
        res.status(201);
        res.json({message: "Exito al eliminar el producto"})
    } catch (error) {
        res.status(500);
        res.json({message: "Error al eliminar el producto"})
    }
}
function notFound(req, res) {
    try {
      res.status(404).json({ Message: 'Page not found', 'Wrong route': req.path, Method: req.method });
    } catch (error) {
      throw new Error('Error en el controlador notFound');
    }
  }

export { controllerGetProducts, controllerGetProductsWithId, controllerPostProducts, controllerPutProductsWithId, controllerDeleteProductsWithId, notFound }