import { Router } from "express";
import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read();
    products.reverse(); // Invertir el orden del array para que muestre los ultimos productos primero.
    return res.render("index", {
      title:
        "¡Manantiales Market!, donde comprar y vender entre vecinos es fácil.",
      products: products,
    });
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/products/real", async (req, res, next) => {
  try {
    const products = await productManager.read();
    return res.render("productsReal", {
      title: "¡Manantiales Market! - Carga tu Producto ",
      products: products,
    });
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/users/:uid", async (req, res, next) => {
  try {
    const userId = req.params.uid; // Obtener el id del usuario de los parámetros de la URL
    const userLogged = await userManager.readOne(userId); // Leer el usuario correspondiente

    if (!userLogged) {
      // Si el usuario no existe, devolver un error 404
      return res.status(404).send("Usuario no encontrado");
    }

    const { name } = userLogged; // Obtener el nombre del usuario

    // Renderizar la vista del panel de usuario con los datos del usuario
    return res.render("userPanel", {
      title: `¡Manantiales Market! - Bienvenido a tu Panel ${name}!`,
      userLogged: userLogged,
    });
  } catch (error) {
    // Manejar errores
    return next(error);
  }
});

viewsRouter.get("/products/:pid", async (req, res, next) => {
  try {
    const productId = req.params.pid; // Obtener el id del producto de los parámetros de la URL
    const productFound = await productManager.readOne(productId); // Leer el producto correspondiente

    if (!productFound) {
      // Si el producto no existe, devolver un error 404
      return res.status(404).send("Producto NO encontrado");
    }

    const { product } = productFound.title; // Obtener el nombre del producto

    // Renderizar la vista del panel de usuario con los datos del usuario
    return res.render("productDetail", {
      title: `¡Manantiales Market! - ${product}!`,
      productFound: productFound,
    });
  } catch (error) {
    // Manejar errores
    return next(error);
  }
});

viewsRouter.get("/users/register", async (req, res, next) => {
  try {
    return res.render("register", {
      title: "¡Manantiales Market! - Registro ",
    });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;
