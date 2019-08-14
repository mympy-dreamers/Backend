
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("dreams", tbl => {
      tbl.increments()


      tbl
        .varchar("dream_name", 128)
        .notNullable()


      tbl
        .text("dream_short_description")
        .notNullable()

      tbl
        .text("dream_long_description")

      tbl
        .integer("donations_received")

      tbl
        .integer("donation_goal")
        .notNullable()

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

    })

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("dreams");
};
