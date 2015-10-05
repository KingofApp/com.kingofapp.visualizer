angular
  .controller('wordpresspostsCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location', '$sce'];

function loadFunction($http, $scope, structureService, $location, $sce){
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
        var featured = "";
        if(item.featured_image){
          featured=item.featured_image.source;
        }else{
          featured = imgFromHtml(item.content);
        }
        elements.push({ url :  $scope.wordpressposts.modulescope.galleryurl+"?id="+item.ID,
          title    : item.title,
          excerpt  : $sce.trustAsHtml(htmlToPlaintext(item.excerpt)),
          content  : item.content,
          date     : item.date,
          featured : featured
        });
      });
      $scope.scripts = ["wordpressposts.items="+JSON.stringify(elements)+";"];
    }).error(function(){
      //NOTE: CAMBIAR  POR LO DE FACEBOOK
    	$scope.wordpressposts.items = [{
    		"message": "Opps! There was a problem loading the feed!",
    	}];
    });
    function htmlToPlaintext(text) {
      return  text ? String(text).replace(/(<[^>]+>)|(&#\d{4};)/gm, '') : '';
    }
    function imgFromHtml(html) {
      var m,
      urls = [],
      rex = /<img[^>]+src="([^">]+)"/;
      m = rex.exec( html )
      var featured = 'http://placehold.it/400x350';
      if(m){
        featured=m[1];
      }
      return featured;
    }
}
