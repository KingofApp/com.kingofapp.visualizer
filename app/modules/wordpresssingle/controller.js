angular
  .controller('wordpresspostsCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"wordpressposts");
  var id = "";
  if($location.search().id){
    // $scope.youtubevideo.videoid = $location.search().id;
    id = "/" + $location.search().id;
    console.log($scope.wordpressposts.modulescope.domain+'/wp-json/posts'+id);

  }else{
    console.log($scope.wordpressposts.modulescope.domain+'/wp-json/posts'+id);
  }


  $http.get($scope.wordpressposts.modulescope.domain+'/wp-json/posts'+id,{  params: {
          'filter[posts_per_page]' : $scope.wordpressposts.modulescope.postnumber,
          'filter[category_name]'  : $scope.wordpressposts.modulescope.category
    }})
    .success(function(data){
      var elements = [];
      angular.forEach( data, function(item){
        elements.push({ url :  "/app/#"+$location.path()+"?id="+item.ID,
          title   : item.title,
          excerpt : htmlToPlaintext(item.excerpt),
          content : item.content,
          date    : item.date,
        });
      });
      $scope.wordpressposts.items = elements;
    }).error(function(){
    	$scope.wordpressposts.items = [{
    		"message": "Opps! There was a problem loading the feed!",
    	}];
    });
    function htmlToPlaintext(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
}
