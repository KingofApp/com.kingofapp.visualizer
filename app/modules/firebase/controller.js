
angular.controller('firebaseCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', 'fireService'];

function loadFunction($scope, structureService, $location, fireService){
  //Register upper level modules
  structureService.registerModule($location,$scope,"firebase");
  $scope.datas = fireService.getData();

}
// define([
//     'https://cdn.firebase.com/js/client/2.2.4/firebase.js'
// ], function (firebase) {
//     return angular.module('admin', [])
//       .controller('firebaseCtrl',loadFunction);
// });
// function loadFunction(){
//   //Register upper level modules
//   // structureService.registerModule($location,$scope,"firebase");
//   console.log("test");
//
// }
