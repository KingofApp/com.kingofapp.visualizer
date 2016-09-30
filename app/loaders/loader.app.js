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
        orderLang(data, function(orderedData) {
          launchApp(orderedData);
        });

      }).fail(function() {
        console.info('Error reading structure.json');
      });
    }

    function orderLang(data, callback) {

      if (navigator.globalization) {
        navigator.globalization.getPreferredLanguage(
          function(language) {
            var languageFormated = language.value.replace('_', '-');
            console.info('[V] Language setted to ' + languageFormated + '\n');
            if (data.config.lang[languageFormated]) {
              data.config.lang[0] = languageFormated;
            }
          },
          function() {
            console.info('[V] Error getting language\n');
          }
        );
      }
      callback(data);
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
        $rootScope.partialDir = '';
        //Show ios Toolbar
        StatusBar.overlaysWebView(false);
        StatusBar.styleDefault();
      }
    }

  });
}());
