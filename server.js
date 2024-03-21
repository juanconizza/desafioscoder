import express from "express";
import { UserManager } from "./data/fs/UserManager.js";
import { ProductManager } from "./data/fs/ProductManager.js";

const app = express();
const port = 8080;

// Inicializar el gestor de usuarios
const userManager = new UserManager();

// Inicializar el gestor de productos
const productManager = new ProductManager();

// Middleware para manejar JSON
app.use(express.json());

// Este middleware de Express analiza los cuerpos de las solicitudes entrantes en un formulario codificado en URL y los coloca en req.body.
app.use(express.urlencoded({ extended: true }));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Endpoint para obtener todos los productos y un query si existe la categoría la filtra

app.get("/api/products", async (req, res) => {
  try {
    const category = req.query.category;
    const products = await productManager.read();
    // Filtrar los productos por categoría si se proporciona una categoría en la query
    const filteredProducts = category ? products.filter(product => product.category === category) : products;

     // Verificar si hay productos después de filtrar
     if (filteredProducts.length === 0) {
      // Si no hay productos, enviar una respuesta con un código de estado 404 y un mensaje descriptivo
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No Products for Display"
      });
    }

    // Si se encuentran productos, enviarlos como respuesta
    res.status(200).json({
      statusCode: 200,
      response: filteredProducts
    });
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Endpoint para leer un producto por id usando el metodo readOne()

app.get("/api/products/:pid", async (req, res) => {
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
        response: product
      });
    } else {
      // Si no se encontró el producto, enviar una respuesta con un código de estado 404 y un mensaje descriptivo
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: `Dis NOT find the product with ID ${productId}.`
      });
    }
  } catch (error) {
    // En caso de error, enviar una respuesta con un código de estado 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
});



// Endpoint para obtener todos los usuarios y filtro query por rol
app.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query; // Obtener el valor del parámetro role de la query

    let users = await userManager.read();

    // Filtrar usuarios por rol si se proporciona el parámetro role
    if (role) {
      users = users.filter(user => user.role === role);
    }

    // Verificar si hay usuarios después de filtrar
    if (users.length > 0) {
      res.status(200).json({
        statusCode: 200,
        response: users
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No users to display"
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint para obtener un usuario por su ID
app.get("/api/users/:uid", async (req, res) => {
  try {
    const user = await userManager.readOne(req.params.uid);
    if (!user) {
      res.status(404).json({ statusCode: 404, response: null, message: "User not found" });
    } else {
      res.status(200).json({ statusCode: 200, response: user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

