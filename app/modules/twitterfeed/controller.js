angular
  .controller('twitterFeedCtrl', loadFunction)
  .directive('twitterTimeline', [function() {
    return {
      restrict: 'A',
      scope: {
        cssUrl: "@",
        autoResize: "="
      },
      link: function (scope, element, attrs) {
        $('body').removeAttr('data-twttr-rendered');

        element
          .attr('id', 'twitter-feed')
          .attr("width", "100%" || attrs.width)
          .attr('data-chrome', 'noheader transparent')
          .attr('data-widget-id', attrs.twitterTimeline)
          .addClass('twitter-timeline');

        function render() {
          var body = $('.twitter-timeline').contents().find('body');

          if (scope.cssUrl) {
            body.append($('<link/>', { rel: 'stylesheet', href: scope.cssUrl, type: 'text/css' }));
          }

          function setHeight() {
            if (body.find('.stream').length == 0) {
              setTimeout(setHeight, 100);
            } else {
              body.find('.stream').addClass('stream-new').removeClass('stream').css('height', 'auto');
              $('.twitter-timeline').css('height', (body.height() + 20) + 'px');
            }
          }

          if (scope.autoResize) {
            setHeight();
          }

        }

        if (!$('#twitter-wjs').length) {
          $.getScript((/^http:/.test(document.location)?'http':'https') + '://platform.twitter.com/widgets.js', function() {
            render();
            $('.twitter-timeline').load(render);
          });
        }
      }
    };
  }]);
//   .factory('TwitterService', function($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q) {
//     // 1
//     var twitterKey = "STORAGE.TWITTER.KEY";
//     var clientId = 'S1mdCh3Q2UAKhzuj7D0fAQ';
//     var clientSecret = 'rqQc2e9QiroGT27w6XE1fcaQyzybr452XbwVCUzg';
//
//     // 2
//     function storeUserToken(data) {
//       console.log("data",data);
//         window.localStorage.setItem(twitterKey, JSON.stringify(data));
//     }
//
//     function getStoredToken() {
//         return window.localStorage.getItem(twitterKey);
//     }
//
//     // 3
//     function createTwitterSignature(method, url) {
//         var token = getStoredToken();
//         var oauthObject = {
//             oauth_consumer_key: clientId,
//             oauth_nonce: $cordovaOauthUtility.createNonce(10),
//             oauth_signature_method: "HMAC-SHA1",
//             oauth_token: token.oauth_token,
//             oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
//             oauth_version: "1.0"
//         };
//         var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
//         $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
//     }
//
//     return {
//         // 4
//         initialize: function() {
//             var deferred = $q.defer();
//             var token = getStoredToken();
//
//             if (token !== null) {
//                 deferred.resolve(true);
//             } else {
//                 $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
//                     storeUserToken(result);
//                     deferred.resolve(true);
//                 }, function(error) {
//                     console.log("Error", error);
//                     deferred.reject(false);
//                 });
//             }
//             return deferred.promise;
//         },
//         // 5
//         isAuthenticated: function() {
//             return getStoredToken() !== null;
//         },
//         // 6
//         getHomeTimeline: function() {
//             var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
//             createTwitterSignature('GET', home_tl_url);
//             return $resource(home_tl_url).query();
//         },
//         storeUserToken: storeUserToken,
//         getStoredToken: getStoredToken,
//         createTwitterSignature: createTwitterSignature
//     };
// });

loadFunction.$inject = ['$http','$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"twitterfeed");

}
