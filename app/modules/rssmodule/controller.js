angular
.controller('RssmoduleCtrl', RssmoduleCtrl);

RssmoduleCtrl.$inject = ['$scope','$http', '$location', 'structureService'];

function RssmoduleCtrl($scope, $http, $location, structureService) {
  console.log("Dentro de RSSModule");
  structureService.getCurrent( $location, function(moduleInfo){
    //**ESCALA HACIA ATRAS Y RELLENA TODOS LOS MODULOS
    //** rssmodule2 simple peta porque coge /modules/rssmodule2/..
    // $scope["varmodule"] = varmodule.view -> dentro de un for que saque previousModules
    $scope.angmoduleTemplate = moduleInfo.view;
    $scope.menu1Template = "modules/angmodule/index.html";

    $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": moduleInfo.scope.feed } })
      .success(function(data) {
        $scope.rssTitle   = data.responseData.feed.title;
        $scope.rssUrl     = data.responseData.feed.feedUrl;
        $scope.rssSiteUrl = data.responseData.feed.link;
        $scope.entries    = data.responseData.feed.entries;
      })
      .error(function(data) {
        console.log("ERROR: " + data);
      });

  });
}
