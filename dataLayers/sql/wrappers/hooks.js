const knexHooks = require("knex-hooks");

module.exports = Database => {
  knexHooks(Database);

  return Database;
};
