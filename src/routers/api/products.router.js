import { Router } from "express";
import { ProductManager } from "../../../src/data/fs/ProductManager.js";
import errorHandler from "../../middlewares/errorHandler.js";
import validateProductsProps from "../../middlewares/validateProductsProps.js";

const productRouter = Router();
const productManager = new ProductManager();

// Endpoint para obtener todos los productos
productRouter.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const products = await productManager.read();
    const filteredProducts = category
      ? products.filter((product) => product.category === category)
      : products;

    if (filteredProducts.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No Products for Display",
      });
    }

    res.status(200).json({
      statusCode: 200,
      response: filteredProducts,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
});

//Endpoint para leer un producto por id usando el metodo readOne()

productRouter.get("/:pid", async (req, res) => {
  try {
    // Obtener el parámetro pid de la URL
    const productId = req.params.pid;

    // Leer el producto con el ID proporcionado
    const product = await productManager.readOne(productId);

    // Verificar si se encontró el producto
    if (product) {
      // Enviar al cliente el producto encontrado con un código de estado 200
      res.status(200).json({
        statusCode: 200,
        response: product,
      });
    } else {
      // Si no se encontró el producto, enviar una respuesta con un código de estado 404 y un mensaje descriptivo
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: `Did NOT find the product with ID ${productId}.`,
      });
    }
  } catch (error) {
    return errorHandler(error, req, res);
  }
});

// Endpoint para crear un nuevo producto (POST) con validador de propiedades como middleware.

productRouter.post("/", validateProductsProps, async (req, res) => {
  try {
    const data = req.body;

    // Crear el producto utilizando el método create(data) del ProductManager
    const newProduct = await productManager.create(data);

    // Manejar el caso de éxito
    res.status(201).json({
      statusCode: 201,
      response: newProduct.id,
      message: "Product created successfully!",
    });
    } catch (error) {
    // Manejar errores utilizando el errorHandler
    return errorHandler(error, req, res);
  }
});

// Endpoint para actualizar un producto por su ID
productRouter.put("/:pid", validateProductsProps, async (req, res) => {
  try {
    const productId = req.params.pid;
    const newData = req.body;

    // Actualizar el producto utilizando el método update(pid, data) del ProductManager
    const updatedProduct = await productManager.update(productId, newData);

    // Verificar si el producto se actualizó correctamente
    if (updatedProduct) {
      // Enviar al cliente el producto actualizado con un código de estado 200
      res.status(200).json({
        statusCode: 200,
        response: updatedProduct,
      });
    } else {
      // Si no se pudo actualizar el producto, enviar un mensaje de error
      throw new Error(`Failed to update product with ID ${productId}.`);
    }
  } catch (error) {
    // Manejar errores utilizando el errorHandler
    return errorHandler(error, req, res);
  }
});

// Endpoint para eliminar un producto por su ID
productRouter.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;

    // Eliminar el producto utilizando el método destroy(pid) del ProductManager
    const deletedProduct = await productManager.destroy(productId);

    // Verificar si el producto se eliminó correctamente
    if (deletedProduct) {
      // Enviar al cliente el producto eliminado con un código de estado 200
      res.status(200).json({
        statusCode: 200,
        response: deletedProduct,
      });
    } else {
      // Si no se pudo eliminar el producto, enviar un mensaje de error
      throw new Error(`Failed to delete product with ID ${productId}.`);
    }
  } catch (error) {
    // Manejar errores utilizando el errorHandler
    return errorHandler(error, req, res);
  }
});

export default productRouter;
