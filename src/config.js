
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename : "../ATM.db"
  },
  useNullAsDefault: true
});

// "postinstall": "cat ./src/schema.sql | sqlite3 ATM.db"  //<=for package.json default values

// knex.schema.createTable("pins", function(table) {
//   // table.increments("id");
//   table.string("pin");
//   table.string("balance");
// })
// .then(function() {
//   knex.insert({pin: "1111", balance: "80000"}).into("pins");
//   knex.insert({pin: "2222", balance: "80000"}).into("pins");
//   return;
// })
// .catch(function(e) {
//   console.error(e);
// });

console.log("Connected to sqlite3");
module.exports = knex;
