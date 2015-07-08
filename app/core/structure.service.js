angular
  .module('king.core.structureService', [])
  .factory('structureService', structureService);

  function structureService(){
    
    var listeners = [];  

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

    var youtube = {
      name: 'youtube',
      type: 'A',
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
            hours:   { type: number, min: 0, max: 23 },
            minutes: { type: number, min: 0, max: 59 }
          }
        },
        map: {
          type: custom,
          view: "modules/youtube/index.html",
          ctrl: "modules/youtube/controller.js",

        }
      }
      
    };

    var data = {
      '/': {
        name: 'Basic Menu',
        type: 'A',
        view: "modules/menu/index.html",
        ctrl: "modules/menu/controller.js",
        children: {
          '/x': x,
          '/y': y,
          '/youtube': youtube
        }
      }
    };

    return {
      get:  get,
      update: update,
      onChange: onChange
    }

    function get(){
      console.log('getData')
      return data;
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

  };