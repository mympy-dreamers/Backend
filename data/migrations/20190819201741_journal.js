
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable("journals", tbl => {
            tbl.increments()

            tbl
                .string("title", 128)
                .notNullable()

                tbl
                .text("body")
                .notNullable()

                tbl
                .date("date")
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
    //this is a comment
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("journals");
};
