angular.module('factoria', ['firebase'])
  .factory("FirebaseAuth", ["$firebaseAuth", function($firebaseAuth){
    var ref = {};
    return {
      init : init
    };
    function init(firebaseSrc) {
      ref = new Firebase(firebaseSrc);
      return $firebaseAuth(ref);
    }
  }]);
