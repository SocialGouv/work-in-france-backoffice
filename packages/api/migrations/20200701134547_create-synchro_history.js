exports.up = async function(knex) {
  return knex.schema.createTable("synchro_history", table => {
    table
      .uuid("id")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .primary();
    table.string("scheduler").notNullable();
    table.timestamp("last_synchro").notNullable();
  });
};

exports.down = function(knex) {};
