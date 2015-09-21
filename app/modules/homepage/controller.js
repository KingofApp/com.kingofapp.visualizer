angular
  .controller('homepageCtrl', loadFunction);

loadFunction.$inject = ['$http', '$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"homepage");
  $http.get($scope.homepage.modulescope.featured.domain+'/wp-json/posts',{  params: {
          'filter[posts_per_page]' : $scope.homepage.modulescope.featured.postnumber,
          'filter[category_name]'  : $scope.homepage.modulescope.featured.category
    }})
    .success(function(data){
      var elements = [];
      angular.forEach( data, function(item){
        elements.push({ url :  $scope.homepage.modulescope.featured.galleryurl+"?id="+item.ID,
          title    : item.title,
          excerpt  : htmlToPlaintext(item.excerpt),
          content  : item.content,
          date     : item.date,
          featured : imgFromHtml(item.content)
        });
      });
      // $scope.homepage.items = elements;
      $scope.scripts = ["homepage.items="+JSON.stringify(elements)+";"];
    }).error(function(){
      //NOTE: CAMBIAR  POR LO DE FACEBOOK
    	$scope.homepage.featured.items = [{
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
