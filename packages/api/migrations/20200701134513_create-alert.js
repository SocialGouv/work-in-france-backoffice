
exports.up = async function(knex) {
  await knex.raw('create extension if not exists "uuid-ossp"');
  return knex.schema.createTable("alert", table => {
    table
      .uuid("id")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .primary();
    table.string("ds_key").notNullable();
    table.string("url").notNullable();
    table.jsonb("group").notNullable();
    table.string("alert_type").notNullable();
    table.string("message").notNullable();
    table.specificType("instructors_history", "varchar ARRAY").notNullable();
    table.string("email_id");
    table.string("email_usager");
    table.specificType("email_instructors", "varchar ARRAY").notNullable();
    table.string("date_debut_apt");
    table.timestamp("processed_at");
    table.jsonb("email");
    table.string("email_state");
    table.timestamp("email_processed_at");
    table.string("state");
  });
};

exports.down = function(knex) {

};
