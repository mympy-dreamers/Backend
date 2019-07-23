const bcrypt = require('bcryptjs');
exports.seed = function (knex, Promise) {
  return knex("user")
  .del()
    .then(function () {
      return knex("user").insert([
        { username: 'admin', password: bcrypt.hashSync('1', 10), email: 'raj@example.com' },
        { username: 'a', password: bcrypt.hashSync('1', 10), email: 'manju@example.com' },
        { username: 'b', password: bcrypt.hashSync('1', 10), email: 'blabla@example.com' }
      ]);
    });
};

