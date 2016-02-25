var expect = require("chai").expect;
var request = require("request");
var db = require("../src/config");


describe("", function() {

  beforeEach(function() {
    // delete user Svnh from db so it can be created later for the test
    db.knex("users")
      .where("username", "=", "Svnh")
      .del()
      .catch(function(error) {
        // uncomment when writing authentication tests
        throw {
          type: "DatabaseError",
          message: "Failed to create test setup data"
        };
      });


  describe("Account Creation:", function(){

    it("Signup creates a user record", function(done) {
      var options = {
        "method": "POST",
        "uri": "http://127.0.0.1:4568/signup",
        "json": {
          "username": "Svnh",
          "password": "Svnh"
        }
      };

      request(options, function(error, res, body) {
        db.knex("users")
          .where("username", "=", "Svnh")
          .then(function(res) {
            if (res[0] && res[0]["username"]) {
              var user = res[0]["username"];
            }
            expect(user).to.equal("Svnh");
            done();
          }).catch(function(err) {
            throw {
              type: "DatabaseError",
              message: "Failed to create test setup data"
            };
          });
        });
      });
    })

  });
});
