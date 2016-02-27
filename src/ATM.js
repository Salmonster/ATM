angular.module("ATM", [])
  //The following controller has higher level scope in the html so its variables are accessible to the
  //other controllers.
  .controller("transact", function($scope, $http) {
    $scope.auth = { 
      pin: "",
      verified: false,
      balance: "",
      amount: ""
    };
    //Use one function for both deposits and withdrawals.
    $scope.transact = function(amount) {
      if ($scope.auth.balance + amount < 0) {
        alert("Insufficient Funds");
        return;
      }
      $http.post("/api/transact?pin=" + $scope.auth.pin, { transaction: Number($scope.auth.balance) + amount })
        .then(
        function successCallback(res) {
          //Changing the amount in the view in the client instead of doing another db select
          //query to save time.
          $scope.auth.balance = Number($scope.auth.balance) + amount;
          $scope.auth.amount = "";
        },
        function errorCallback(err) {
          alert("Invalid transaction.");
        })
      }
  })
  .controller("submitPin", function($scope, $log, $http) {
    $scope.verifyPin = function() {
      $log.log("$scope.auth.pin:", $scope.auth.pin);
      $http({
        method: "GET",
        url: "/api/balance?pin=" + $scope.auth.pin
      }).then(
      function successCallback(res) {
        $scope.auth.balance = res.data.balance;
        $scope.auth.verified = true;
      },
      function errorCallback(err) {
        alert("Sorry, that PIN does not exist.");
      })
    }
  })
  .controller("submitDeposit", function($scope) {
    $scope.deposit = function() {
      $scope.transact(Number($scope.auth.amount));
    }
  })
  .controller("submitWithdrawal", function($scope) {
    $scope.withdraw = function() {
      $scope.transact(Number("-" + $scope.auth.amount));
    }
  });
