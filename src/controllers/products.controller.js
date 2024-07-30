import {
  createService,
  readService,
  paginateService,
  readOneService,
  readOneEmailService,
  updateService,
  destroyService,
} from "../services/products.service.js";

class ProductsController {
  readProducts = async (req, res, next) => {
    try {
      const category = req.query.category;
      const products = await readService();
      const filteredProducts = category
        ? products.filter((product) => product.category === category)
        : products;
      const totalProducts = filteredProducts.length;

      if (filteredProducts.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          response: null,
          message: "No Products for Display",
        });
      }

      res.status(200).json({
        statusCode: 200,
        totalProducts: totalProducts,
        response: filteredProducts,
      });
    } catch (error) {
      return next(error);
    }
  };

  readPaginatedProducts = async (req, res, next) => {
    try {
      const filter = {};
      const sortAndPaginate = {};
      if (req.query.limit) {
        sortAndPaginate.limit = req.query.limit;
      }
      if (req.query.page) {
        sortAndPaginate.page = req.query.page;
      }
      if (req.query.category) {
        filter.category = req.query.category;
      }
      if (req.query.seller_id) {
        filter.seller_id = req.query.seller_id;
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

  readProductById = async (req, res, next) => {
    try {
      const productId = req.params.pid;
      const product = await readOneService(productId);

      if (product) {
        res.status(200).json({
          statusCode: 200,
          response: product,
        });
      } else {
        res.status(404).json({
          statusCode: 404,
          response: null,
          message: `Did NOT find the product with ID ${productId}.`,
        });
      }
    } catch (error) {
      return next(error);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = await createService(data);
      res.status(201).json({
        statusCode: 201,
        response: newProduct.id,
        message: "Product created successfully!",
      });
    } catch (error) {
      return next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const productId = req.params.pid;
      const newData = req.body;
      const updatedProduct = await updateService(productId, newData);

      if (updatedProduct) {
        res.status(200).json({
          statusCode: 200,
          response: updatedProduct,
        });
      } else {
        throw new Error(`Failed to update product with ID ${productId}.`);
      }
    } catch (error) {
      return next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const productId = req.params.pid;
      const deletedProduct = await destroyService(productId);

      if (deletedProduct) {
        res.status(200).json({
          statusCode: 200,
          response: deletedProduct,
        });
      } else {
        throw new Error(`Failed to delete product with ID ${productId}.`);
      }
    } catch (error) {
      return next(error);
    }
  };
}

const productsController = new ProductsController();
const {
  readProducts,
  readPaginatedProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = productsController;
export {
  readProducts,
  readPaginatedProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
