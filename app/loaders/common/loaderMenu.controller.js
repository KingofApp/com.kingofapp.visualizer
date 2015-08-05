(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .run(function($rootScope) {
              document.addEventListener("click", function(e) {
                  $rootScope.$broadcast("documentClicked", e.target);
              });
		})
}());
