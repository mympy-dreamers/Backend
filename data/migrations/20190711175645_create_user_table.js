
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments()

      tbl
        .string("username", 128)
        .notNullable()
        .unique()

      tbl
        .string("password", 128)
        .notNullable()

      tbl
        .string("email", 128)
        .notNullable()
        .unique()
    })

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
