(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .directive("menu", function() {
			return {
				restrict: "E",
				template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
				transclude: true,
                  scope: {
                      visible: "=",
                      alignment: "@"
                  }
			};
		})
    .run(function($rootScope) {
              document.addEventListener("click", function(e) {
                  $rootScope.$broadcast("documentClicked", e.target);
              });
		})
    .controller('menuLoaderCtrl', menuLoaderCtrl)

  menuLoaderCtrl.$inject = ['$scope','structureService','$location'];

  function menuLoaderCtrl($scope,structureService, $location) {
    structureService.getCurrent($location, function(module){
      $scope.menuUrl = function() {
          return "modules/"+module.menu+"/index.html";
      }
    });
  }



}());
