(function(){
  'use strict';

  angular.module('king.controller', ['ngRoute'])

  .config(['$routeProvider', '$sceProvider', function($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);
    $routeProvider.otherwise({
      templateUrl: 'king/king.html',
      controller: 'KingCtrl'
    });
  }])

  .controller('KingCtrl', KingCtrl);

  KingCtrl.$inject = ['$scope', '$location', 'structureService'];

  function KingCtrl($scope, $location, structureService){

    $location.$$path = $location.$$path || '/';
    
    var structure = structureService.get();

    findRoute($location.$$path, structure, function(module){
      $scope.module = module || $scope.module;
    });

    $scope.data = JSON.stringify(structure, null, "    ");
  }

  function findRoute(path, structure, callback){
    for(var key in structure){
      console.log(key, path, path.indexOf(key));
      if(path === key){
        callback(structure[path]);
      }
      else if(path.indexOf(key) === 0){
        findRoute(path, structure[key].children, callback);
      }
      else{
        callback(null);
      }
    }
  }

}());