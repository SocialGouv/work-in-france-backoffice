exports.up = function(knex) {
  return knex.schema.createTable("monthly_report", table => {
    table
      .uuid("id")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .primary();
    table.integer("year").notNullable();
    table.integer("month").notNullable();
    table.jsonb("group").notNullable();
    table.jsonb("accepted");
    table.jsonb("refused");
    table.jsonb("withoutContinuation");
  });
};

exports.down = function(knex) {};
