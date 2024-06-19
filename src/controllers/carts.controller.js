import {
  createService,
  readService,
  paginateService,
  readOneService,
  readOneEmailService,
  updateService,
  destroyService,
} from "../services/carts.service.js";

class CartsController {
  readCartContacts = async (req, res, next) => {
    try {
      const state = req.query.state;
      const cartContacts = await readService();
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
  };

  readPaginatedCartContacts = async (req, res, next) => {
    try {
      const filter = {};
      const sortAndPaginate = {};
      if (req.query.limit) {
        sortAndPaginate.limit = req.query.limit;
      }
      if (req.query.page) {
        sortAndPaginate.page = req.query.page;
      }
      if (req.query.buyer_id) {
        filter.buyer_id = req.query.buyer_id;
      }

      const products = await paginateService({
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
  };

  readCartContactById = async (req, res, next) => {
    try {
      const cartContactId = req.params.cid;
      const cartContact = await readOneService(cartContactId);

      if (cartContact) {
        res.status(200).json({
          statusCode: 200,
          response: cartContact,
        });
      } else {
        res.status(404).json({
          statusCode: 404,
          response: null,
          message: `Did NOT find the cart contact with ID ${cartContactId}.`,
        });
      }
    } catch (error) {
      return next(error);
    }
  };

  createCartContact = async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data)
      const newCartContact = await createService(data);
      res.status(201).json({
        statusCode: 201,
        response: newCartContact.id,
        message: "Cart contact created successfully!",
      });
    } catch (error) {
      return next(error);
    }
  };

  updateCartContact = async (req, res, next) => {
    try {
      const cartContactId = req.params.cid;
      const newData = req.body;
      const updatedCartContact = await updateService(
        cartContactId,
        newData
      );

      if (updatedCartContact) {
        res.status(200).json({
          statusCode: 200,
          response: updatedCartContact,
        });
      } else {
        throw new Error(
          `Failed to update cart contact with ID ${cartContactId}.`
        );
      }
    } catch (error) {
      return next(error);
    }
  };

  deleteCartContact = async (req, res, next) => {
    try {
      const cartContactId = req.params.cid;
      const deletedCartContact = await destroyService(
        cartContactId
      );

      if (deletedCartContact) {
        res.status(200).json({
          statusCode: 200,
          response: deletedCartContact,
        });
      } else {
        throw new Error(
          `Failed to delete cart contact with ID ${cartContactId}.`
        );
      }
    } catch (error) {
      return next(error);
    }
  };

  deleteAllCartContacts = async (req, res, next) => {
    try {
      const deletedCartContacts = await destroyService("all");

      if (deletedCartContacts) {
        res.status(200).json({
          statusCode: 200,
          message: "All cart contacts deleted successfully.",
        });
      } else {
        throw new Error("Failed to delete all cart contacts.");
      }
    } catch (error) {
      return next(error);
    }
  };
}

const cartsController = new CartsController();
const {
  readCartContacts,
  readPaginatedCartContacts,
  readCartContactById,
  createCartContact,
  updateCartContact,
  deleteCartContact,
  deleteAllCartContacts,
} = cartsController;
export {
  readCartContacts,
  readPaginatedCartContacts,
  readCartContactById,
  createCartContact,
  updateCartContact,
  deleteCartContact,
  deleteAllCartContacts,
};
