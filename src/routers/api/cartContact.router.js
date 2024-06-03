import CustomRouter from "../CustomRouter.js";
import cartContactManager from "../../data/mongo/managers/CartContactManager.mongo.js";

class CartContactRouter extends CustomRouter {
  init() {
    // Endpoint para obtener todos los cart contact

    this.read("/", ["USER"], async (req, res, next) => {
      try {
        const state = req.query.state;
        const cartContacts = await cartContactManager.read();
        const filteredCartContacts = state
          ? cartContacts.filter((cartContact) => cartContact.state === state)
          : cartContacts;
        const totalCartContacts = filteredCartContacts.length;

        if (filteredCartContacts.length === 0) {
          return res.status(404).json({
            statusCode: 404,
            response: null,
            message: "No Carts Contacts for Display",
          });
        }

        res.status(200).json({
          statusCode: 200,
          totalCartContacts: totalCartContacts,
          response: filteredCartContacts,
        });
      } catch (error) {
        return next(error);
      }
    });

    // Endpoint para obtener el carrito filtrado por usuario con propiedades paginate
    this.read("/paginate", ["USER"], async (req, res, next) => {
      try {
        const filter = {};
        const sortAndPaginate = {};
        //condicional para tomar el query de limit y utilizarlo.
        if (req.query.limit) {
          sortAndPaginate.limit = req.query.limit;
        }
        //condicional para tomar el query de page y utilizarlo.
        if (req.query.page) {
          sortAndPaginate.page = req.query.page;
        }
        //condicional para tomar el query de buyer_id y utilizarlo como filtro.
        if (req.query.buyer_id) {
          filter.buyer_id = req.query.buyer_id;
        }

        const products = await cartContactManager.paginate({
          filter,
          sortAndPaginate,
        });

        res.status(200).json({
          statusCode: 200,
          response: products.docs,
          info: {
            page: products.page,
            limit: products.limit,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            totalPages: products.totalPages,
          },
        });
      } catch (error) {
        return next(error);
      }
    });

    //Endpoint para leer un cart contact por id usando el metodo readOne()

    this.read("/:cid", ["USER"], async (req, res, next) => {
      try {
        // Obtener el parámetro pid de la URL
        const cartContactId = req.params.cid;

        // Leer el cart contact con el ID proporcionado
        const cartContact = await cartContactManager.readOne(cartContactId);

        // Verificar si se encontró el cart contact
        if (cartContact) {
          // Enviar al cliente el cart contact encontrado con un código de estado 200
          res.status(200).json({
            statusCode: 200,
            response: cartContact,
          });
        } else {
          // Si no se encontró el cart contact, enviar una respuesta con un código de estado 404 y un mensaje descriptivo
          res.status(404).json({
            statusCode: 404,
            response: null,
            message: `Did NOT find the cart contact with ID ${cartContactId}.`,
          });
        }
      } catch (error) {
        return next(error);
      }
    });

    // Endpoint para crear un nuevo cart contact (POST).

    this.create("/", ["USER"], async (req, res, next) => {
      try {
        const data = req.body;

        // Crear el cart contact utilizando el método create(data) del CartContactManager
        const newCartContact = await cartContactManager.create(data);

        // Manejar el caso de éxito
        res.status(201).json({
          statusCode: 201,
          response: newCartContact.id,
          message: "Cart contact created successfully!",
        });
      } catch (error) {
        // Manejar errores utilizando el errorHandler
        return next(error);
      }
    });

    // Endpoint para actualizar un cart contact por su ID
    this.update("/:cid", ["USER"], async (req, res, next) => {
      try {
        const cartContactId = req.params.cid;
        const newData = req.body;

        // Actualizar el cart contact utilizando el método update(cid, data) del CartContactManager
        const updatedCartContact = await cartContactManager.update(
          cartContactId,
          newData
        );

        // Verificar si el cart contact se actualizó correctamente
        if (updatedCartContact) {
          // Enviar al cliente el cart contact actualizado con un código de estado 200
          res.status(200).json({
            statusCode: 200,
            response: updatedCartContact,
          });
        } else {
          // Si no se pudo actualizar el cart contact, enviar un mensaje de error
          throw new Error(
            `Failed to update cart contact with ID ${cartContactId}.`
          );
        }
      } catch (error) {
        // Manejar errores utilizando el errorHandler
        return next(error);
      }
    });

    // Endpoint para eliminar un cart contact por su ID
    this.destroy("/:cid", ["USER"], async (req, res, next) => {
      try {
        const cartContactId = req.params.cid;

        // Eliminar el cart contact utilizando el método destroy(cid) del CartContactManager
        const deletedCartContact = await cartContactManager.destroy(
          cartContactId
        );

        // Verificar si el cart contact se eliminó correctamente
        if (deletedCartContact) {
          // Enviar al cliente el cart contact eliminado con un código de estado 200
          res.status(200).json({
            statusCode: 200,
            response: deletedCartContact,
          });
        } else {
          // Si no se pudo eliminar el cart contact, enviar un mensaje de error
          throw new Error(
            `Failed to delete cart contact with ID ${cartContactId}.`
          );
        }
      } catch (error) {
        // Manejar errores utilizando el errorHandler
        return next(error);
      }
    });
  }
}

const cartContactRouter = new CartContactRouter();

export default cartContactRouter.getRouter();
