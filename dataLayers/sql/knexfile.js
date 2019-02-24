const { knexCamelCaseMappers } = require("./helpers");

const config = {
  development: {
    client: "pg",
    connection:
      process.env.DB_URL ||
      "postgres://elevenlabs:elevenlabs@db:5432/elevenlabs",
    migrations: {
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    },
    useNullAsDefault: true,
    ...knexCamelCaseMappers()

  },
};

module.exports = config;
