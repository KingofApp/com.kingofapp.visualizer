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
        launchApp({
          'services': '',
          'config': {
            'lang': ['en_US']
          }
        });
      } else {
        loadJsonStructure();
        hideSplash();
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
        launchApp(data);
      }).fail(function() {
        console.info('Error reading structure.json');
      });
    }

    function launchApp(data) {
      window.addEventListener('WebComponentsReady', function() {
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
      });
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
