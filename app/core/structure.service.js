'use strict';

angular
  .module('king.core.structureService', [])
  .factory('structureService', structureService);

  structureService.$inject = ['$q', '$translatePartialLoader', '$translate', 'sampleModules', 'structureHooks', '$rootScope'];

  function structureService($q, $translatePartialLoader, $translate, sampleModules, structureHooks, $rootScope){
    var listeners = [];
    var lang;
    var cachedLocations = {};
    var data = {};
    var services = [];
    $rootScope.transitionOn = true;
    if($rootScope.appJsonStructure){
      set($rootScope.appJsonStructure);
    }else{
      set(sampleModules);
      $rootScope.transitionOn = false;
    }
    return {
      get               : get,
      set               : set,
      setModules        : setModules,
      setLoader         : setLoader,
      setColors         : setColors,
      getColors         : getColors,
      getIndex          : getIndex,
      getLang           : getLang,
      setLang           : setLang,
      getModule         : getModule,
      getCurrentModules : getCurrentModules,
      getChildren       : getChildren,
      validateScope     : validateScope,
      registerModule    : registerModule,
      loadconfig        : loadconfig,
      update            : update,
      onChange          : onChange
    };

    function set(newData){
      cachedLocations = {};
      data = newData;

      setLoader(data.config.loader);
      setHooks();
      $rootScope.$broadcast("menuUpdated");
    }
    function setLoader(src) {
      if(src){
        $rootScope.loader=src;
      }else{
        //Default Loader
        $rootScope.loader="resources/loader.gif";
      }
    }

    function setModules(newData){
      cachedLocations = {};
      data.modules = newData;
      setHooks();
    }

    function setHooks(){
      if(structureHooks.getIndex()!==""){
        data.config.indexOld = data.config.index;
        data.config.index = structureHooks.getIndex();
      }
      angular.forEach(structureHooks.getModules(), function(module, path){
        data.modules[path]=module;
      });
    }

    function setColors(color){
      cachedLocations = {};
      if(color === null){
        color = getColors();
      }
      // data.config.colors = color;
      var s = document.createElement('style', 'custom-style');
      s.textContent = ':root {\n';
      s.textContent += JSON.stringify(color).replace(/"|{|}/g, '').replace(/,/g, ';') + ';';
      s.textContent += '\n}';
      document.body.appendChild(s);
      Polymer.updateStyles();
      s.remove();
    }

    function get(){
      return data;
    }

    function getColors(){
      return data.config.colors;
    }

    function getIndex() {
      return data.config.index;
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
        if(path.indexOf(menuPath) === 0 || path.replace(/((\/)(\bads)((\-?)(\w+)?))/gmi,"").indexOf(menuPath) === 0){
          menu[path] = data;
        }
      });
      return menu;
    }

    function loadconfig($rootScope) {
      $translate.use(getLang());
      // $rootScope.config = { googleAnalytics: data.config.googleAnalytics };
      // $rootScope.$watch('data.config.googleAnalytics', function(prev,next) {
      //   ga('create', $rootScope.config.googleAnalytics, { 'cookieDomain': 'none' });
      // });
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

    function validateScope(module) {
      var empty = true;
      angular.forEach(module.scope, function(value, key) {
        if(value && value !== ""){
          empty = false;
        }
      });
      if(empty){
          return "resources/missing.html";
      }
      return module.view;
    }

    function registerModule($location, $scope, item){
      getCurrentModules( $location, function(modules){
        angular.forEach(modules, function(value, key) {
          if(modules[key+1]){
            $scope[modules[key+1].identifier+'Template'] = validateScope(modules[key]);
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
