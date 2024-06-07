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

  update(id, data) {
    return this.baseModel.update(id, data);
  }

  delete(id) {
    return this.baseModel.delete(id);
  }
}

module.exports = BaseService;
