const bcrypt = require('bcryptjs');
//this is a comment
exports.seed = function (knex, Promise) {
  const users = [
    { auth_id: 'google-auth0|900000000001', username: 'admin', password: bcrypt.hashSync('123', 10), email: 'raj@example.com' },
    { auth_id: '900000000002', username: 'a', password: bcrypt.hashSync('123', 10), email: 'manju@example.com' },
    { auth_id: '900000000003', username: 'b', password: bcrypt.hashSync('123', 10), email: 'blabla@example.com' },
    { auth_id: '900000000004', username: 'john', password: bcrypt.hashSync('123', 10), email: 'john@example.com' },
    { auth_id: '900000000005', username: 'fredo', password: bcrypt.hashSync('123', 10), email: 'fredo@example.com' },
    { auth_id: '900000000006', username: 'rita', password: bcrypt.hashSync('123', 10), email: 'rita@example.com' },
    { auth_id: '900000000007', username: 'don', password: bcrypt.hashSync('123', 10), email: 'don@example.com' },
    { auth_id: '900000000008', username: 'petter', password: bcrypt.hashSync('123', 10), email: 'petter@example.com' },
    { auth_id: '900000000009', username: 'carlo', password: bcrypt.hashSync('123', 10), email: 'carlo@example.com' },
    { auth_id: '900000000011', username: 'shena', password: bcrypt.hashSync('123', 10), email: 'shena@example.com' },
    { auth_id: '900000000021', username: 'dorna', password: bcrypt.hashSync('123', 10), email: 'dorna@example.com' },
    { auth_id: '900000000031', username: 'perry', password: bcrypt.hashSync('123', 10), email: 'perry@example.com' },
    { auth_id: '900000000041', username: 'reena', password: bcrypt.hashSync('123', 10), email: 'reena@example.com' },
    { auth_id: '900000000051', username: 'james', password: bcrypt.hashSync('123', 10), email: 'james@example.com' },
    { auth_id: '900000000061', username: 'keena', password: bcrypt.hashSync('123', 10), email: 'keena@example.com' },
    { auth_id: '900000000071', username: 'beena', password: bcrypt.hashSync('123', 10), email: 'beena@example.com' },
    { auth_id: '900000000081', username: 'ricky', password: bcrypt.hashSync('123', 10), email: 'ricky@example.com' },
    { auth_id: '900000000091', username: 'sonnu', password: bcrypt.hashSync('123', 10), email: 'sonnu@example.com' },
    { auth_id: '900000000101', username: 'tina', password: bcrypt.hashSync('123', 10), email: 'tina@example.com' },
    { auth_id: '900000000201', username: 'kaira', password: bcrypt.hashSync('123', 10), email: 'kaira@example.com' },
    { auth_id: '900000000301', username: 'tiyra', password: bcrypt.hashSync('123', 10), email: 'tiyra@example.com' },
    { auth_id: '900000000401', username: 'teddy', password: bcrypt.hashSync('123', 10), email: 'teddy@example.com' },
    { auth_id: '900000000501', username: 'anny', password: bcrypt.hashSync('123', 10), email: 'anny@example.com' },
    { auth_id: '900000000601', username: 'bunny', password: bcrypt.hashSync('123', 10), email: 'bunny@example.com' }
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



