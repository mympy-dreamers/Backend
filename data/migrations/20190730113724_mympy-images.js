
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable("mympyImages", tbl => {
            tbl.increments()

            tbl
                .string("img_url", 128)
                .unique()

            tbl
                .integer("dream_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("dreams")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("mympyImages");
};
