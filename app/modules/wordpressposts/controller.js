angular
  .controller('wordpresspostsCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"wordpressposts");

  //http://kingofapp.es/wp-json/posts?filter[posts_per_page]=3&filter[category_name]=Noticias&filter[order]=DESC
  $http.get($scope.wordpressposts.modulescope.domain+'/wp-json/posts',{  params: {
          'filter[posts_per_page]' : $scope.wordpressposts.modulescope.postnumber,
          'filter[category_name]'  : $scope.wordpressposts.modulescope.category
    }})
    .success(function(data){
      var elements = [];
      angular.forEach( data, function(item){
        elements.push({ url :  $scope.wordpressposts.modulescope.galleryurl+"?id="+item.ID,
          title   : item.title,
          excerpt : htmlToPlaintext(item.excerpt),
          content : item.content,
          date    : item.date,
        });
      });
      $scope.wordpressposts.items = elements;
    }).error(function(){
      //NOTE: CAMBIAR  POR LO DE FACEBOOK
    	$scope.wordpressposts.items = [{
    		"message": "Opps! There was a problem loading the feed!",
    	}];
    });
    function htmlToPlaintext(text) {
      return  text ? String(text).replace(/(<[^>]+>)|(&#\d{4};)/gm, '') : '';
    }
}
