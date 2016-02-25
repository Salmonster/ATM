var expect = require("chai").expect;
var request = require("request");
var testDB = require("./testconfig");
var server = require("../server/server");

var app;

describe("", function() {

  before(function() {
    app = server(testDB);
  })

  after(function() {
    app.close();
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
            expect(rows[0].amount).to.equal(JSON.parse(body).balance);
            done();
          })
      });
    });


  })
});
