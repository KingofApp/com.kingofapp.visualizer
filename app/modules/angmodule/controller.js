angular
//.module('myApp.angmode', ['ngRoute'])
.controller('AngmoduleCtrl', ['$scope', function($scope) {
  console.log("Dentro de AngModuleCtrl");
  $scope.test = "URLqwdqw";
}])
