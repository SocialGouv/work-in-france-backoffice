exports.up = function(knex) {
  return knex.schema.table("validity_check", table => {
    table.string("date_de_debut_apt").nullable().alter();
  });
};

exports.down = function(knex) {};
