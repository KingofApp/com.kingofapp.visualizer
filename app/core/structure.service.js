angular
  .module('king.core.structureService', [])
  .factory('structureService', structureService);

  structureService.$inject = ['$location'];

  function structureService($location){

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

    var data = {
      '/': {
        name: 'Basic Menu',
        type: '$',
        view: "modules/menu/index.html",
        ctrl: "modules/menu/controller.js",
        children: {
          '/x': x,
          '/y': y,
          '/youtube': youtube,
          '/angmodule': angmodule,
          '/angmodule2': angmodule2,
          '/rssmodule': rssmodule,
          '/rssmodule2': rssmodule2
        }
      }
    };

    return {
      get:  get,
      getCurrent: getCurrent,
      update: update,
      onChange: onChange
    }

    function get(){
      console.log('getData')
      return data;
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
    }

    function update(newData){
      data = newData;
      angular.forEach(listeners, function(listener){
        if(listener) listener(newData);
      });
    }

    function onChange(callback){
      listeners.push[callback];
    }

    function findRoute(path, structure, callback){
      for(var key in structure){
        if(path === key){
          callback(structure[path]);
        }
        else if(path.indexOf(key) === 0){
          findRoute(path, structure[key].children, callback);
        }
      }
    }

  };
