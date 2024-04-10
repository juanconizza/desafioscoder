import { Router } from "express";
import  {ProductManager}  from "../../data/fs/ProductManager.js"
import { UserManager } from "../../data/fs/UserManager.js";

const viewsRouter = Router();

const productManager = new ProductManager();
const userManager = new UserManager();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read(); 
    products.reverse(); // Invertir el orden del array para que muestre los ultimos productos primero.
    return res.render("index", { 
      title: "¡Manantiales Market!, donde comprar y vender entre vecinos es fácil.",
      products: products 
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
      products: products 
    });
  } catch (error) {
    return next(error);
  }
});


viewsRouter.get("/panel/:uid", async (req, res, next) => {
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
      userLogged: userLogged
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
