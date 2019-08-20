const { onUpdateTrigger } = require('../../knexfile')

exports.up = knex =>
  knex.schema.createTable('journals', tbl => {
    tbl.increments();
    tbl.timestamps(true, true);

    tbl
        .string("title", 128)
        .notNullable()
    tbl
        .text("body")
        .notNullable()
    tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");


    tbl
        .integer("dream_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("dreams")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  })
    .then(() => knex.raw(onUpdateTrigger('journals')))

exports.down = knex => knex.schema.dropTable('journals')