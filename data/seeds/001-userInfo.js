
exports.seed = function (knex, Promise) {
  const userInfo = [
    { first_name: 'admin', last_name: 'Nguyen', bio: 'raj@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 1 },
    { first_name: 'a', last_name: 'Nguyen', bio: 'manju@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 2 },
    { first_name: 'b', last_name: 'Nguyen', bio: 'blabla@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 3 },
    { first_name: 'john', last_name: 'Nguyen', bio: 'john@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 4 },
    { first_name: 'fredo', last_name: 'Nguyen', bio: 'fredo@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 5 },
    { first_name: 'rita', last_name: 'Nguyen', bio: 'rita@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 6 },
    { first_name: 'don', last_name: 'Nguyen', bio: 'don@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 7 },
    { first_name: 'petter', last_name: 'Nguyen', bio: 'petter@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 8 },
    { first_name: 'carlo', last_name: 'Nguyen', bio: 'carlo@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 9 },
    { first_name: 'shena', last_name: 'Nguyen', bio: 'shena@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 10 },
    { first_name: 'dorna', last_name: 'Nguyen', bio: 'dorna@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 11 },
    { first_name: 'perry', last_name: 'Nguyen', bio: 'perry@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 12 },
    { first_name: 'reena', last_name: 'Nguyen', bio: 'reena@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 13 },
    { first_name: 'james', last_name: 'Nguyen', bio: 'james@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 14 },
    { first_name: 'keena', last_name: 'Nguyen', bio: 'keena@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 15 },
    { first_name: 'beena', last_name: 'Nguyen', bio: 'beena@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 16 },
    { first_name: 'ricky', last_name: 'Nguyen', bio: 'ricky@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 17 },
    { first_name: 'sonnu', last_name: 'Nguyen', bio: 'sonnu@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 18 },
    { first_name: 'tina', last_name: 'Nguyen', bio: 'tina@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 19 },
    { first_name: 'kaira', last_name: 'Nguyen', bio: 'kaira@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 20 },
    { first_name: 'tiyra', last_name: 'Nguyen', bio: 'tiyra@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 21 },
    { first_name: 'teddy', last_name: 'Nguyen', bio: 'teddy@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 22 },
    { first_name: 'anny', last_name: 'Nguyen', bio: 'anny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 23 },
    { first_name: 'bunny', last_name: 'Nguyen', bio: 'bunny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 24 },
    { first_name: 'gunny', last_name: 'Nguyen', bio: 'bunny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 25 },
    { first_name: 'funny', last_name: 'Nguyen', bio: 'bunny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 26 },
    { first_name: 'yummy', last_name: 'Nguyen', bio: 'bunny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 27 },
    { first_name: 'baney', last_name: 'Nguyen', bio: 'bunny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 28 },
    { first_name: 'barney', last_name: 'Nguyen', bio: 'bunny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 29 },
    { first_name: 'Mylynh', last_name: 'Nguyen', bio: 'bunny@example.com', city: 'THE BEST ONE', state: 'DABEST1', user_id: 30 }

  ]

  return (
    knex
      // Deletes ALL existing entries for userInfo table
      .raw("TRUNCATE TABLE userInfo RESTART IDENTITY CASCADE")
      .then(function () {
        return knex("userInfo").insert(userInfo);
      })
  );
};



