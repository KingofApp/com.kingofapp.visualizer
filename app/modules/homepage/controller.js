angular
  .controller('homepageCtrl', loadFunction);

loadFunction.$inject = ['$http', '$scope', '$rootScope', 'structureService', '$location', '$filter'];

function loadFunction($http, $scope, $rootScope, structureService, $location, $filter) {
  //Register upper level modules
  structureService.registerModule($location, $scope, "homepage");
  $http.get($scope.homepage.modulescope.featured.domain + '/wp-json/posts', {
      params: {
        'filter[posts_per_page]': $scope.homepage.modulescope.featured.postnumber,
        'filter[category_name]': $scope.homepage.modulescope.featured.category
      }
    })
    .success(function(data) {
      var elements = [];
      // var chetos = ['http://www.martinibistro.com/wp-content/uploads/2014/03/steak.jpg',
      //   'http://www.martinibistro.com/wp-content/uploads/2014/03/sushi.jpg',
      //   'http://www.martinibistro.com/wp-content/uploads/2014/03/3.jpg']
      angular.forEach(data, function(item, index) {
        var featured = "";
        if (item.featured_image) {
          featured = item.featured_image.source;
        } else {
          featured = imgFromHtml(item.content);
        }
        elements.push({
          url: $scope.homepage.modulescope.featured.galleryurl + "?id=" + item.ID,
          title: item.title,
          excerpt: htmlToPlaintext(item.excerpt),
          content: item.content,
          date: item.date,
          lang: {
            readmore: $filter('translate')('homepage.readmore')
          },
          featured: featured
            // featured : chetos[index]
        });
      });
      $scope.homepage.items = elements;
    }).error(function() {
      //NOTE: CAMBIAR  POR LO DE FACEBOOK
      $scope.homepage.featured.items = [{
        "message": "Opps! There was a problem loading the feed!",
      }];
    });

  function htmlToPlaintext(text) {
    return text ? String(text).replace(/(<[^>]+>)|(&#\d{4};)/gm, '') : '';
  }

  function imgFromHtml(html) {
    var m,
      urls = [],
      rex = /<img[^>]+src="([^">]+)"/;
    m = rex.exec(html)
    var featured = 'http://placehold.it/400x350';
    if (m) {
      featured = m[1];
    }
    return featured;
  }

$rootScope.$on("koaLaunched",function() {
  console.log("Goo");
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true
  });
});
}
