var request = require("superagent");

angular.module("ATM", [])
  // Keeping everything within this module will persist the account balance between controllers
  .controller("transact", function($scope) {
    $scope.auth = { 
      pin: "",
      verified: false,
      balance: "",
      amount: ""
    };
  })
  .controller("submitPin", function($scope, $log) {
    $scope.verifyPin = function() {
      $log.log("$scope.auth.pin:", $scope.auth.pin);
      request.get("/api/balance?pin=" + $scope.auth.pin).end(function(err, res) {
        if (err) {
          alert("Sorry, that PIN does not exist.");
        } else {
          $scope.$apply(function() {
            $scope.auth.balance = res.body.balance;
            $scope.auth.verified = true;
          })
        }
      })
    }
  })
  .controller("submitDeposit", function($scope) {
    $scope.deposit = function() {
      request.post("/api/transact?pin=" + $scope.auth.pin)
        .send({ amount: Number($scope.auth.balance) + Number($scope.auth.amount) }).end(function(err, res) {
        if (err) {
          alert("Invalid transaction.");
        } else {
          $scope.$apply(function() {
            //Changing the amount in the view in the client instead of doing another db select
            //query to save time.
            $scope.auth.balance = Number($scope.auth.balance) + Number($scope.auth.amount);
            $scope.auth.amount = "";
          })
        }
      })
    }
  })
  //Potential for refactor: Don't Repeat Yourself, extract the process of sending post requests to the
  //the server in a separate function for submitDeposit and submitWithdrawal controllers. The latter
  //could send a negative amount where the former sends a positive amount.
  .controller("submitWithdrawal", function($scope) {
    $scope.withdraw = function() {
      if ($scope.auth.balance - Number($scope.auth.amount) < 0) {
        alert("Insufficient Funds");
        return;
      } 
      request.post("/api/transact?pin=" + $scope.auth.pin)
        .send({ amount: Number($scope.auth.balance) - Number($scope.auth.amount) }).end(function(err, res) {
        if (err) {
          alert("Invalid transaction.");
        } else {
          $scope.$apply(function() {
            //Changing the amount in the view in the client instead of doing another db select
            //query to save time.
            $scope.auth.balance = Number($scope.auth.balance) - Number($scope.auth.amount);
            $scope.auth.amount = "";
          })
        }
      })
    }
  });
