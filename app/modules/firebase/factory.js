angular.module('factoria', ['firebase'])
  .factory('fireService', ['$firebaseArray', function($firebaseArray){
      var firebaseRef= new Firebase("https://blinding-heat-1559.firebaseio.com/datatest");
      var getFirebaseRoot = function(){
          return firebaseRef;
      };
      var getSingleNode = function(){
          return getFirebaseRoot().child("0");
      }
      var addData = function(data){
          // persist our data to firebase
          var ref = getSingleNode();
          return  $firebase(ref).$push(data);
      };
      var getData = function(callback){
          var ref = getSingleNode();
          return $firebaseArray(ref);
      }
      var service = {
          addData : addData,
          getData: getData,
          getFirebaseRoot: getFirebaseRoot
      };
      return service;
  }]);
 // angular.module('demand', ['firebase'])
 //     .controller('testCtrl', ['$scope', function ($scope) {
 //         console.log("dentro");
 //     }])
 //      .factory('fireService', ['$firebaseObject', function($firebaseObject){
 //          var firebaseRef= new Firebase("https://blinding-heat-1559.firebaseio.com/datatest");
 //          var getFirebaseRoot = function(){
 //              return firebaseRef;
 //          };
 //          var getSingleNode = function(){
 //              return getFirebaseRoot().child("0");
 //          }
 //          var addData = function(data){
 //              // persist our data to firebase
 //              var ref = getSingleNode();
 //              return  $firebase(ref).$push(data);
 //          };
 //          var getData = function(callback){
 //              var ref = getSingleNode();
 //              return $firebase(ref).$asArray();
 //          }
 //          var service = {
 //              addData : addData,
 //              getData: getData,
 //              getFirebaseRoot: getFirebaseRoot
 //          };
 //          return service;
 //      }]).controller('firebaseCtrl2', loadFunction);
 //
 //      loadFunction.$inject = ['$scope', 'structureService', '$location'];
 //
 //      function loadFunction($scope, structureService, $location){
 //        //Register upper level modules
 //        structureService.registerModule($location,$scope,"firebase");
 //      };
