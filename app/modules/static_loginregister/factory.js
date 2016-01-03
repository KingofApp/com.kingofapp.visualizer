angular.module('factoria', ['firebase'])
  .factory("FirebaseAuth", ["$firebaseAuth", function($firebaseAuth){
    var ref = new Firebase("https://koatest.firebaseio.com");
    return $firebaseAuth(ref);
  }]);
