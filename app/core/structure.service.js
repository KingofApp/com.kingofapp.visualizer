angular
  .module('king.core.structureService', [])
  .factory('structureService', structureService);

  //structureService.$inject = ['$location'];

  function structureService(){

    var listeners = [];
    var cachedLocations = {};

    var x = {
      name: 'Module X',
      type: '$',
      view: "modules/x/index.html",
      ctrl: "modules/x/controller.js",
    };

    var y = {
      name: 'Module Y',
      type: '$',
      menu: 'menu2',
      view: "modules/y/index.html",
      ctrl: "modules/y/controller.js",
    };
    var angmodule = {
      name: 'Angular Module',
      controller: 'angmodule',
      type: 'A',
      view: "modules/angmodule/index.html",
      ctrl: "modules/angmodule/controller.js",
      scope: {
        custom: "Custom module1"
      }
    };
    var menu1 = {
      name: 'Menu 1 Module',
      controller: 'menu1',
      type: 'A',
      view: "modules/menu1/index.html",
      ctrl: "modules/menu1/controller.js",
      scope: {
        custom: "Custom menu1"
      }
    };
    var angmodule2 = {
      name: 'Angular Module 2',
      controller: 'angmodule',
      type: 'A',
      view: "modules/angmodule/index.html",
      ctrl: "modules/angmodule/controller.js",
      scope: {
        custom: "Custom module2"
      }
    };

    var rssmodule = {
      name: 'RSS Module',
      controller: 'rssmodule',
      type: 'A',
      view: "modules/rssmodule/index.html",
      ctrl: "modules/rssmodule/controller.js",
      scope: {
        feed: "http://www.hd-adult.com/feed/"
      }
    };

    var rssmodule2 = {
      name: 'RSS Module 2',
      controller: 'rssmodule',
      type: 'A',
      menu: 'menu2',
      view: "modules/rssmodule/index.html",
      ctrl: "modules/rssmodule/controller.js",
      scope: {
        feed: "http://elpais.com/rss/elpais/portada.xml"
      }
    };

    var youtube = {
      name: 'youtube',
      type: '$',
      scope: {
        video: "k1eKW37q8Fo",
        time: {hours: 12, minutes: 7},
        map: 'spain'
      },
      view: "modules/youtube/index.html",
      ctrl: "modules/youtube/controller.js",
      config: {
        video: {
          type: 'text',
          min: 4,
          max: 200,
          regex: '/\w./',
        },
        time: {
          type: 'composed',
          elements: {
            hours:   { type: 'number', min: 0, max: 23 },
            minutes: { type: 'number', min: 0, max: 59 }
          }
        },
        map: {
          type: 'custom',
          view: "modules/youtube/index.html",
          ctrl: "modules/youtube/controller.js",

        }
      }

    };
    var youtube2 = {
      name: 'youtube2',
      type: '$',
      scope: {
        video: "L0ReUkIA7F4",
        time: {hours: 12, minutes: 7},
        map: 'spain'
      },
      view: "modules/youtube/index.html",
      ctrl: "modules/youtube/controller.js",
      config: {
        video: {
          type: 'text',
          min: 4,
          max: 200,
          regex: '/\w./',
        },
        time: {
          type: 'composed',
          elements: {
            hours:   { type: 'number', min: 0, max: 23 },
            minutes: { type: 'number', min: 0, max: 59 }
          }
        },
        map: {
          type: 'custom',
          view: "modules/youtube/index.html",
          ctrl: "modules/youtube/controller.js",

        }
      }

    };

    var menu = {
      defaultMenu: "menu1",
<<<<<<< HEAD
      items:{
        '/x': x,
        '/y': y,
        '/youtube': youtube,
        '/youtube2': youtube2,
        '/angmodule': angmodule,
        '/angmodule2': angmodule2,
        '/rssmodule': rssmodule,
        '/rssmodule2': rssmodule2}
=======
      items:{'/x': x,
      '/y': y,
      '/youtube': youtube,
      '/menu1': menu1,
      '/menu1/angmodule': angmodule,
      '/menu1/angmodule2': angmodule2,
      '/menu1/angmodule/rssmodule': rssmodule,
      '/rssmodule2': rssmodule2}
>>>>>>> nesting-htmls
    };

    var data = {
      '/': {
        name: 'Home',
        type: '$',
        view: "modules/home/index.html",
        ctrl: "modules/home/controller.js",
        children: menu.items
      }
    };

    return {
      get               : get,
      getCurrent        : getCurrent,
      getModulefromPath : getModulefromPath,
      getCurrentModules : getCurrentModules,
      getMenu           : getMenu,
      update            : update,
      onChange          : onChange
    }

    function get(){
      return data;
    }

    function getMenu(){
<<<<<<< HEAD
      //console.log('getMenu')
=======
>>>>>>> nesting-htmls
      return menu;
    }

    function getModulefromPath(path, callback){
      if(cachedLocations[path]){
        callback(cachedLocations[path]);
      }
      else{
        findRoute(path, data, function(module){
          cachedLocations[path] = module;
          callback(module);
        });
      }
    }

    function getCurrent($location, callback){

      if(cachedLocations[$location.$$path]){
        callback(cachedLocations[$location.$$path]);
      }
      else{
        findRoute($location.$$path, data, function(module){
          cachedLocations[$location.$$path] = module;
          callback(module);
        });
      }

      function findRoute(path, structure, callback){
        //*** Meter menu como parte de modulo si no esta definido cargar el default
        //console.log(structure)
        for(var key in structure){
          //console.log(key);
          if(path === key){
            if(structure[path].menu==null){
              structure[path].menu = menu.defaultMenu;
            }
            callback(structure[path]);
          }
          else if(path.indexOf(key) === 0){
            findRoute(path, structure[key].children, callback);
          }
        }
      }

    }
    function getCurrentModules($location, callback){
        var moduleList = []
        var path = $location.$$path;
        var split = path.split("/");

        angular.forEach(split.reverse(), function(value, key) {
          if(value!=""){
            var moduleee = findRoute(path, data, function(module){
                moduleList.push(module);
            });
            path=path.replace("/"+value,"");
          }
        });
        // console.log("ModuleLIST",moduleList);
        callback(moduleList);
    }

    function update(newData){

      var verifications = {
        name: {verification: 'isString', errorMessage: 'name should be a String'},
        type: {verification: 'isString', errorMessage: 'type should be a String'},
        view: {verification: 'isString', errorMessage: 'view should be a String'},
        ctrl: {verification: 'isString', errorMessage: 'ctrl should be a String'}
      }

      var errors = verifyChildrenModules(newData);


      if(newData){

        if(!errors.length){ /*UPDATING PROCESS*/
          data = newData;
          angular.forEach(listeners, function(listener){
            if(listener) listener(newData);
          });
          return { error: false };
        }
        else{
          return { error: true, message: errors };
        }
      }else{
<<<<<<< HEAD
        return { error: true, message: 'Structure data should be an Object'};
=======
        return {
          message: "Structure data should not be null",
          error  : true
        };
>>>>>>> nesting-htmls
      }

      function verifyChildrenModules(module){

        var errors = Array(0);
        angular.forEach(newData, verifyModuleAndChildren, errors);
        return errors;

        function verifyModuleAndChildren(module, path) {
          var result = verify(module);
          if(result.length){
            this.push({path: path, errors: result});
          }
          var childrenVerifications = angular.forEach(module.children, verifyChildrenModules);
          if  (childrenVerifications) this.push(childrenVerifications);
        }
      }

      function verify(module){
        var errors = Array(0);
        angular.forEach(verifications, verifySingle, errors);

        return errors;

        function verifySingle(value, key){
          if (!module[key] || !angular[value.verification](module[key]) ){
            this.push(value.errorMessage);
          }
        }

      }

    }

    function onChange(callback){
      listeners.push[callback];
    }



  };
