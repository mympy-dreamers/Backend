exports.seed = function (knex, Promise) {
  const journals = [
    { title: 'Journal Entry 1', body: 'Journal Body', date: new Date(), user_id: 25, dream_id: 3 },
    { title: 'Journal Entry 2', body: 'Journal Body', date: new Date(), user_id: 1 , dream_id: 3},
    { title: 'Journal Entry 3', body: 'Journal Body', date: new Date(), user_id: 3 , dream_id: 3},
    { title: 'Journal Entry 4', body: 'Journal Body', date: new Date(), user_id: 25, dream_id: 3 },
    { title: 'Journal Entry 5', body: 'Journal Body', date: new Date(), user_id: 20, dream_id: 3 },
    { title: 'Journal Entry 6', body: 'Journal Body', date: new Date(), user_id: 21, dream_id: 3 },
    { title: 'Journal Entry 7', body: 'Journal Body', date: new Date(), user_id: 22, dream_id: 3 },
    { title: 'Journal Entry 8', body: 'Journal Body', date: new Date(), user_id: 23, dream_id: 3 },
    { title: 'Journal Entry 9', body: 'Journal Body', date: new Date(), user_id: 24, dream_id: 3 },
    { title: 'Journal Entry 10', body: 'Journal Body', date: new Date(), user_id: 8 , dream_id: 3},
    { title: 'Journal Entry 11', body: 'Journal Body', date: new Date(), user_id: 7 , dream_id: 3},
    { title: 'Journal Entry 12', body: 'Journal Body', date: new Date(), user_id: 6, dream_id: 3},
    { title: 'Journal Entry 13', body: 'Journal Body', date: new Date(), user_id: 5 , dream_id: 3},
    { title: 'Journal Entry 14', body: 'Journal Body', date: new Date(), user_id: 4 , dream_id: 3},
    { title: 'Journal Entry 15', body: 'Journal Body', date: new Date(), user_id: 24, dream_id: 3 }
  ]

  return (
    knex
      // Deletes ALL existing entries for journals table
      .raw("TRUNCATE TABLE journals RESTART IDENTITY CASCADE")
      .then(function () {
        return knex("journals").insert(journals);
      })
  );
};



