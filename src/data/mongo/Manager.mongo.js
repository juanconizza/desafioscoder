class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read(filter) {
    try {
      //filter para filtrar por categorias
      const all = await this.Model.find(filter).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async paginate({ filter, sortAndPaginate }) {
    try {
      //Filter para filtrar por categorias
      const all = await this.Model.paginate(filter, sortAndPaginate);
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.Model.findOne({ _id: id }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readBy(obj) {
    try {
      const one = await this.Model.findOne(obj).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      let one = await this.Model.findOne({ email }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(ids = null) {
    try {
      let result;  
      
      if (ids === "all") {
        // Elimina todos los documentos
        const deleteResult = await this.Model.deleteMany({});
        result = {
          acknowledged: deleteResult.acknowledged,
          deletedCount: deleteResult.deletedCount
        };
      } else if (Array.isArray(ids) && ids.length > 0) {
        // Elimina los documentos que coincidan con los IDs proporcionados
        const deleteResult = await this.Model.deleteMany({ _id: { $in: ids } });
        result = {
          acknowledged: deleteResult.acknowledged,
          deletedCount: deleteResult.deletedCount
        };
      } else if (ids) {
        // Elimina un único documento por ID
        result = await this.Model.findByIdAndDelete(ids);
        result = result ? { acknowledged: true, deletedCount: 1 } : { acknowledged: false, deletedCount: 0 };
      } else {
        throw new Error("Invalid input for destroy method");
      }
  
      return result;
    } catch (error) {
      throw error;
    }
  }  
}

export default Manager;
