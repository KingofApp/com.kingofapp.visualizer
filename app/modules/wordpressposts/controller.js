angular
  .controller('wordpresspostsCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"wordpressposts");
console.log("Entro en el controller wp");
  //http://kingofapp.es/wp-json/posts?filter[posts_per_page]=3&filter[category_name]=Noticias&filter[order]=DESC
  $http.get($scope.wordpressposts.modulescope.domain+'/wp-json/posts',{  params: {
          'filter[posts_per_page]' : $scope.wordpressposts.modulescope.postnumber,
          'filter[category_name]'  : $scope.wordpressposts.modulescope.category
    }})
    .success(function(data){
    	$scope.wordpressposts.items = data;
      console.log("Success",data);
    	$scope.wordpressposts.isEmpty = function (obj) {
    	    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
    	    return true;
    	};
    }).error(function(){
      console.log("Error");
    	$scope.wordpressposts.items = [{
    		"message": "Opps! There was a problem loading the feed!",
    	}];
    });
}
