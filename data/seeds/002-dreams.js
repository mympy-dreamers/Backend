exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("dreams")
      .del()
      .then(function() {
      // Inserts seed entries
      return knex("dreams").insert([
        {
          dream_name: "Make Camping Great Again",
          dream_short_description: "A camping like never before",
          dream_long_description: "Get make the biggest camping ever",
          donations_received: 400,
          dreampic: "www.camping.com/camp.jpg",
          user_id: 3
        },        
        {
          dream_name: "Save the ocean",
          dream_short_description: "Ocean is dying we need to save it",
          dream_long_description: "Let save all those rare fish and animals for future generatio",
          donations_received: 230,
          dreampic: "www.sea.com/fish.jpg",
          user_id: 2
        },        
        {
          dream_name: "abc",
          dream_short_description: "test",
          dream_long_description: "testing",
          donations_received: 20,
          dreampic: "url",
          user_id: 1
        }
      ]);
    });
};
