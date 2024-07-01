import Service from "./services.js";
import productsRepository from "../repositories/products.rep.js";

const productsService = new Service(productsRepository);
export const { createService, readService, paginateService, readOneService, readOneEmailService, updateService, destroyService } = productsService;