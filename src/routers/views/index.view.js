import { Router } from "express";
import  {ProductManager}  from "../../data/fs/ProductManager.js"

const viewsRouter = Router();

const productManager = new ProductManager();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read(); 
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
    
    return res.render("productsReal", { 
      title: "¡Manantiales Market! - Carga tu Producto ",
     
    });
  } catch (error) {
    return next(error);
  }
});


export default viewsRouter;
