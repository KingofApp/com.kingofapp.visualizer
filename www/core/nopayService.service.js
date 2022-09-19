(function () {
    'use strict';
    // NOTE: A service to intercept data from the original structure used by structureService.
    angular
        .module('king.core.nopayService', [])
        .run(nopayService);

    nopayService.$inject = ['$http'];

    function nopayService($http) {

        $.getJSON('core/structure.json', function (data) {
            if(!data.bought)return;
            if(data._id){
                if (hasOneDayPassed()) checkExpiration(data._id);
                if ( localStorage.getItem("appExpire") === "true" ){
                    setNopayScreen();
                }
            }

        }).fail(function () {
            console.info('Error reading structure.json');
        });

        function checkExpiration(appId) {
            $http({
                method: 'GET',
                url: 'https://api.kingofapp.com/apps/' + appId + '/expire'
            }).then(function successCallback(response) {
                
                localStorage.setItem("appExpire", response.data.appExpired);
                 if(response.data.appExpired){
                    setNopayScreen();
                 }
            }, function errorCallback(response) {
                console.error('ERROR', response.error);
            });
        }

        function setNopayScreen() {
            $http({
                method: 'GET',
                url: 'https://s3.eu-central-1.amazonaws.com/kingofapp.com/nopayscreen.html'
            }).then(function successCallback(response) {

                document.getElementById("main-king").innerHTML = response.data;
                //    var noPayElement = document.createElement('iframe');
                //    noPayElement.srcdoc = response.data;
                //    noPayElement.style='position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;';
                //document.getElementById('main-king').appendChild(noPayElement);
            }, function errorCallback(response) {
                console.error('ERROR', response.error);
            });
        }

        // checks if one day has passed. 
        function hasOneDayPassed() {
            // get today's date. eg: "7/37/2007"
            var date = new Date().toLocaleDateString();

            // if there's a date in localstorage and it's equal to the above: 
            // inferring a day has yet to pass since both dates are equal.
            if (localStorage.koaTrackDate == date)
                return false;

            // this portion of logic occurs when a day has passed
            localStorage.koaTrackDate = date;
            return true;
        }
    }
}());
