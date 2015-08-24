angular.module('factoria', ['firebase'])
  .factory('fireService', ['$firebaseArray', function($firebaseArray){
    var firebaseRef= new Firebase("https://blinding-heat-1559.firebaseio.com/datatest");
    var getFirebaseRoot = function(){
        return firebaseRef;
    };
    var addData = function(data){
        // persist our data to firebase
        var ref = getFirebaseRoot();
        return  $firebase(ref).$push(data);
    };
    var getData = function(callback){
        var ref = getFirebaseRoot();
        return $firebaseArray(ref);
    }
    var service = {
        addData : addData,
        getData: getData,
        getFirebaseRoot: getFirebaseRoot
    };
    return service;
  }]);
