
exports.up = (knex) =>
  knex.schema.table("validity_check",
    (table) => table.string("type")
  ).then(() => knex("validity_check").update({ type: "autorisation" }));

exports.down = (knex) =>
  knex("validity_check").where({ type: "introduction" }).delete()
    .then(() => knex.schema.table("validity_check", (table) =>
      table.dropColumn("type")
    ));

