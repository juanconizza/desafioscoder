import Service from "./services.js";
import cartsContactRepository from "../repositories/cartsContact.rep.js";

const cartsService = new Service(cartsContactRepository);
export const { createService, readService, paginateService, readOneService, readOneEmailService, updateService, destroyService } = cartsService;