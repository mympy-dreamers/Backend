exports.seed = function (knex, Promise) {
  const dreams = [
    {
      dream_name: "Make Camping Great Again",
      dream_short_description: "A camping like never before",
      dream_long_description: "Get make the biggest camping ever",
      donations_received: 400,
      donation_goal: 1000,
      user_id: 3
    },
    {
      dream_name: "Save the ocean",
      dream_short_description: "Ocean is dying we need to save it",
      dream_long_description: "Let save all those rare fish and animals for future generation",
      donations_received: 230,
      donation_goal: 500,
      user_id: 2
    },
    {
      dream_name: "abc",
      dream_short_description: "test",
      dream_long_description: "testing",
      donations_received: 0,
      donation_goal: 100,
      user_id: 4
    },

    {
      dream_name: "Save the Elephants",
      dream_short_description: "Few of them are remaining",
      dream_long_description: "Let save all those for future generation",
      donations_received: 40,
      donation_goal: 500,
      user_id: 7
    },

    {
      dream_name: "Better education for Orphans",
      dream_short_description: "Better life in future",
      dream_long_description: "Not to be involve in crime, drug dealing, killing people",
      donations_received: 70,
      donation_goal: 800,
      user_id: 2
    },

    {
      dream_name: "Save the trees",
      dream_short_description: "Few of them are remaining",
      dream_long_description: "Let save all those for fresh air",
      donations_received: 20,
      donation_goal: 100,
      user_id: 7

    },

    {
      dream_name: "No drugs",
      dream_short_description: "save the children",
      dream_long_description: "Beware of drugs",
      donations_received: 30,
      donation_goal: 150,
      user_id: 8
    },

    {
      dream_name: "Provide food for Homeless Peole",
      dream_short_description: "Lot of Homeless peole dont have food to eat",
      dream_long_description: "We can collect the money and provide them good food",
      donations_received: 20,
      donation_goal: 100,
      user_id: 1
    },

    {
      dream_name: "bdr",
      dream_short_description: "Fund for good things",
      dream_long_description: "This fund is used for homeless and orphanages",
      donations_received: 20,
      donation_goal: 300,
      user_id: 6
    },

    {
      dream_name: "fund for Cancer",
      dream_short_description: "Helping for sick people",
      dream_long_description: " Helping people who are poor and have cancer",
      donations_received: 20,
      donation_goal: 100,
      user_id: 9
    },
  ]

  return (
    knex
      // Deletes ALL existing entries for users table
      .raw("TRUNCATE TABLE dreams RESTART IDENTITY CASCADE")
      .then(function () {
        return knex("dreams").insert(dreams);
      })
  );
};
