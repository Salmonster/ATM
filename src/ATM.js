
angular.module("ATM", [])
  // Keeping everything within this module will persist the account balance between controllers
  .controller("transact", function($scope) {
    $scope.auth = { 
      pin: "",
      verified: false,
      balance: 80000,
      amount: ""
    };
  })
  .controller("submitPin", function($scope, $log) {
    //For simplicity's sake, I'm hardcoding a PIN of 1111
    $scope.verifyPin = function() {
      $log.log("$scope.auth.pin:", $scope.auth.pin);
      if ($scope.auth.pin === "1111") {
        $scope.auth.verified = true;
      } else {
        alert("Incorrect PIN");
      }
    }
  })
  .controller("submitDeposit", function($scope) {
    $scope.deposit = function() {
      $scope.auth.balance += Number($scope.auth.amount);
      $scope.auth.amount = "";
    }
  })
  .controller("submitWithdrawal", function($scope) {
    $scope.withdraw = function() {
      if ($scope.auth.balance - Number($scope.auth.amount) < 0) {
        alert("Insufficient Funds");
      } else {
        $scope.auth.balance -= Number($scope.auth.amount);
      }
      $scope.auth.amount = "";
    }
  });
