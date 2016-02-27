var expect = require("chai").expect;
var request = require("request");
var testDB = require("./testconfig");
var server = require("../server/server");
var fs = require("fs");

//For back-end testing I needed to require other modules (such as the server), so this had to be
//done separately from the karma testing suite.

var app;

describe("Unit tests for Angular ATM", function() {

  before(function() {
    app = server(testDB);
  })

  after(function() {
    app.close();
    //Delete the test database created by the test script in package.json.
    fs.unlink("test.db", function() { console.log("Test complete.") });
  })

  describe("Check account balance", function(){

    it("accepts a PIN to retrieve associated balance amount", function(done) {
      var options = {
        "method": "GET",
        "uri": "http://localhost:4000/api/balance?pin=1111",
      };

      request(options, function(error, res, body) {
        testDB("pins")
          .where("pin", "=", "1111")
          .asCallback(function(err, rows) {
            console.log("rows:", rows);
            console.log("body:", body);
            //The amount queried from the db directly and the amount received from the http request
            //should be the same.
            expect(rows[0].amount).to.equal(JSON.parse(body).balance);
            done();
          })
      });
    });
  })
});
