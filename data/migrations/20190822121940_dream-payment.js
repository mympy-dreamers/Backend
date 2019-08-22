exports.up = knex =>
    knex.schema.createTable('dream-payment', tbl => {
        tbl.increments();
        tbl.timestamps(true, true);

        tbl
            .integer("donation_amount")
            .notNullable()

        tbl
            .integer("dream_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("dreams")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

    })


exports.down = knex => knex.schema.dropTable('dream-payment')