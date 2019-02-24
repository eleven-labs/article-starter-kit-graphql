const { camelCase, snakeCase } = require("lodash");
const Client = require("knex/lib/dialects/postgres");

const convertToCamel = result =>
  Object.keys(result).reduce((acc, key) => {
    const value = result[key];
    acc[camelCase(key)] = value;
    return acc;
  }, {});



const knexCamelCaseMappers = () => ({
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map(row => convertToCamel(row));
    } else if (typeof result === "object") {
      return convertToCamel(result);
    }

    return result;
  },
  wrapIdentifier: (value, origImpl, queryContext) => {
    if (value === "*") return value;
    const matched = value.match(/(.*?)(\[[0-9]\])/);
    if (matched) {
      return (
        Client.prototype.wrapIdentifier.wrapIdentifier(matched[1]) + matched[2]
      );
    }
    return origImpl(snakeCase(value));
  }
});

module.exports = knexCamelCaseMappers;
