(function() {
  'use strict';
  angular.element(document).ready(function() {

    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      document.addEventListener('deviceready', onDeviceReady, false);
    } else {
      onDeviceReady();
    }

    function onDeviceReady() {
      if (location.search.indexOf('builder') !== -1) {
        //WebComponentsReady Listener
        window.addEventListener('WebComponentsReady', function() {
          // Default object for builder
          launchApp({
            'services': '',
            'config': {
              'lang': ['en_US']
            }
          });
        });
      } else {
        //Android doesnt support WebComponentsReady
        setTimeout(function() {
          loadJsonStructure();
        }, 500);
      }
    }

    function hideSplash() {
      //Timeout for slow phones.
      setTimeout(function() {
        if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
      }, 1000);
    }

    function loadJsonStructure() {
      $.getJSON('core/structure.json', function(data) {
        setLanguage(data, function(orderedData) {
          launchApp(orderedData);
        });
      }).fail(function() {
        console.info('Error reading structure.json');
      });
    }

    function setLanguage(data, callback) {
      if (navigator.globalization) {
        navigator.globalization.getPreferredLanguage(
          function(language) {
            var languageFormated = language.value.replace('-', '_');
            console.log('[V] Mobile Language: ' + languageFormated + '\n');
            if (data.config.lang.indexOf(languageFormated) !== -1) {
              data.config.lang = [languageFormated];
            } else {
              var formatedWithoutRegion = languageFormated.split('_')[0];
              var langsWithoutRegion = _.map(data.config.lang, removeRegion);
              var pos = langsWithoutRegion.indexOf(formatedWithoutRegion);
              if (pos !== -1) {
                data.config.lang = [data.config.lang[pos]];
              }
            }
            callback(data);
          },
          function() {
            console.log('[V] Error getting language\n');
            callback(data);
          }
        );
      } else {
        callback(data);
      }
      function removeRegion(n) {
        return n.split('_')[0];
      }
    }

    function launchApp(data) {
        angular
          .module('myApp').run(function run($rootScope) {
            if (data.modules) {
              $rootScope.appJsonStructure = data;
            }
            setDevicesVariables($rootScope);
          })
          .config(setTranslatorConfig)
          .config(configServiceProvider);
        setTranslatorConfig.$inject = ['$translateProvider'];
        configServiceProvider.$inject = ['configServiceProvider'];

        angular.bootstrap(document, ['myApp']);
        console.info('[V] Bootstraped ng-app');
        window.parent.postMessage('bootstrapped-app', '*');

        hideSplash();

        function configServiceProvider(configServiceProvider) {
          configServiceProvider.config({
            services: data.services
          });
        }

        function setTranslatorConfig($translateProvider) {
          var source = '..';
          if (window.location.href.indexOf('dev.visualizer.kingofapp.com') !== -1) {
            source = 'http://dev.resources.kingofapp.com';
          } else if (window.location.href.indexOf('visualizer.kingofapp.com') !== -1) {
            source = 'http://resources.kingofapp.com';
          }

          $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: source + '/{part}/locale/{lang}.json'
          });
          $translateProvider.preferredLanguage(data.config.lang[0]);
        }
    }

    function setDevicesVariables($rootScope) {
      if (window.device && window.device.platform == 'Android') {
        $rootScope.partialDir = 'www';
      } else if (window.device && window.device.platform == 'iOS') {
        $rootScope.partialDir = 'www';
        //Show ios Toolbar
        StatusBar.overlaysWebView(false);
        StatusBar.styleDefault();
      }
    }

  });
}());
