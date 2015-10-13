angular
  .controller('simplegalleryCtrl', staticFeedCtrl);

staticFeedCtrl.$inject = ['$scope', '$rootScope', '$http', '$location', 'structureService'];

function staticFeedCtrl($scope, $rootScope, $http, $location, structureService) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'simplegallery');

  $rootScope.$on("koaLaunched",function() {
    console.log("Goo");
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
  });
}
