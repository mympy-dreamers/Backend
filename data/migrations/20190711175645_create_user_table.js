
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments()

      tbl.varchar("auth_id").unique();

      tbl
        .string("username", 128)
        .notNullable()
        .unique()

      tbl
        .string("password");

      tbl
        .string("email", 128)
        .notNullable()
        .unique()

      tbl
        .timestamp("created_at", { useTz: false })
        .notNullable()
        .defaultTo(knex.fn.now());

    })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
