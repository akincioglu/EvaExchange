class BaseService {
  constructor(model) {
    this.baseModel = model;
  }

  list(where = {}) {
    return this.baseModel.findAll(where);
  }

  read(where) {
    return this.baseModel.findOne(where);
  }

  create(data) {
    return this.baseModel.create(data);
  }

  delete(_id) {
    return this.baseModel.delete(_id);
  }
}

module.exports = BaseService;
