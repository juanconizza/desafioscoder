import dao from "../data/dao.factory.js";
import PurchaseDTO from "../dto/purchase.dto.js";
const { purchase } = dao;

class PurchaseRepository {
  constructor(manager) {
    this.model = manager;
  }

  createRepository = async (data) => {
    try {
      data = new PurchaseDTO(data);      
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readRepository = async (filter) => {
    try {
      const all = await this.model.read(filter);
      return all;
    } catch (error) {
      throw error;
    }
  };

  paginateRepository = async ({ filter, sortAndPaginate }) => {
    try {
      const all = await this.model.paginate({ filter, sortAndPaginate });
      return all;
    } catch (error) {
      throw error;
    }
  };

  readOneRepository = async (uid) => {
    try {
      const one = await this.model.readOne(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readByEmailRepository = async (email) => {
    try {
      const one = await this.model.readByEmail(email);
      return one;
    } catch (error) {
      throw error;
    }
  };

  updateRepository = async (uid, data) => {
    try {
      const one = await this.model.update(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  destroyRepository = async (uid) => {
    try {
      const one = await this.model.destroy(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
}

const purchaseRepository = new PurchaseRepository(purchase);
export default purchaseRepository;
