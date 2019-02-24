const knex = require("knex");
const config = require("./knexfile");

const Wrappers = require("./wrappers");

const SQLExtension = require("./sqlExtension");
const SQLDataSource = require("./sqlDataSource");
const ModelFactory = require("./modelFactory");

const environment = process.env.NODE_ENV || "development";
let Database = knex({
  ...config[environment]
});

Wrappers(Database);

module.exports = {
  SQLExtension,
  Database,
  SQLDataSource,
  ModelFactory
};
