class Service {
    constructor(manager) {
      this.model = manager;
    }
    createService = async (data) => {
      try {
        const one = await this.model.create(data);
        return one;
      } catch (error) {
        throw error;
      }
    };
    readService = async (filter) => {
      try {
        const all = await this.model.read(filter);
        return all;
      } catch (error) {
        throw error;
      }
    };
    paginateService = async ({ filter, sortAndPaginate }) => {
      try {
        const all = await this.model.paginate({ filter, sortAndPaginate });
        return all;
      } catch (error) {
        throw error;
      }
    };
    readOneService = async (id) => {
      try {
        const one = await this.model.readOne(id);
        return one;
      } catch (error) {
        throw error;
      }      
    };
    readOneEmailService = async (email) => {
        try {
          const one = await this.model.readByEmail(email);
          return one;
        } catch (error) {
          throw error;
        }      
      };
    updateService = async (id, data) => {
      try {
        const one = await this.model.update(id, data);
        return one;
      } catch (error) {
        throw error;
      }
    };
    destroyService = async (id) => {
      try {
        const one = await this.model.destroy(id);
        return one;
      } catch (error) {
        throw error;
      }
    };
  }
  
  export default Service;