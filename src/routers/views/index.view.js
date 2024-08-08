import CustomRouter from "../CustomRouter.js";
//import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
//import userManager from "../../data/mongo/managers/UsersManager.mongo.js";
//import cartContactManager from "../../data/mongo/managers/CartContactManager.mongo.js";
import { verifyToken } from "../../utils/token.js";
import productsRepository from "../../repositories/products.rep.js";
import usersRepository from "../../repositories/users.rep.js";
import cartsContactRepository from "../../repositories/cartsContact.rep.js";

class ViewsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const filter = {};
        const sortAndPaginate = {};
        sortAndPaginate.sort = { createdAt: -1 };
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

        const products = await productsRepository.paginateRepository({
          filter,
          sortAndPaginate,
        });

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

    this.read("/products/real", ["USER"], async (req, res, next) => {
      try {
        const products = await productsRepository.readRepository();
        return res.render("productsReal", {
          title: "¡Manantiales Market! - Carga tu Producto ",
          products: products,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/users/", ["USER"], async (req, res, next) => {
      try {
        const userId = req.user.user_id; // Obtener el id del usuario de los parámetros de user
        const userFound = await usersRepository.readOneRepository(userId); // Leer el usuario correspondiente
        const userProducts = await productsRepository.readRepository({
          seller_id: userId,
        }); // Leer los productos publicados por el usuario
        const isOnline = req.user.online;

        if (!isOnline || !userFound) {
          // Si el usuario no existe, devolver un error 404
          return res.status(404).send("Usuario no encontrado");
        }

        const { name } = userFound; // Obtener el nombre del usuario
        console.log(userProducts);
        // Renderizar la vista del panel de usuario con los datos del usuario y sus productos
        return res.render("userPanel", {
          title: `¡Manantiales Market! - Bienvenido a tu Panel ${name}!`,
          userLogged: userFound,
          userProducts: userProducts, 
        });
      } catch (error) {
        // Manejar errores
        return next(error);
      }
    });

    this.read("/products/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const productId = req.params.pid;
        const productFound = await productsRepository.readOneRepository(
          productId
        );
        if (!productFound) {
          return res.status(404).send("Producto NO encontrado");
        }

        //Leer el vendedor del producto
        const seller = await usersRepository.readOneRepository(
          productFound.seller_id
        );

        // Leer el token de la cookie firmada
        const token = req.signedCookies.token;

        // Variables predeterminadas
        let isOnline = false;
        let user_id = null;

        if (token) {
          try {
            const decoded = verifyToken(token);
            const { user_id: decodedUserId, online } = decoded;
            isOnline = online;
            user_id = decodedUserId;
          } catch (error) {
            // Manejar error de verificación de token si es necesario
            console.error("Error al verificar el token:", error);
          }
        }

        return res.render("productDetail", {
          title: `¡Manantiales Market! - ${productFound.title}!`,
          productFound: productFound,
          isOnline: isOnline,
          user_id: user_id,
          seller: seller,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/register", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("register", {
          title: "¡Manantiales Market! - Registro ",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/verify", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("verifyEmail", {
          title: "¡Manantiales Market! - Verificá tu Correo",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.create("/verify", ["PUBLIC"], async (req, res, next) => {
      try {
        const { email } = req.body;
        const { verificationCode } = req.body;

        if (!email || !verificationCode) {
          return res.status(400).send("User ID or verification code missing.");
        }

        const user = await usersRepository.readByEmailRepository(email);

        if (!user) {
          return res.status(404).send("User not found.");
        }

        if (user.verifyCode === verificationCode) {
          await usersRepository.updateRepository(user._id, { verify: true });
          return res.send("Account verified successfully.");
        } else {
          return res
            .status(400)
            .send("El código de verificación y/o email es incorrecto.");
        }
      } catch (error) {
        return next(error);
      }
    });

    this.read("/login", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("login", {
          title: "¡Manantiales Market! - Login ",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/reset-password-step1", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("reset-password-step1", {
          title: "¡Manantiales Market! - Recuperar Contraseña ",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/reset-password-step2", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("reset-password-step2", {
          title: "¡Manantiales Market! - Crea tu Nueva Contraseña",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/cart/", ["USER"], async (req, res, next) => {
      try {
        const filter = {};
        const sortAndPaginate = {};

        //condicional para tomar el params del comprador y utilizarlo como filtro.
        if (req.user.user_id) {
          filter.buyer_id = req.user.user_id;
        }

        const buyerFound = await cartsContactRepository.paginateRepository({
          filter,
          sortAndPaginate,
        });

        const cartInfo = buyerFound.docs;

        if (!buyerFound) {
          // Si el producto no existe, devolver un error 404
          return res.status(404).send("Carrito NO encontrado");
        }

        return res.render("cart", {
          title: "¡Manantiales Market! - Carrito",
          cartInfo: cartInfo,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();
