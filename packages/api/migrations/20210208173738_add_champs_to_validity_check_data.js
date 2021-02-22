
exports.up = (knex) =>
  knex.schema.table("validity_check",
    (table) => table.jsonb("champs").defaultTo("[]")
  );

exports.down = (knex) =>
  knex.schema.table("validity_check", (table) =>
    table.dropColumn("champs")
  )
