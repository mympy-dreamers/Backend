const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  const users = [
    { username: 'admin', password: bcrypt.hashSync('123', 10), email: 'raj@example.com' },
    { username: 'a', password: bcrypt.hashSync('123', 10), email: 'manju@example.com' },
    { username: 'b', password: bcrypt.hashSync('123', 10), email: 'blabla@example.com' },
    { username: 'john', password: bcrypt.hashSync('123', 10), email: 'john@example.com' },
    { username: 'fredo', password: bcrypt.hashSync('123', 10), email: 'fredo@example.com' },
    { username: 'rita', password: bcrypt.hashSync('123', 10), email: 'rita@example.com' },
    { username: 'don', password: bcrypt.hashSync('123', 10), email: 'don@example.com' },
    { username: 'petter', password: bcrypt.hashSync('123', 10), email: 'petter@example.com' },
    { username: 'carlo', password: bcrypt.hashSync('123', 10), email: 'carlo@example.com' },
    { username: 'shena', password: bcrypt.hashSync('123', 10), email: 'shena@example.com' },
    { username: 'dorna', password: bcrypt.hashSync('123', 10), email: 'dorna@example.com' },
    { username: 'perry', password: bcrypt.hashSync('123', 10), email: 'perry@example.com' },
    { username: 'reena', password: bcrypt.hashSync('123', 10), email: 'reena@example.com' },
    { username: 'james', password: bcrypt.hashSync('123', 10), email: 'james@example.com' },
    { username: 'keena', password: bcrypt.hashSync('123', 10), email: 'keena@example.com' },
    { username: 'beena', password: bcrypt.hashSync('123', 10), email: 'beena@example.com' },
    { username: 'ricky', password: bcrypt.hashSync('123', 10), email: 'ricky@example.com' },
    { username: 'sonnu', password: bcrypt.hashSync('123', 10), email: 'sonnu@example.com' },
    { username: 'tina', password: bcrypt.hashSync('123', 10), email: 'tina@example.com' },
    { username: 'kaira', password: bcrypt.hashSync('123', 10), email: 'kaira@example.com' },
    { username: 'tiyra', password: bcrypt.hashSync('123', 10), email: 'tiyra@example.com' },
    { username: 'teddy', password: bcrypt.hashSync('123', 10), email: 'teddy@example.com' },
    { username: 'anny', password: bcrypt.hashSync('123', 10), email: 'anny@example.com' },
    { username: 'bunny', password: bcrypt.hashSync('123', 10), email: 'bunny@example.com' }
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



