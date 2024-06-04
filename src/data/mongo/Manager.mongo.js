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
    async paginate({filter, sortAndPaginate}) {
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
    async readByEmail(email) {
      try {
        const one = await this.Model.findOne({ email });
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
    async destroy(id = null) {
      try {
        let result;
        if (id === 'all') {
          result = await this.Model.deleteMany({});
        } else {
          result = await this.Model.findByIdAndDelete(id);
        }
        return result;
      } catch (error) {
        throw error;
      }
    }
  }
  
  export default Manager;