exports.up = knex =>
    knex.schema.createTable('user-payment', tbl => {
        tbl.increments();
        tbl.timestamps(true, true);

        tbl
            .integer("donation_amount")
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
      

exports.down = knex => knex.schema.dropTable('user-payment')