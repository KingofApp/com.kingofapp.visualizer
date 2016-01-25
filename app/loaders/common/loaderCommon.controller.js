(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl);

  commonLoaderCtrl.$inject = ['$scope', '$window', '$rootScope', '$route', '$location', 'structureService', 'angularLoader', 'trafficGuardiaCivil'];

  function commonLoaderCtrl($scope, $window, $rootScope, $route, $location, structureService, angularLoader, trafficGuardiaCivil) {
    // console.log('[V] Pasa por el commonLoaderCtrl');

    var koaApp = document.querySelector('#koaApp');

    $rootScope.showTransition = true;

    if (structureService.getIndex() !== '' && ($location.$$path === '/' || $location.$$path === '')) {
      $location.path(structureService.getIndex());
    }

    $scope.trafficGuardiaCivil = trafficGuardiaCivil;

    var prev = 0;
    var throughcached = false;
    var prevent = false;
    var redirected = false;
    var finished = false;

    $scope.$watch(
      function calculateModelValue() {
        return (trafficGuardiaCivil.pending.all);
      },

      function handleModelChange(count) {
        console.log('[V] Pending HTTP count:', count,
          '{',
          trafficGuardiaCivil.pending.get, 'GET ,',
          trafficGuardiaCivil.pending.post, 'POST',
          '}');

        if ($location.$$path !== '/') {
          var visitedLocations = structureService.getVisitedLocations();
          var cachedLocations = structureService.getCachedLocations();

          structureService.getCurrentModules($location, function loadmodules(modules) {
            if (visitedLocations[cachedLocations[$location.$$path].identifier] && !finished) {
              loadCachedModule();
            } else if (count === 0 && prev > 0 && !finished) {
              loadFirstTimeModule(modules);
            }

            if (count === 0 && prev > 0 && throughcached) {
              renderKoaApp();
            }

            prev = count;
          });
        }

        function loadFirstTimeModule(modules) {
          finished = true;
          console.log('[V] First time module load', $location.$$path);

          renderKoaApp();

          angular.forEach(modules, function(value, key) {
            visitedLocations[value.identifier] = true;
          });

          structureService.setVisitedLocations(visitedLocations);
        }

        function loadCachedModule() {
          finished = true;
          console.log('[V] Loading cached module', $location.$$path);

          renderKoaApp();

          throughcached = true;
        }
      }
    );

    $location.$$path = $location.$$path || '/';

    $scope.$watch('appData', function(newValue, oldValue) {
      // console.log('[V] REceived AppData', newValue);
      if (structureService.get() !== newValue && newValue !== undefined && !redirected) {
        structureService.set(newValue);
        redirected = true;

        setTimeout(function() {
          // $scope.$apply(function() {
          setTheme(newValue.config);
          if (newValue.config.index === $location.path()) {
            $route.reload();
          } else {
            $location.path(newValue.config.index);
          }
          // });
        }, 200);
      }
    });

    $scope.$watch('appColors', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        prevent = true;
        structureService.setColors(newValue);
      }
    });

    $scope.$watch('appFonts', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        prevent = true;
        loadFonts(newValue);
        structureService.setFonts(newValue);
      }
    });

    $scope.$watch('appModules', function(newValue, oldValue) {
      if (oldValue !== newValue && newValue) {
        structureService.setModules(newValue.modules);

        if (newValue.index === $location.path()) {
          $route.reload();
        } else {
          $location.path(newValue.index);
        }
      }
    });

    $scope.$watch('appTheme', function(newValue, oldValue) {
      if (oldValue !== newValue) {
        console.log('[V] Theme', newValue);

        setTheme(newValue.config);

        setTimeout(function() {
          $scope.$apply(function() {
            $route.reload();
          });
        }, 200);
      }
    });

    $scope.$on('$routeChangeStart', function(event, next, current) {
      if (next) {
        $rootScope.showTransition = true;
      }
    });

    $scope.$on('koaAppRendered', function(event, args) {
      console.info('[V] koa-app rendered!');
      $rootScope.$apply(function() {
        $rootScope.showTransition = false;
      });

    });

    // TODO: INSPECT loadconfig
    // Load config
    structureService.loadconfig($rootScope);

    // Register Route
    structureService.getModule($location.$$path).then(function(module) {
      $rootScope.toolbar = {
        title: module.name
      };

      if ($rootScope.missing) {
        $rootScope.showTransition = false;
      }

      $rootScope.current = module.identifier;
      $scope.module = module || $scope.module;

      if (!module.type) {
        // Display a 404 error
        if (structureService.getIndex() === '' && $location.$$path !== '/') {
          $location.path('/404');
        }
      } else if (isAngularModule(module.type)) {
        angularLoader.module($scope);
      } else if (isJqueryModule(module.type)) {
        // TODO: Load jquery module from angular
      } else {
        // TODO: Display error and blame developer
      }
    });

    $scope.data = JSON.stringify(structureService.get(), null, '    ');

    function isAngularModule(type) {
      return type === 'A';
    }

    function isJqueryModule(type) {
      return type === '$';
    }

    function isFromGoogleFonts(url) {
      return url.search('https://fonts.googleapis.com') === 0;
    }

    function loadFonts(fonts) {
      var families = [];

      if (isFromGoogleFonts(fonts.primaryFontFamily.url)) {
        families.push(fonts.primaryFontFamily.name);
      }

      if (isFromGoogleFonts(fonts.titleFontFamily.url)) {
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

    function setTheme(config) {
      loadFonts(config.fonts);

      koaApp.setTheme(config.theme, function() {
        structureService.setCssVariables(config);

        addDirectives();

        $rootScope.$broadcast('koaAppRendered');
      });
    }

    function renderElements() {
      koaApp.renderThemeElements(function() {
        addDirectives();

        $rootScope.$broadcast('koaAppRendered');
      });
    }

    function addDirectives() {
      var scopeElement = document.querySelector('.' + $rootScope.current);
      var scope = angular.element(scopeElement).scope(); // Get current scope

      $('[ng-click]').click(ngClickWrapper); // Adding ng-click...
      $('[ng-model]').each(ngModelWrapper); // Adding ng-model...

      function ngClickWrapper() {
        var functionName = $(this).attr('ng-click').replace(/(\(.*?\))/, '');
        scope[functionName]();
      }

      function ngModelWrapper() {
        var parent = $(this);

        $(this.inputElement).bind('input', function() {
          var model = parent.attr('ng-model').split('.');
          scope[model[0]][model[1]] = $(this).val();
        });
      }
    }

    function renderKoaApp() {
      setTimeout(function() {
        koaApp.createTree();

        (koaApp.theme)       ? renderElements() :
        ($rootScope.appData) ? setTheme($rootScope.appData.config)
                             : setTheme(structureService.getConfig());
      }, 100);
    }

    // Debug clicks
    $scope.theme = function(themeId) {
      if (themeId) {
        var paperThemeConfig = {
          'colors': {
            'primaryTextColor': '#212121',
            'primaryBackgroundColor': '#ffffff',
            'secondaryTextColor': '#737373',
            'disabledTextColor': '#9b9b9b',
            'dividerColor': '#dbdbdb',
            'primaryColor': '#3f51b5',
            'lightPrimaryColor': '#c5cae9',
            'darkPrimaryColor': '#303f9f',
            'accentColor': '#ff4081',
            'lightAccentColor': '#ff80ab',
            'darkAccentColor': '#f50057',
            'backgroundColor': '#ffffff'
          },
          'images': {
            'background': ''
          },
          'fonts': {
            'primaryFontFamily': {
              'name': 'Roboto',
              'url': 'https://fonts.googleapis.com/css?family=Roboto'
            },
            'titleFontFamily': {
              'name': 'Roboto',
              'url': 'https://fonts.googleapis.com/css?family=Roboto'
            }
          },
          'theme': 'koa-paper-theme'
        };

        var candyThemeConfig = {
          'colors': {
            'primaryTextColor': '#636363',
            'primaryBackgroundColor': '#ffffff',
            'secondaryTextColor': '#636363',
            'disabledTextColor': '#2f2b16',
            'dividerColor': '#e0e0e0',
            'primaryColor': '#ff003c',
            'lightPrimaryColor': '#c5cae9',
            'darkPrimaryColor': '#ff003c',
            'accentColor': '#fabe28',
            'lightAccentColor': '#fabe28',
            'darkAccentColor': '#fabe28',
            'backgroundColor': '#f8ecc2'
          },
          'images': {
            'background': ''
          },
          'fonts': {
            'primaryFontFamily': {
              'name': 'Raleway',
              'url': 'https://fonts.googleapis.com/css?family=Raleway'
            },
            'titleFontFamily': {
              'name': 'Bitter',
              'url': 'https://fonts.googleapis.com/css?family=Bitter'
            }
          },
          'theme': 'koa-candy-theme'
        };

        var obliqueThemeConfig = {
          'colors': {
            'primaryTextColor': '#202020',
            'primaryBackgroundColor': '#b5e1f8',
            'secondaryTextColor': '#727272',
            'disabledTextColor': '#a2a8aa',
            'dividerColor': '#b6b6b6',
            'primaryColor': '#2aa3dc',
            'lightPrimaryColor': '#b5e1f8',
            'darkPrimaryColor': '#1a86c8',
            'accentColor': '#607d8b',
            'lightAccentColor': '#607d8b',
            'darkAccentColor': '#607d8b',
            'backgroundColor': '#ffffff'
          },
          'images': {
            'background': ''
          },
          'fonts': {
            'primaryFontFamily': {
              'name': 'PT Sans Caption',
              'url': 'https://fonts.googleapis.com/css?family=PT+Sans+Caption'
            },
            'titleFontFamily': {
              'name': 'Pacifico',
              'url': 'https://fonts.googleapis.com/css?family=Pacifico'
            }
          },
          'theme': 'koa-oblique-theme'
        };

        var iosThemeConfig = {
          'colors': {
            'primaryTextColor': '#212121',
            'primaryBackgroundColor': '#ffffff',
            'secondaryTextColor': '#757575',
            'disabledTextColor': '#bdbdbd',
            'dividerColor': '#e0e0e0',
            'primaryColor': '#007aff',
            'lightPrimaryColor': 'rgba(0, 122, 255, 0.15)',
            'darkPrimaryColor': '#0054b0',
            'accentColor': '#ff4081',
            'lightAccentColor': '#ff4081',
            'darkAccentColor': '#ff4081',
            'backgroundColor': '#ffffff'
          },
          'images': {
            'background': ''
          },
          'fonts': {
            'primaryFontFamily': {
              'name': '',
              'url': ''
            },
            'titleFontFamily': {
              'name': '',
              'url': ''
            }
          },
          'theme': 'koa-ios-theme'
        };

        (themeId === 'koa-paper-theme')   ? setTheme(paperThemeConfig) :
        (themeId === 'koa-candy-theme')   ? setTheme(candyThemeConfig) :
        (themeId === 'koa-oblique-theme') ? setTheme(obliqueThemeConfig) :
        (themeId === 'koa-ios-theme')     ? setTheme(iosThemeConfig)
                                          : null;
      }
    }
  }
}());
