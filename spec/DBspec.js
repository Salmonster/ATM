var expect = require("chai").expect;
var request = require("request");
var testDB = require("../src/DBconfig")("test.db");
var server = require("../server/server");
var fs = require("fs");


var app;

describe("Unit tests for Angular ATM", function() {

  before(function() {
    app = server(testDB);
  });

  after(function() {
    app.close();
    // Delete the test database created by the test script in package.json.
    fs.unlink("test.db", function() { console.log("Test complete.") });
  });

  describe("Check account balance", function() {

    it("accepts a PIN to retrieve associated account balance", function(done) {
      var options = {
        "method": "GET",
        "uri": "http://localhost:4000/api/balance?pin=1111",
      };

      request(options, function(error, res, body) {
        testDB("pins")
          .where("pin", "=", "1111")
          .asCallback(function(err, rows) {
            console.log("rows:", rows[0]);
            console.log("body:", body);
            // The amount queried from the db directly and the amount received from the http request
            // should be the same.
            expect(rows[0].amount).to.equal(JSON.parse(body).balance);
            done();
          });
      });
    });
  });

  describe("Update account balance via deposit or withdrawal", function() {

    it("should update the account balance", function(done) {
      var options = {
        "method": "POST",
        "uri": "http://localhost:4000/api/transact?pin=1111",
        "json": {
            "transaction": "100000"
        }
      };

      request(options, function(error, res, body) {
        testDB("pins")
          .where("pin", "=", "1111")
          .asCallback(function(err, rows) {
            console.log("rows:", rows[0]);
            expect(rows[0].amount).to.equal("100000");
            done();
          });
      });
    });
  });

});
