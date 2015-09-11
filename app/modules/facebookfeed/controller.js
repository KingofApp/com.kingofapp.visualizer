angular
  .controller('facebookFeedCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"facebookfeed");
  $http.get('https://graph.facebook.com/v2.4/'+$scope.facebookfeed.modulescope.pageid+'/posts',{  params: {
          access_token : $scope.facebookfeed.modulescope.accesstoken,
          fields       : 'object_id,message,link,full_picture'
    }})
    .success(function(data){
    	$scope.facebookfeed.items = data.data;
    	$('.feed').fadeIn();
    	$scope.facebookfeed.isEmpty = function (obj) {
    	    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
    	    return true;
    	};
    }).error(function(){
    	$scope.facebookfeed.items = [{
    		"message": "Opps! There was a problem loading the feed!",
    	}];
    	$('.feed').fadeIn();
    });
}
