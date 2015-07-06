'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'king.controller',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.moduleLoader',
  'myApp.core.structureService',
  'king.main'
]);
// ]).
// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/'});
// }]);
