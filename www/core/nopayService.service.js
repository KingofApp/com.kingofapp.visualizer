(function() {
    'use strict';
    // NOTE: A service to intercept data from the original structure used by structureService.
    angular
        .module('king.core.nopayService', [])
        .run(nopayService);

    nopayService.$inject = ['$http'];

    function nopayService($http) {

        $.getJSON('core/structure.json', function(data) {
            if (!data.bought) return;
            if (!data._id) return;
            
            if ( hasOneDayPassed()) checkExpiration(data);   

            if ( localStorage.getItem('appExpire') === 'true' ) {
                setNopayScreen();
            } else {
                return;
            }

            if (!data.compilationObj) return;

            if ( data.compilationObj.name && data.compilationObj.name === 'downloadApk' && localStorage.getItem('testApp') === 'true' ) {
                setNopayScreen();
            }

            if ( !data.compilationObj.expire) return;
            var expireDate = new Date(data.compilationObj.expire);
            var now = new Date();
            if ( expireDate < now && localStorage.getItem('testApp') != 'true') {
                setNopayScreen();
            }
            

        }).fail(function() {
            console.info('Error reading structure.json');
        });

        function checkExpiration(appData) {
            var appId = appData._id
            var compilationObj = appData.compilationObj;
            $http({
                method: 'GET',
                url: 'https://api.kingofapp.com/apps/' + appId + '/expire'
            }).then(function successCallback(response) {
                
                localStorage.setItem('appExpire', response.data.appExpired);
                localStorage.setItem('testApp', response.data.testApp);
                if (response.data.appExpired) {
                    setNopayScreen(); 
                } else {
                    return;
                }

                if ( compilationObj.name && compilationObj.name === 'downloadApk' && response.data.testApp) {
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

                document.getElementById('main-king').innerHTML = response.data;
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
