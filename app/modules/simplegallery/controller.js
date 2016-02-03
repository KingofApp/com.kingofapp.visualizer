angular
  .controller('simplegalleryCtrl', staticFeedCtrl);

staticFeedCtrl.$inject = ['$scope', '$rootScope', '$http', '$location', 'structureService'];

function staticFeedCtrl($scope, $rootScope, $http, $location, structureService) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'simplegallery');
  // Event that fires when everything has been rendered
  $rootScope.$on("koaAppRendered",function() {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
  });
}
