import Service from "./services.js";
import cartsManager from "../data/mongo/managers/CartContactManager.mongo.js";

const cartsService = new Service(cartsManager);
export const { createService, readService, paginateService, readOneService, readOneEmailService, updateService, destroyService } = cartsService;