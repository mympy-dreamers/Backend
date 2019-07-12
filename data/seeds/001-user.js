exports.seed = function(knex, Promise) {
  return knex('user').del()
    .then(function() {
      return knex("user").insert([
        { username:'admin', password:'1', email:'raj@example.com' },
        { username: 'a', password:'1',email:'manju@example.com' },
        { username: 'b', password:'1',email:'blabla@example.com'}
      ]);
    });
};

