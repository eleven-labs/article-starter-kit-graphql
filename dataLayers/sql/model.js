class Model {
  constructor(Database, tableName, idColumn = "id") {
    this.Database = Database;
    this.tableName = tableName;
    this.idColumn = idColumn;
  }

  get database() {
    return this.Database(this.tableName);
  }

  all() {
    return this.database.select().orderBy("id");
  }

  findOne(where) {
    return this.database.where(where).first();
  }
}

module.exports = Model;
