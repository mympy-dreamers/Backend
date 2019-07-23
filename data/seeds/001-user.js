const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  const users = [
    { username: 'admin', password: bcrypt.hashSync('123', 10), email: 'raj@example.com' },
    { username: 'a', password: bcrypt.hashSync('123', 10), email: 'manju@example.com' },
    { username: 'b', password: bcrypt.hashSync('123', 10), email: 'blabla@example.com' }
  ]

  return (
    knex
      // Deletes ALL existing entries for users table
      .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
      .then(function () {
        return knex("users").insert(users);
      })
  );
};

