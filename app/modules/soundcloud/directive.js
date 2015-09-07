angular.directive('soundcloud', function ($http) {
    function link(scope) {
        $http({
            method: 'GET',
            url: 'http://api.soundcloud.com/tracks/'+scope.track+'.json?client_id='+scope.client_id
        }).
        success(function (data) {
            scope.band = data.user.username;
            scope.bandUrl = data.user.permalink_url;
            scope.title = data.title;
            scope.trackUrl = data.permalink_url;
            scope.albumArt = data.artwork_url.replace("large", "t500x500");
            scope.wave = data.waveform_url;
            scope.stream = data.stream_url + '?client_id=' + scope.client_id;
            scope.song = new Audio();
            scope.ready = "<p class='ready'></p>";
        });
        scope.playing = false;
        scope.play = function () {
            scope.playing = !scope.playing;
            if (!scope.playing) {
              scope.song.pause();
            }
          else
            {
              if (scope.song.src == '') {scope.song.src = scope.stream;}
              scope.song.play();
            }
        }
    }
    return {
        restrict: 'E',
        scope: {
            track: '=track',
            client_id: '=clientid',
        },
        templateUrl: "modules/soundcloud/template.html",
        link: link
    };
});
