const Logger = require("../wrappers/logger");
const Hooks = require("../wrappers/hooks");


exports.seed = knex => {
  Logger(knex);
  Hooks(knex);

};
