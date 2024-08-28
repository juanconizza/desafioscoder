import Service from "./services.js";
import purchaseRepository from "../repositories/purchases.rep.js";

const purchasesService = new Service(purchaseRepository);
export const { createService, readService, paginateService, readOneService, readOneEmailService, updateService, destroyService } = purchasesService;