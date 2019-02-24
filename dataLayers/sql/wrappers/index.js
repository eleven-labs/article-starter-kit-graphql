const Hooks = require("./hooks");
const Logger = require("./logger");

module.exports = Database => {
    Hooks(Database),
    Logger(Database)
};
