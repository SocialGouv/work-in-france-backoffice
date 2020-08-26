exports.up = async function(knex) {
  return knex.schema.alterTable("validity_check", function(table) {
    table
      .bigInteger("dossier_id")
      .notNullable()
      .alter();
  });
};

exports.down = async function(knex) {
  return knex.schema.alterTable("validity_check", function(table) {
    table
      .integer("dossier_id")
      .notNullable()
      .alter();
  });
};
