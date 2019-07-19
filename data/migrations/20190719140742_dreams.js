
exports.up = function(knex, Promise) {
    return knex.schema
      .createTable("dreams", tbl => {
        tbl.increments()
        
          
        tbl
          .varchar("dream_name")
          .notNullable()
         
          
        tbl
          .text("dream_short_description" )
          .notNullable()

          tbl
          .text("dream_long_description")
          .notNullable()

          tbl
          .integer("donations_received", 128)
          .notNullable()
         
          tbl
          .varchar("dreampic")
          .notNullable()
          
          tbl
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("user")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
       
      })
      
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("dreams");
  };
