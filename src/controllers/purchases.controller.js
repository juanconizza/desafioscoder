import {
    createService,
    readService,
    paginateService,
    readOneService,
    updateService,
    destroyService,
  } from "../services/purchases.service.js";
  
  class PurchasesController {
    // Leer todas las compras con filtrado opcional por estado
    readPurchases = async (req, res, next) => {
      try {
        const state = req.query.state;
        const purchases = await readService();
        const filteredPurchases = state
          ? purchases.filter((purchase) => purchase.state === state)
          : purchases;
        const totalPurchases = filteredPurchases.length;
  
        if (totalPurchases === 0) {
          return res.status(404).json({
            statusCode: 404,
            response: null,
            message: "No purchases found.",
          });
        }
  
        res.status(200).json({
          statusCode: 200,
          totalPurchases,
          response: filteredPurchases,
        });
      } catch (error) {
        return next(error);
      }
    };
  
    // Leer compras paginadas con filtrado opcional por buyer_id
    readPaginatedPurchases = async (req, res, next) => {
      try {
        const filter = {};
        const sortAndPaginate = {};
  
        if (req.query.limit) {
          sortAndPaginate.limit = parseInt(req.query.limit, 10);
        }
        if (req.query.page) {
          sortAndPaginate.page = parseInt(req.query.page, 10);
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
  
    // Leer una compra específica por ID
    readPurchaseById = async (req, res, next) => {
      try {
        const purchaseId = req.params.cid;
        const purchase = await readOneService(purchaseId);
  
        if (purchase) {
          res.status(200).json({
            statusCode: 200,
            response: purchase,
          });
        } else {
          res.status(404).json({
            statusCode: 404,
            response: null,
            message: `Purchase with ID ${purchaseId} not found.`,
          });
        }
      } catch (error) {
        return next(error);
      }
    };
  
    // Crear una nueva compra
    createPurchase = async (req, res, next) => {
      try {        
        const data = req.body;
        const newPurchase = await createService(data);
  
        res.status(201).json({
          statusCode: 201,
          response: newPurchase,
          message: "Purchase created successfully!",
        });
      } catch (error) {
        return next(error);
      }
    };
  
    // Actualizar una compra existente por ID
    updatePurchase = async (req, res, next) => {
      try {
        const purchaseId = req.params.cid;
        const newData = req.body;
        const updatedPurchase = await updateService(purchaseId, newData);
  
        if (updatedPurchase) {
          res.status(200).json({
            statusCode: 200,
            response: updatedPurchase,
          });
        } else {
          throw new Error(`Failed to update purchase with ID ${purchaseId}.`);
        }
      } catch (error) {
        return next(error);
      }
    };
  
    // Eliminar una compra por ID
    deletePurchase = async (req, res, next) => {
      try {
        const purchaseId = req.params.cid;
        const deletedPurchase = await destroyService(purchaseId);
  
        if (deletedPurchase) {
          res.status(200).json({
            statusCode: 200,
            response: deletedPurchase,
            message: "Purchase deleted successfully.",
          });
        } else {
          throw new Error(`Failed to delete purchase with ID ${purchaseId}.`);
        }
      } catch (error) {
        return next(error);
      }
    };
  
    // Eliminar todas las compras
    deleteAllPurchases = async (req, res, next) => {
      try {
        const deletedPurchases = await destroyService("all");
  
        if (deletedPurchases) {
          res.status(200).json({
            statusCode: 200,
            message: "All purchases deleted successfully.",
          });
        } else {
          throw new Error("Failed to delete all purchases.");
        }
      } catch (error) {
        return next(error);
      }
    };
  }
  
  const purchasesController = new PurchasesController();
  const {
    readPurchases,
    readPaginatedPurchases,
    readPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase,
    deleteAllPurchases,
  } = purchasesController;
  
  export {
    readPurchases,
    readPaginatedPurchases,
    readPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase,
    deleteAllPurchases,
  };
  