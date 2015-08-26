(function(){
  'use strict';

  angular
    .module('king.core.structureService')
    .factory('sampleModules', sampleModules);

  function sampleModules(){

    return data();

    function data(){
      return {
        config : config(),
        paths  : menu()
      };
    }

    function config(){
      return {
        'googleAnalytics' : 'UA-54151479-3',
        'lang'            : 'en'
      };
    }

    function menu(){
      return {
        '/ads'                           : ads(),
        '/ads/menu'                      : angularmenu("/ads/menu/"),
        '/ads/menu/angular-scope'        : angularscope(),
        '/menu/fire-connector'           : firebase(),
        '/menu/fire-connector/list'      : list(),
        '/menu/translation'              : translationtest(),
        '/menu/text'                     : text(),
        '/menu/rss'                      : rss(),
        '/menu/html'                     : html(),
        '/menu/embed'                    : embed(),
        '/menu/twitter'                  : twitterfeed(),
        '/menu/facebook'                 : facebookfeed(),
        '/menu/instagram'                : instagramfeed(),
        '/menu/contact'                  : contact(),
        '/simple-directive'              : simpledirective(),
        '/scope'                         : angularscope(),
        '/feed'                          : angularstaticfeed(),
        '/filters'                       : filters(),
        '/menu/scope-module'             : angularscope(),
        '/menu/scope-diff-module'        : angulardiffscope(),
        '/menu/scope-same-module'        : angularscope(),
        '/menu/scope-module/static-feed' : angularstaticfeed(),
        '/multiple-files'                : multiplefiles(),
        '/menu/level1-feed'              : angularstaticfeed(),
        '/menu'                          : angularmenu('/menu')
      };
    }

    function angularscope(){
      return {
        name: 'Angular Scope Module',
        identifier: 'angularscope',
        type :  'A',
        view :  "modules/angularscope/index.html",
        files: ["modules/angularscope/controller.js"],
        scope: {
          config: ""
        }
      };
    }

    function firebase(){
      return {
        name: 'Firebase Module',
        identifier: 'firebase',
        type :  'A',
        view :  "modules/firebase/index.html",
        files: ["modules/firebase/controller.js", "modules/firebase/factory.js" ],
        scope: {
          src: "https://blinding-heat-1559.firebaseio.com/datatest"
        },
        //Online builder testing purpose
        libs: [{
          bower : {"firebase": "2.2.4"},
          src:"https://cdn.firebase.com/js/client/2.2.4/firebase.js"
        },
        {
          bower : {"angularfire": "1.1.2"},
          src:"https://cdn.firebase.com/libs/angularfire/1.1.2/angularfire.min.js"
        }]
      };
    }

    function list(){
      return {
        name: 'List Module',
        identifier: 'list',
        type :  'A',
        view :  "modules/list/index.html",
        files: [ "modules/list/controller.js" ],
        scope: {
          src: ""
        }
      };
    }

    function facebookfeed(){
      return {
        name: 'Facebook Feed',
        identifier: 'facebookfeed',
        type : 'A',
        view :   "modules/facebookfeed/index.html",
        files: [ "modules/facebookfeed/controller.js" ],
        scope: {
          accesstoken : "583995668377553|9CrhjgiahQTZQ-l4E40edyNgh0k",
          pageid      : "laneveraroja"
        }
      };
    }
    function instagramfeed(){
      return {
        name: 'Instagram Feed',
        identifier: 'instagramfeed',
        type : 'A',
        view :   "modules/instagramfeed/index.html",
        files: [ "modules/instagramfeed/controller.js" ],
        scope: {
          accesstoken : "45358531.5b9e1e6.bd8539f0a0894bf9aeec75af70d7d51b",
          userid      : "50417061"
        }
      };
    }

    function contact(){
      return {
        name: 'Contact',
        identifier: 'contact',
        type: 'A',
        view:    "modules/contact/index.html",
        files: [ "modules/contact/controller.js" ],
        scope: {
          send_address: "theguard@kingofapp.es",
          mandrill_key: "dFOWcqJzBMB69YQGq3GPSQ"
        }
      };
    }

    function twitterfeed(){
      return {
        name: 'Twitter Feed',
        identifier: 'twitterfeed',
        type : 'A',
        view :  "modules/twitterfeed/index.html",
        files: ["modules/twitterfeed/controller.js"],
        scope: {
          widgetid : "628892310084939776",
          limite : "2"
        }
      };
    }

    function text(){
      return {
        name: 'Text Example',
        identifier: 'text',
        type :  'A',
        view :  "modules/text/index.html",
        files: ["modules/text/controller.js"],
        scope: {
          value: "Text phrase"
        }
      };
    }

    function rss(){
      return {
        name: 'RSS',
        identifier: 'rss',
        type :  'A',
        view :  "modules/rss/index.html",
        files: ["modules/rss/controller.js"],
        scope: {
          feed: "http://elpais.com/rss/elpais/portada.xml"
        }
      };
    }

    function translationtest(){
      return {
        name: 'Translation Test',
        identifier: 'translationtest',
        type :  'A',
        view :  "modules/translationtest/index.html",
        files: ["modules/translationtest/controller.js"],
        scope: {
          name: "Noemal"
        }
      };
    }

    function ads(){
      return {
        name: 'Ads container',
        identifier: 'ads',
        type :  'A',
        view :  "modules/ads/index.html",
        files: ["modules/ads/controller.js"],
        scope: {
          mainsrc: "<h1>Ads Everywhere!</h1>",
          fixedsrc: "<h3>fixed</h3>"
        }
      };
    }

    function simpledirective(){
      return {
        name: 'Simple directive',
        identifier: 'simpledirective',
        type :  'A',
        view :  "modules/simpledirective/index.html",
        files: ["modules/simpledirective/controller.js"],
        scope: {
          config: ""
        }
      };
    }

    function filters(){
      return {
        name: 'Filters test',
        identifier: 'filters',
        type :  'A',
        view :  "modules/filters/index.html",
        files: ["modules/filters/controller.js"],
        scope: {
          config: ""
        }
      };
    }

    function multiplefiles(){
      return {
        name: 'Multiple files',
        identifier: 'multiplefiles',
        type :  'A',
        view :  "modules/multiplefiles/index.html",
        files: ["modules/multiplefiles/controller.js", "modules/multiplefiles/directive.js"
        ],
        scope: {
          config: ""
        }
      };
    }

    function embed(){
      return {
        name: 'Embed Example',
        identifier: 'embed',
        type :  'A',
        view :  "modules/embed/index.html",
        files: ["modules/embed/controller.js"],
        scope: {
          url: "http://es.lipsum.com"
        }
      };
    }

    function html(){
      return {
        name: 'Html Example',
        identifier: 'html',
        type :  'A',
        view :  "modules/html/index.html",
        files: ["modules/html/controller.js"],
        scope: {
          value: "<p style='color:#39a9d3;' lang='es-ES'>"+
                  "En Japón hay una censura férrea hacia cierto tipo de porno: no se"+
                  "permite mostrar penetraciones vaginales o anales reales, sino que"+
                  "estas imágenes aparecen pixeladas o bien sólo pueden verse en"+
                  "animaciones. Por lo tanto se inventaron formas, como el bukakke,"+
                  "donde lo pueden mostrar todo.</p>"+
                  "<p style='color:#d36339;' lang='es-ES'>"+
                  "Desde que creó el portal Putalocura, Torbe asegura que los bukkakes son lo"+
                  "que más se descarga de su página. Hasta el día de hoy ha hecho"+
                  "131, y han participado innumerables hombres y 70 chicas.</p>"
        }
      };
    }

    function angulardiffscope(){
      return {
        name: 'Angular Different Scope Module',
        identifier: 'angularscope',
        type : 'A',
        view :  "modules/angularscope/index.html",
        files: ["modules/angularscope/controller.js"],
        scope: {
          config: ""
        }
      };
    }

    function angularmenu(path){
      return {
        name: 'Angular Menu Module',
        identifier: 'angularmenu',
        type :  'A',
        view :  "modules/angularmenu/index.html",
        files: ["modules/angularmenu/controller.js"],
        scope: {path: path}
      };
    }

    function angularstaticfeed(){
      return {
      name: 'Angular Static Feed Module',
      identifier: 'angularstaticfeed',
      type :  'A',
      view :  "modules/angularstaticfeed/index.html",
      files: [
        "modules/angularstaticfeed/controller.js"
      ],
      scope: {
        feed : [{
          "created_at": "Thu Jul 16 17:59:01 +0000 2015",
          "text": "TFW you realize you've spent the majority of your front-end career in #CallbackHell",
        }, {
          "created_at": "Thu Jul 16 16:17:48 +0000 2015",
          "text": "@alixmcalpine wow ça me donne un petit coup de nostalgie",
        }, {
          "created_at": "Thu Jul 16 16:14:11 +0000 2015",
          "text": "Had a nightmare last night where @angularjs 2 came out and I suddenly sucked at #javascript and I was being chased by Donald Trump and ugh ",
        }, {
          "created_at": "Tue Jul 14 13:23:45 +0000 2015",
          "text": "@haziqmir explosions, gunfire, and Vince Vaughn... That's about all I can discern",
        }, {
          "created_at": "Mon Jul 13 11:42:38 +0000 2015",
          "text": "#GetToTheChoppa\nhttps://t.co/xVDXnhWWlz",
        }]
      }
      };
    }


    // function rssmodule(){
    //return {
    //   name: 'RSS Module',
    //   controller: 'rssmodule',
    //   type :  'A',
    //   view :  "modules/rssmodule/index.html",
    //   ctrl: "modules/rssmodule/controller.js",
    //   scope: {
    //     feed: "http://www.hd-adult.com/feed/"
    //   }
      // };
    //}
    //
    // function youtube(){
    //return {
    //   name: 'youtube',
    //   type: '$',
    //   scope: {
    //     video: "k1eKW37q8Fo",
    //     time: {hours: 12, minutes: 7},
    //     map: 'spain'
    //   },
     //   view :  "modules/youtube/index.html",
    //   ctrl: "modules/youtube/controller.js",
    //   config: {
    //     video: {
    //       type: 'text',
    //       min: 4,
    //       max: 200,
    //       regex: '/\w./',
    //     },
    //     time: {
    //       type: 'composed',
    //       elements: {
    //         hours:   { type: 'number', min: 0, max: 23 },
    //         minutes: { type: 'number', min: 0, max: 59 }
    //       }
    //     },
    //     map: {
    //       type :  'custom',
    //       view :  "modules/youtube/index.html",
    //       ctrl: "modules/youtube/controller.js",
    //
    //     }
    //   }
    //
      // };
    //}
    //
    // function x(){
    //return {
    //   name: 'Module X',
    //   type :  '$',
    //   view :  "modules/x/index.html",
    //   ctrl: "modules/x/controller.js",
      // };
    //}

  }
}());
