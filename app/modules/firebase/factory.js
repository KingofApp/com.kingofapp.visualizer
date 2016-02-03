angular.module('factoria', ['firebase'])
  .factory('fireService', ['$firebaseArray', function($firebaseArray){
    var firebaseRef= "";
    var setFirebaseSource = function(url){
        firebaseRef= new Firebase(url);
    };
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
        //TODO:
        //Call koaRender to update new elements style
        return $firebaseArray(ref);
    }
    var service = {
        setFirebaseSource : setFirebaseSource,
        addData           : addData,
        getData           : getData,
        getFirebaseRoot   : getFirebaseRoot
    };
    return service;
  }]);
