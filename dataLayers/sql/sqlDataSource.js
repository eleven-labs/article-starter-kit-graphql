const { DataSource } = require("apollo-datasource");

class SQLDataSource extends DataSource {
  initialize(config) {
    const { Database, ModelFactory } = config.context.dataLayers.sql;
    this.Database = Database;
    this.ModelFactory = ModelFactory;
  }
}

module.exports = SQLDataSource;
