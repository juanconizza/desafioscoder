import Service from "./services.js";
import usersManager from "../data/mongo/managers/UsersManager.mongo.js";

const usersService = new Service(usersManager);
export const { createService, readService, paginateService, readOneService, readOneEmailService, updateService, destroyService } = usersService;