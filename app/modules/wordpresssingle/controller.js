angular
  .controller('wordpresssingleCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"wordpresssingle");
  var id = "";
  var type = $scope.wordpresssingle.modulescope.type;
  if($location.search().id){
    id = $location.search().id;
    type = "posts";
  }else if($scope.wordpresssingle.modulescope.id){
    id = $scope.wordpresssingle.modulescope.id;
  }else{
    $scope.wordpresssingle.message = "Error, video not found";
  }


  $http.get($scope.wordpresssingle.modulescope.domain+'/wp-json/'+type+'/'+id)
    .success(function(data){
      $scope.wordpresssingle.item = data;
    }).error(function(){
    	$scope.wordpresssingle.message = "Opps! There was a problem loading the feed!";
    });
    function htmlToPlaintext(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
}
