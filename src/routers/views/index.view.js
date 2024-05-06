import { Router } from "express";
import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import userManager from "../../data/mongo/managers/UsersManager.mongo.js";
import cartContactManager from "../../data/mongo/managers/CartContactManager.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    const sortAndPaginate = {};
    //condicional para tomar el query de limit y utilizarlo.
    if (req.query.limit) {
      sortAndPaginate.limit = req.query.limit;
    } else {
      sortAndPaginate.limit = 8; //Acá condicionamos a que si no hay un limite establecido se muestran siempre 8 por defecto.
    }
    //condicional para tomar el query de page y utilizarlo.
    if (req.query.page) {
      sortAndPaginate.page = req.query.page;
    }
    //condicional para tomar el query de categoria y utilizarlo como filtro.
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await productManager.paginate({ filter, sortAndPaginate });

    // Obtén la información de paginación para usarla en front-end
    const paginationInfo = {
      productsAll: products.docs,
      page: products.page,
      limit: products.limit,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      totalPages: products.totalPages,
    };

    //Validador de rutas para paginar
    const currentPageURL = req.originalUrl;
    let prevPageURL = currentPageURL;
    let nextPageURL = currentPageURL;

    // Verificar si ya existe el parámetro "page" en la URL actual
    if (currentPageURL.includes("page=")) {
      // Modificar el valor del parámetro "page" para las URLs de página anterior y siguiente
      prevPageURL = currentPageURL.replace(
        /page=\d+/i,
        `page=${paginationInfo.prevPage}`
      );
      nextPageURL = currentPageURL.replace(
        /page=\d+/i,
        `page=${paginationInfo.nextPage}`
      );
    } else {
      // Agregar el parámetro "page" a las URLs de página anterior y siguiente
      prevPageURL = currentPageURL.includes("?")
        ? `${currentPageURL}&page=${paginationInfo.prevPage}`
        : `${currentPageURL}?page=${paginationInfo.prevPage}`;
      nextPageURL = currentPageURL.includes("?")
        ? `${currentPageURL}&page=${paginationInfo.nextPage}`
        : `${currentPageURL}?page=${paginationInfo.nextPage}`;
    }

    // Renderiza la vista con los productos y la información de paginación
    return res.render("index", {
      title:
        "¡Manantiales Market!, donde comprar y vender entre vecinos es fácil.",
      productsAll: paginationInfo.productsAll,
      paginationInfo: paginationInfo,
      prevPageURL: prevPageURL,
      nextPageURL: nextPageURL,
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

viewsRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", {
      title: "¡Manantiales Market! - Registro ",
    });
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login", {
      title: "¡Manantiales Market! - Login ",
    });
  } catch (error) {
    return next(error);
  }
});


viewsRouter.get("/cart", async (req, res, next) => {
  try {
    const filter = {};
    const sortAndPaginate = {};
    //condicional para tomar el query del comprador y utilizarlo como filtro.
    if (req.query.buyer_id) {
      filter.buyer_id = req.query.buyer_id;
    }

    const buyerFound = await cartContactManager.paginate({ filter, sortAndPaginate });

    const cartInfo = buyerFound.docs

    console.log(cartInfo);
     
    if (!buyerFound) {
      // Si el producto no existe, devolver un error 404
      return res.status(404).send("Carrito NO encontrado");
    }
      
    return res.render("cart", {
      title:
      "¡Manantiales Market! - Carrito",
      cartInfo: cartInfo,
    });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;

