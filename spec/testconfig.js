
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    //Searches for the db file from the assetFolder specified in the server.
    filename : "test.db"
  },
  useNullAsDefault: true
});

console.log("Connected to sqlite3");
module.exports = knex;
