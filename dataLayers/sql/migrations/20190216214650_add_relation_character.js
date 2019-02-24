const AddRelationCharacterSchema = {
  up: (knex, Promise) => {
    return Promise.all([
      knex.schema.table("character", table => {
        table.integer("father_id");
        table
          .foreign("father_id")
          .references("character.id")
          .onDelete("SET NULL")
          .onUpdate("SET NULL");
        table.integer("mother_id");
        table
          .foreign("mother_id")
          .references("character.id")
          .onDelete("SET NULL")
          .onUpdate("SET NULL");
        table.integer("spouse_id");
        table
          .foreign("spouse_id")
          .references("character.id")
          .onDelete("SET NULL")
          .onUpdate("SET NULL");
        table.integer("house_id");
        table
          .foreign("house_id")
          .references("house.id")
          .onDelete("SET NULL")
          .onUpdate("SET NULL");
      })
    ]);
  },
  down: (knex, Promise) => {
    return Promise.all([
      knex.schema.table("character", table => {
        table.dropColumn("father_id");
        table.dropColumn("mother_id");
        table.dropColumn("spouse_id");
        table.dropColumn("house_id");
      })
    ]);
  }
};

module.exports = AddRelationCharacterSchema;
