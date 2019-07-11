
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
  .raw("TRUNCATE TABLE user RESTART IDENTITY CASCADE")
 
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { username: 'admin', password:'1', email:'@example.com'},
        { username: 'a', password:'1',email:'@example.com'},
        {username: 'b', password:'1',email:'@example.com'}
        
      ]);
    });
};

