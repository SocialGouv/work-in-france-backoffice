exports.up = async function(knex) {
  return knex.schema.createTable("validity_check", table => {
    table
      .uuid("id")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .primary();
    table.integer("dossier_id").notNullable();
    table
      .string("ds_key")
      .unique()
      .notNullable();
    table.string("siret").notNullable();
    table.string("nom").notNullable();
    table.string("prenom").notNullable();
    table.string("date_de_naissance").notNullable();
    table.boolean("has_expired").notNullable();
    table.string("date_de_debut_apt").notNullable();
    table.string("date_de_fin_apt").notNullable();
    table.jsonb("metadata").notNullable();
  });
};

exports.down = function(knex) {};
