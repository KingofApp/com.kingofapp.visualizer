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
        //Menu 2 for real app
        '/menu'                         : polymermenu("/menu"),
        '/menu/home'          : homepage(),
        '/menu/connector'          : firebase(),
        '/menu/connector/list'     : list(),
        '/menu/rss'                     : rss(),
        '/menu/social'                : facebookfeed(),
        '/menu/twitter'                 : twitterfeed(),
        '/menu/contact'                 : contact(),
        '/menu/flickr'                  : flickrfeed(),
        '/menu/html'                    : html(),
        '/menu/map'                     : googlemap(),
        '/menu/connector/promotions'       : qrgenerator(),
        '/menu/vimeovideo'              : vimeovideo(),
        '/menu/youtubevideo'            : youtubevideo(),
        '/menu/youtubegallery'          : youtubegallery(),
        '/menu/soundcloud'              : soundcloud(),
        '/menu/translation'             : translationtest(),
        '/menu/restaurant'          : simplegallery(),
        '/menu/instagram'               : instagramfeed(),
        '/menu/wordpressposts'          : wordpressposts(),
        '/menu/ads/single'     : wordpresssingle(),
        '/menu/ads'                     : ads()
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
          src   : "https://blinding-heat-1559.firebaseio.com/datatest",
          debug : false // Shows/hides toast connection alert
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

    function homepage(){
      return {
        name: 'Home',
        identifier: 'homepage',
        type :  'A',
        view :  "modules/homepage/index.html",
        files: [ "modules/homepage/controller.js" ],
        scope: {
          sections: [{ name : "Restaurant", icon: "food", class : "green", url : "#/menu/restaurant"},
            { name : "Promotions", icon: "tvmovies", class : "purple", url : "#/menu/connector/promotions"},
            { name : "Social", icon: "profile", class : "blue", url : "#/menu/social"},
            { name : "Find us", icon: "geography", class : "red", url : "#/menu/map"}
          ],
          featured: {title : "Latest News",
            domain      : "http://rachelbaker.me",
            postnumber  : 3,
            category    : "",
            galleryurl : "#/menu/ads/single"
          }
        }
      };
    }

    function googlemap(){
      return {
        name: 'Find us',
        identifier: 'googlemap',
        type :  'A',
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
          galleryurl : "#/menu2/youtubevideo"
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
          galleryurl : "#/menu2/wordpresssingle"
        }
      };
    }
    function wordpresssingle(){
      return {
        name: 'Wordpress Single',
        identifier: 'wordpresssingle',
        type : 'A',
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

    function simplegallery(){
      return {
      name: 'Restaurant',
      identifier: 'simplegallery',
      type :  'A',
      view :  "modules/simplegallery/index.html",
      files: [
        "modules/simplegallery/controller.js"
      ],
      scope: {
        gallery : ["http://i.imgur.com/cBiVYSx.jpg", "http://i.imgur.com/lIb0zTT.jpg", "http://i.imgur.com/bAFPG8K.jpg"]
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
          mainsrc: "<img src='https://thechive.files.wordpress.com/2013/01/tumblr_m4p3ff1gq01qg39ewo1_500.gif'>",
          fixedsrc: "<img src='http://info.fletchersjewelers.com/Portals/145216/images/Bottom%20Banner_Diamond%20Cheat%20Sheet.jpg'/>"
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

    function polymermenu(path){
      return {
        name: 'Polymer Menu Module',
        identifier: 'polymermenu',
        type :  'A',
        view :  "modules/polymermenu/index.html",
        files: ["modules/polymermenu/controller.js"],
        scope: {path: path}
      };
    }
  }
}());
