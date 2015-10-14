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
        modules  : menu()
      };
    }

    function config(){
      return {
        'googleAnalytics' : 'UA-54151479-3',
        'lang'            : ['en']
      };
    }

    function menu(){
      return {
        '/abdonrd'                       : abdonrd(),

        //Menu 2 for real app
        '/'                                 : {},
        '/menu'                          : polymermenu("/menu"),
        //For testing purposes
        '/ads'                           : ads(),
        '/ads/menu'                      : polymermenu("/menu"),
        '/ads/menu/angular-scope'        : angularscope(),
        '/simple-directive'              : simpledirective(),
        '/scope'                         : angularscope(),
        '/feed'                          : angularstaticfeed(),
        '/filters'                       : filters(),
        '/menu/scope-module'             : angularscope(),
        '/menu/scope-diff-module'        : angulardiffscope(),
        '/menu/scope-same-module'        : angularscope(),
        '/menu/scope-module/static-feed' : angularstaticfeed(),
        '/multiple-files'                : multiplefiles(),
        '/menu/home'                          : homepage(),
        '/menu/level1-feed'              : angularstaticfeed(),
        '/menu/translation'              : translationtest(),
        '/menu/flickr'                   : flickrfeed(),
        '/menu/instagram'                : instagramfeed(),
        '/menu/youtube-gallery'          : youtubegallery(),
        '/menu/rss'                      : rss(),
        '/menu/pdf'                      : pdfviewer(),
        '/menu/contact'                  : contact(),
        '/menu/facebook'                 : facebookfeed(),
        '/menu/google-map'               : googlemap(),
        '/menu/html'                     : html(),
        '/menu/fire-connector/qr'        : qrgenerator(),
        '/menu/fire-connector/list'      : list(),
        '/menu/wordpress'                : wordpressposts(),
        '/menu/wordpresssingle'          : wordpresssingle(),
        '/menu/vimeo-video'              : vimeovideo(),
        '/menu/soundcloud'              : soundcloud(),

        '/menu/fire-connector'           : firebase(),
        '/menu/simple-gallery'           : simplegallery(),
        '/menu/grouplist'                          : grouplist(),
        // '/menu'                          : angularmenu('/menu')
      };
    }

    function abdonrd() {
      return {
        name: 'Text Example',
        identifier: 'abdonrd',
        type: 'A',
        view: "modules/abdonrd/index.html",
        files: ["modules/abdonrd/controller.js"],
        scope: {
          value: "Text phrase",
          images: [
            "http://placehold.it/350x150",
            "http://placehold.it/350x150"
          ]
        }
      };
    }

    function simplegallery() {
      return {
        name: 'Simple Gallery',
        identifier: 'simplegallery',
        type: 'A',
        headclass: 'green',
        view: "modules/simplegallery/index.html",
        files: [
          "modules/simplegallery/controller.js",
          "modules/simplegallery/swiper/js/swiper.min.js",
          "modules/simplegallery/swiper/css/swiper.min.css"
        ],
        scope: {
          gallery: [
            "http://www.palaisnamaskar.com/media/113359/Breakfast.jpg",
            "http://www.cardamombay.co.uk/img/gallery/cardamomBayMenu16big.jpg",
            "http://www.billyparisi.com/wp-content/uploads/2014/12/xmas-slider-3.jpg"
          ]
        }
      };
    }

    function homepage(){
      return {
        name: 'Home',
        identifier: 'homepage',
        type :  'A',
        headclass : 'orange',
        view :  "modules/homepage/index.html",
        files: [ "modules/homepage/controller.js", "modules/homepage/swiper/js/swiper.min.js", "modules/homepage/swiper/css/swiper.min.css" ],
        scope: {
          sections: [{ name : "Social", icon: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Dummy%20container&w=300&h=300", class : "blue", url : "#/menu/social"},
            { name : "Inspiración", icon: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Dummy%20container&w=300&h=300", class : "purple", url : "#/menu/social2"},
            { name : "Blog", icon: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Dummy%20container&w=300&h=300", class : "grey1", url : "#/menu/blog"},
            { name : "Contact", icon: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Dummy%20container&w=300&h=300", class : "red1", url : "#/menu/contact"}
          ],
          featured: {title : "Últimas noticias",
            domain      : "http://rachelbaker.me",
            postnumber  : 3,
            category    : "",
            galleryurl : "#/menu/wordpresssingle"
          }
        }
      };
    }

    function grouplist(){
      return {
        name: 'Group List',
        identifier: 'grouplist',
        type :  'A',
        headclass : 'blue',
        view :  "modules/grouplist/index.html",
        files: [ "modules/grouplist/controller.js" ],
        scope: {
          sections: [{ name : "Facebook", icon:'svg-social-icons:facebook', class : "avatar facebook", url : "#/menu/facebook"},
            { name : "Twitter", icon:'svg-social-icons:twitter', class : "avatar twitter", url : "#/menu/twitter"}
          ]
        }
      };
    }

    function angularscope(){
      return {
        name: 'Angular Scope Module',
        identifier: 'angularscope',
        type :  'A',
        hidden: true,
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
        hidden: true,
        view :  "modules/firebase/index.html",
        files: ["modules/firebase/controller.js", "modules/firebase/factory.js" ],
        scope: {
          src   : "https://blinding-heat-1559.firebaseio.com/datatest",
          debug : true
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

    function googlemap(){
      return {
        name: 'Map',
        identifier: 'googlemap',
        type :  'A',
        hidden: true,
        view :  "modules/googlemap/index.html",
        files: ["modules/googlemap/controller.js", "modules/googlemap/directive.js"],
        scope: {
          lat:  39.5577,
          lon:  -114.0088,
          zoom: 11
        },
        libs: [{
          bower : {"lodash": "3.10.1"},
          src:"bower_components/lodash/lodash.js"
        },
        {
          bower : {"angular-google-maps": "2.1.6"},
          src:"bower_components/angular-google-maps/dist/angular-google-maps.js"
        }]
      };
    }

    function qrgenerator(){
      return {
        name: 'QR',
        identifier: 'qrgenerator',
        type :  'A',
        view :  "modules/qrgenerator/index.html",
        files: ["modules/qrgenerator/controller.js"],
        scope: {
          static     : "http://google.es",
          datasource : "https://blinding-heat-1559.firebaseio.com/ofertas"
        },
        libs: [{
          bower : {"monospaced/angular-qrcode": "6.0.3"},
          src:"bower_components/angular-qrcode/angular-qrcode.js"
        },
        {
          bower : {"kazuhikoarase/qrcode-generator": "1.0.0"},
          src:"bower_components/qrcode-generator/js/qrcode.js"
        }]
      };
    }

    function pdfviewer(){
      return {
        name: 'Pdf',
        identifier: 'pdfviewer',
        type :  'A',
        hidden: true,
        view :  "modules/pdfviewer/index.html",
        files: ["modules/pdfviewer/controller.js"],
        scope: {
          value : "https://github.com/akrennmair/ng-pdfviewer/raw/develop/example/test.pdf"
        },
        libs: [{
          bower : {"angular-pdf": "1.1.1"},
          src   : "modules/pdfviewer/libs/pdfjs-dist/build/pdf.js"
        },
        {
          bower : {"angular-pdf": "1.1.1"},
          src   : "bower_components/angular-pdf/dist/angular-pdf.js"
        }]
      };
    }

    function youtubevideo(){
      return {
        name: 'Youtube Video',
        identifier: 'youtubevideo',
        type :  'A',
        hidden: true,
        view :  "modules/youtubevideo/index.html",
        files: ["modules/youtubevideo/controller.js", "modules/youtubevideo/directive.js"],
        scope: {
          videoid: "oHg5SJYRHA0"
        }
      };
    }

    function soundcloud(){
      return {
        name: 'Sound Cloud',
        identifier: 'soundcloud',
        type :  'A',
        view :  "modules/soundcloud/index.html",
        files: ["modules/soundcloud/controller.js", "modules/soundcloud/directive.js"],
        scope: {
          client_id: "b23455855ab96a4556cbd0a98397ae8c",
          track:     "65576692"
        }
      };
    }

    function vimeovideo(){
      return {
        name: 'Vimeo Video',
        identifier: 'vimeovideo',
        type :  'A',
        hidden: true,
        view :  "modules/vimeovideo/index.html",
        files: ["modules/vimeovideo/controller.js", "modules/vimeovideo/directive.js"],
        scope: {
          videoid: "136882652",
          height: "250px",
          width: "100%"
        }
      };
    }

    function youtubegallery() {
      return {
        name: 'Youtube Gallery',
        identifier: 'youtubegallery',
        type : 'A',
        view :   "modules/youtubegallery/index.html",
        files: [ "modules/youtubegallery/controller.js" ],
        scope: {
          channelid  : "UCeIt2DJO8UdtUTmJzTfSXiQ",
          galleryurl : "/app/#/menu/youtubevideo"
        },
        //Online builder testing purpose
        libs: [{
          bower : {"xml2json": "1.1.1"},
          src   : "bower_components/x2js/xml2json.js"
        },
        {
          bower : {"angular-xml": "2.2.1"},
          src   : "bower_components/angular-xml/angular-xml.js"
        }]
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

    function wordpressposts(){
      return {
        name: 'Wordpress Feed',
        identifier: 'wordpressposts',
        type : 'A',
        view :   "modules/wordpressposts/index.html",
        files: [ "modules/wordpressposts/controller.js" ],
        scope: {
          domain : "http://rachelbaker.me",
          postnumber      : 3,
          category      : "",
          galleryurl : "/app/#/menu/single"
        }
      };
    }
    function wordpresssingle(){
      return {
        name: 'Wordpress Single',
        identifier: 'wordpresssingle',
        type : 'A',
        hidden: true,
        view :   "modules/wordpresssingle/index.html",
        files: [ "modules/wordpresssingle/controller.js" ],
        scope: {
          domain : "http://rachelbaker.me",
          type   : "pages",
          id     : 1626
        }
      };
    }

    function flickrfeed(){
      return {
        name: 'Flickr Feed',
        identifier: 'flickrfeed',
        type : 'A',
        view :   "modules/flickrfeed/index.html",
        files: [ "modules/flickrfeed/controller.js" ],
        scope: {
          accesstoken : "1d2b22596adb2b99645c52ba2f5d1542",
          photosetid  : "72157649175711353",
          results     : "5"
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
          mandrill_key: "dFOWcqJzBMB69YQGq3GPSQ",
          debug: true
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
        view :  "modules/html/index.html",
        files: ["modules/html/controller.js"],
        scope: {
          value: "<p style='color:#39a9d3;' lang='es-ES'>"+
                  "Ut tortor mauris, ultrices quis "+
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus, leo ut auctor ultrices, erat arcu tincidunt sapien,"+
                  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc eget ipsum euismod, posuere odio"+
                  "</p>"+
                  "<p style='color:#d36339;' lang='es-ES'>"+
                  "Other color text"+
                  "</p>"
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
        hidden: true,
        view :  "modules/angularmenu/index.html",
        files: ["modules/angularmenu/controller.js"],
        scope: {path: path}
      };
    }

    function polymermenu(path){
      return {
        name: 'Polymer Menu Module',
        identifier: 'polymermenu',
        type :  'A',
        hidden: true,
        view :  "modules/polymermenu/index.html",
        files: ["modules/polymermenu/controller.js"],
        scope: {path: path}
      };
    }

    function angularstaticfeed(){
      return {
      name: 'Angular Static Feed Module',
      identifier: 'angularstaticfeed',
      type :  'A',
      hidden: true,
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
    //  hidden: true,
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
