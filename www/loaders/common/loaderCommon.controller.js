(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl);

  commonLoaderCtrl.$inject = ['$scope', '$interval', '$rootScope', '$route', '$location', 'structureService', 'angularLoader', '$timeout', '$translate', 'trafficGuardiaCivil'];

  function commonLoaderCtrl($scope, $interval, $rootScope, $route, $location, structureService, angularLoader, $timeout, $translate, trafficGuardiaCivil) {
    // console.log('[V] Pasa por el commonLoaderCtrl');
    // Unexpected window size
    if (window.innerHeight < 80 && window.innerHeight != 0) {
      console.info('Unexpected window size');
      location.reload();
    }

    var app = document.querySelector('#app');

    $rootScope.showTransition = true;
    //showGeneralLoader();
    $location.$$path = $location.$$path || '/';
    if (structureService.getIndex() !== '' && $location.$$path === '/') {
      $location.path(structureService.getIndex());
    } else {
      configModule();
    }

    var redirected = false;
    var urlsList = {
      'loaders/common/loaderCommon.view.html': false
    };
    $scope.$watch(
      function() {
        return trafficGuardiaCivil.lastRequest.url
      },
      function(recivedData) {
        console.info('[V] Pending HTTP count:', trafficGuardiaCivil.pending.all, '{',
          trafficGuardiaCivil.pending.get, 'GET ,',
          trafficGuardiaCivil.pending.post, 'POST',
          '}');

        if ($location.$$path !== '/') {
          structureService.getCurrentModules($location, function loadmodules(modules) {
            //Crea un objeto con todos los archivos necesarios para cargar
            if (Object.keys(urlsList).length < 2) setUrlsList(modules);

            //when file load check as loaded
            if (urlsList.hasOwnProperty(recivedData)) {
              urlsList[recivedData] = true;
            }
            //check if all required files are loaded
            var count = 0;
            for (var prop in urlsList) {
              if (urlsList[prop] === true) {
                count++
              }
            }
            if (count != Object.keys(urlsList).length) return;
            renderKoaApp();
          });
        }

        function setUrlsList(modules) {
          modules.forEach(function(module) {
            urlsList[module.view] = false;
          });
        }
      }
    );

    $rootScope.$on('renderKoaElements', function() {
      app.createTree(function() {
        app.renderThemeElements(function() {
          //$rootScope.showTransition = false;
          $rootScope.$broadcast('koaElementsRendered');
        });
      });
    });

    $scope.$watch('appData', function(newValue) {
      // console.log('[V] REceived AppData', newValue);
      if (structureService.get() !== newValue && newValue !== undefined && !redirected) {
        structureService.set(newValue);
        redirected = true;

        //Update Lang
        $translate.refresh();
        $translate.use(newValue.config.lang[0]);

        setTimeout(function() {
          setTheme(newValue.config);
          setIconset(newValue.config.iconset);
          if (newValue.config.index === $location.path() || (newValue.modules[$location.path()] && $location.path() != '/404' )) {
            $route.reload();
          } else {
            $location.path(newValue.config.index);
          }
        }, 200);
      }
    });

    $scope.$watch('appColors', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        structureService.setColors(newValue);
      }
    });

    $scope.$watch('appFonts', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        loadFonts(newValue);
        structureService.setFonts(newValue);
      }
    });

    $scope.$watch('appSpinner', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        structureService.setSpinner(newValue);
      }
    });

    $scope.$watch('appIconset', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        setIconset(newValue.config.iconset);
      }
    });

    $scope.$watch('appIndex', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        $location.path(newValue);
      }
    });

    $scope.$watch('appModules', function(newValue, oldValue) {
      if (oldValue !== newValue && newValue) {
        structureService.setModules(newValue.modules);

        if (newValue.index === $location.path() || (newValue.modules[$location.path()] && $location.path() != '/404' )) {
          $route.reload();
        } else {
          $location.path(newValue.index);
        }
      }
    });

    $scope.$watch('appTheme', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        console.info('[V] Theme', newValue);

        setTheme(newValue.config);

        setTimeout(function() {
          $scope.$apply(function() {
            $route.reload();
          });
        }, 200);
      }
    });

    $scope.$on('$routeChangeStart', function(event, next) {
      if (next) {
        structureService.launchSpinner('#transitionloader');
      }
    });

    $scope.$on('koaAppRendered', function() {
      console.info('[V] koa-app rendered!');
      $scope.template = $scope.template || $rootScope.rootTemplate;
      $rootScope.$apply(function() {
        $rootScope.showTransition = false;
      });
    });

    function configModule() {

      // Register Route
      structureService.getModule($location.$$path).then(function(module) {
        $rootScope.toolbar = {
          title: module.name
        };

        // if ($rootScope.missing) {
        //   //$rootScope.showTransition = false;
        // }

        $scope.module = module || $scope.module;

        if (!module.type) {
          // Display a 404 error
          if (structureService.getIndex() === '' && $location.$$path !== '/') {
            $location.path('/404');
          }
        } else {
          $rootScope.current = module.identifier || $rootScope.current;
          $rootScope.previous = $location.$$path || $rootScope.previous;

          storeRoutes();


          angularLoader.module().then(function(url) {
            $scope.template = url;
            //Auxiliar variable used for builder loading
            $rootScope.rootTemplate = url;
          });

        }
      }, function() {
        $location.path('/404');
      });
      $scope.data = JSON.stringify(structureService.get(), null, '    ');
    }

    function storeRoutes() {
      if (!$rootScope.backUrl) {
        $rootScope.backUrl = [];
      }

      if ($rootScope.backUrl[$rootScope.backUrl.length-1]!=$location.$$path) {
        $rootScope.backUrl.push($location.$$path);
      }
    }

    function isFromGoogleFonts(url) {
      return url.search('https://fonts.googleapis.com') === 0;
    }

    function loadFonts(fonts) {
      var families = [];

      if (fonts && isFromGoogleFonts(fonts.primaryFontFamily.url)) {
        families.push(fonts.primaryFontFamily.name);
      }

      if (fonts && isFromGoogleFonts(fonts.titleFontFamily.url)) {
        families.push(fonts.titleFontFamily.name);
      }

      if (families.length !== 0) {
        WebFont.load({
          google: {
            families: families
          }
        });
      }
    }

    function setIconset(iconset) {
      app.setIconset(iconset);
    }

    function setTheme(config) {
      $rootScope.theme = config.theme;

      loadFonts(config.fonts);

      app.setTheme(config.theme, function() {
        structureService.setCssVariables(config);
        //Wait for angular digest cycle to complete.
        $timeout(function() {
          // $scope.$destroy();
          $rootScope.$broadcast('koaAppRendered');
        });
      });
    }

    function renderElements() {
      app.renderThemeElements(function() {
        $timeout(function() {
          $rootScope.$broadcast('koaAppRendered');
        });
      });
    }

    function renderKoaApp() {
      if (app.createTree) {
        app.createTree(function() {
          if (app.theme) {
            renderElements()
          } else if ($rootScope.appData) {
            setTheme($rootScope.appData.config)
          } else {
            setTheme(structureService.getConfig());
          }
        });
      }
    }

    // function showGeneralLoader() {
    //   $rootScope.showTransition = true;
    //   $timeout( function() {
    //     $rootScope.showTransition = ($rootScope.showTransition) ? false : $rootScope.showTransition;
    //   }, 3000);
    // }
  }
}());
