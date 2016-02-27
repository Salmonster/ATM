describe("transact", function(){

  beforeEach(module("ATM"));

  //The following lines may be necessary, according to Angular docs 
  //(https://docs.angularjs.org/guide/unit-testing)

  // var $controller;

  // beforeEach(inject(function(_$controller_){
  //   // The injector unwraps the underscores (_) from around the parameter names when matching
  //   $controller = _$controller_;
  // }));


  describe("$scope.transact result", function(){
    it("should change the account balance", inject(function($controller, $httpBackend){
      var scope = {};
      scope.auth = { balance: 80000, pin: 1111 };

      $httpBackend
        .when("POST", "/api/transact?pin=", "85000")
        .respond([
          "200"
        ]);
      var controller = $controller("transact", {
        $scope: scope
      });
      // scope.transact("85000");
      $httpBackend.flush();

      scope.auth.balance.should.equal("85000");
    }));
  });


  //Failed attempts at testing excessive withdrawal amount using sinon...

  // before(function() {
  //   sinon.spy(window, "alert");
  // });

  // describe("$scope.transact", function(){
  //   it("should say you don't have enough money", inject(function($controller) {
  //     var scope = {};
  //     var controller = $controller("transact", {
  //       $scope: scope
  //     });
  //     scope.auth.balance = 80000;
  //     scope.transact(-80001);
  //     assert(window.alert.calledOnce);

  //   }));
  // });

  // after(function() {
  //   window.alert.restore();
  // });


  //or without before and after functions...


  // describe("$scope.transact", function(){
  //   it("should say you don't have enough money", function($controller) {
  //     var scope = {};
  //     var controller = $controller("transact", {
  //       $scope: scope
  //     });
  //     var spy = sinon.spy(window, "alert");
  //     scope.auth.balance = 80000;
  //     scope.transact(-80001);
  //     expect(spy).to.have.been.called;
  //     spy.restore();
  //   });
  // });


});
