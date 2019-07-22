exports.up = function(knex, Promise) {
    return knex.schema
      .createTable("userInfo", tbl => {
        tbl.increments()
        
          
        tbl
          .varchar("first_name", 128)
          .notNullable()
          
          
        tbl
          .varchar("last_name", 128)
          .notNullable()

         tbl
         .text("bio")
         .notNullable()

         tbl
         .varchar("city", 128)
         .notNullable()

         tbl
         .varchar("state", 128)
         .notNullable()

         tbl
         .varchar("profile_pic")
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
    return knex.schema.dropTableIfExists("userInfo");
  };


