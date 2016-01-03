angular
  .controller('static_loginregisterCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', 'FirebaseAuth'];

function loadFunction($scope, structureService, $location, FirebaseAuth){
  //Register upper level modules
  structureService.registerModule($location,$scope,"static_loginregister");

  $scope.send = function() {
    var loginData = {
       email: $scope.static_loginregister.email,
       password: $scope.static_loginregister.pwd
    };
    FirebaseAuth.$authWithPassword(loginData).then(function(userData) {
      $scope.static_loginregister.status = "User logged in!!";
      $location.path(structureService.get().config.indexOld);
    }).catch(function(error) {
      if(error.code==="INVALID_PASSWORD" || error.code==="INVALID_EMAIL"){
        $scope.static_loginregister.status = error.code;
      }else{
        createuser(loginData);
      }
    });

  }
  function createuser(loginData) {
    FirebaseAuth.$createUser(loginData).then(function(userData) {
       $scope.static_loginregister.status = "User created successfully!!";
       $location.path(structureService.get().config.indexOld);
     }).catch(function(error) {
       $scope.static_loginregister.status = error;
     });
  }
}
