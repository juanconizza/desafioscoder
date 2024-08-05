import Service from "./services.js";
import usersRepository from "../repositories/users.rep.js";

const usersService = new Service(usersRepository);
export const { createService, readService, paginateService, readOneService, readOneEmailService, updateService, destroyService } = usersService;