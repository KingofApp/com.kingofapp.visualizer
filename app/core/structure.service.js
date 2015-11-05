'use strict';

angular
  .module('king.core.structureService', [])
  .factory('structureService', structureService);

  structureService.$inject = ['$q','$translatePartialLoader', '$translate', 'sampleModules', '$rootScope'];

  function structureService($q, $translatePartialLoader, $translate, sampleModules, $rootScope){

    var listeners = [];
    var lang;
    var cachedLocations = {};
    var data = {};
    if($rootScope.appJsonStructure){
      set($rootScope.appJsonStructure);
    }
    set(sampleModules);

    return {
      get               : get,
      set               : set,
      setModules        : setModules,
      setColors         : setColors,
      getLang           : getLang,
      setLang           : setLang,
      getModule         : getModule,
      getCurrentModules : getCurrentModules,
      getChildren       : getChildren,
      registerModule    : registerModule,
      loadconfig        : loadconfig,
      update            : update,
      onChange          : onChange
    };


    function set(newData){
      cachedLocations = {};
      data = newData;
      //Add static_404 to structure
      data.modules['/404']=error404();
      $rootScope.$broadcast("menuUpdated");
    }

    function setModules(newData){
      cachedLocations = {};
      data.modules = newData;
      data.modules['/404']=error404();
    }
    function setColors(newData){
      cachedLocations = {};
      data.config.colors = newData;
    }

    function get(){
      return data;
    }

    function getLang(){
      if(lang) return lang;
      else     return data.config.lang[0];
    }

    function setLang(locale){
      lang = locale;
    }

    function getChildren(menuPath){
      var menu = {};
      angular.forEach(data.modules, function(data, path){
        if(path.indexOf(menuPath) === 0){
          menu[path] = data;
        }
      });
      return menu;
    }

    function loadconfig($rootScope) {
      $translate.use(getLang());
      $rootScope.config = { googleAnalytics: data.config.googleAnalytics };
      $rootScope.$watch('data.config.googleAnalytics', function(prev,next) {
        ga('create', $rootScope.config.googleAnalytics, { 'cookieDomain': 'none' });
      });
    }

    function getModule(path, callback){
      var deferred = $q.defer();
      if(cachedLocations[path]){
        deferred.resolve(cachedLocations[path]);
      }
      else{
        findRoute(path, data.modules, function(module){
          cachedLocations[path] = module;
          deferred.resolve(cachedLocations[path]);
        });
      }
      return deferred.promise;
    }

    function getCurrentModules($location, callback){
        var moduleList = [];
        var path = $location.$$path;
        var split = path.split("/");

        angular.forEach(split.reverse(), function(value, key) {
          if(value!==""){
            var module = findRoute(path, data.modules, function(module){
                moduleList.push(module);
            });
            path=path.replace("/"+value,"");
          }
        });
        // console.log("ModuleLIST",moduleList);
        callback(moduleList);
    }
    function registerModule($location, $scope, item){
      getCurrentModules( $location, function(modules){
        angular.forEach(modules, function(value, key) {
          if(modules[key+1]){
            $scope[modules[key+1].identifier+'Template'] = value.view;
          }
          if(modules[key].identifier==item){
            $scope[item] = {
              custom      : modules[key].name,
              modulescope : modules[key].scope
            };
            $translatePartialLoader.addPart(item);
          }
        });
      });
    }
    function update(newData){
      if(newData){
        data = newData;
        angular.forEach(listeners, function(listener){
          if(listener) listener(newData);
        });
      }else{
        return {
          message: "Structure data should not be null",
          error  : true
        };
      }
    }

    function onChange(callback){
      listeners.push[callback];
    }

    function error404(){
      return {
        name: '404 Not found',
        identifier: 'static_404',
        type : 'A',
        showOn : {
          menu : false,
          market : false,
          dragDrop : false
        },
        view :   "modules/static_404/index.html",
        files: [ "modules/static_404/controller.js" ],
        scope: { }
      };
    }

    function findRoute(path, structure, callback){
      // console.log("Path", path);
      // console.log("Structure", structure);
      if(structure[path]){
        callback(structure[path]);
      }
      else{
        callback(new Error("No module found in path "+path));
      }

    }

  };
