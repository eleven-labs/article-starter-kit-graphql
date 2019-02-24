const CharacterSchema = {
  up: (knex, Promise) => {
    return Promise.all([
      knex.schema.createTable("character", table => {
        table.increments();
        table.timestamps(true, true);
        table.string("name").notNullable();
        table.string("image_url");
      })
    ]);
  },
  down: (knex, Promise) => {
    return Promise.all([knex.schema.dropTable("character")]);
  }
};

module.exports = CharacterSchema;
