import express from "express";
import { Router } from "express";
import { ProductManager } from "../../../src/data/fs/ProductManager.js";
import errorHandler from "../../middlewares/errorHandler.js";


const app = express();

const productRouter = Router();

// Inicializar el gestor de productos
const productManager = new ProductManager();



// Endpoint para obtener todos los productos y un query si existe la categoría la filtra

app.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const products = await productManager.read();
    // Filtrar los productos por categoría si se proporciona una categoría en la query
    const filteredProducts = category
      ? products.filter((product) => product.category === category)
      : products;

    // Verificar si hay productos después de filtrar
    if (filteredProducts.length === 0) {
      // Si no hay productos, enviar una respuesta con un código de estado 404 y un mensaje descriptivo
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No Products for Display",
      });
    }

    // Si se encuentran productos, enviarlos como respuesta
    res.status(200).json({
      statusCode: 200,
      response: filteredProducts,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
});

//Endpoint para leer un producto por id usando el metodo readOne()

app.get("/:pid", async (req, res) => {
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
        message: `Dis NOT find the product with ID ${productId}.`,
      });
    }
  } catch (error) {
    return errorHandler(error, req, res);
  }
});

export default productRouter;
