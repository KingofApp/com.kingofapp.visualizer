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
        // '/menu/connector/list'     : list(),
        // '/menu/rss'                     : rss(),
        '/menu/social'                : grouplist(),
        '/menu/facebook'                : facebookfeed(),
        '/menu/twitter'                 : twitterfeed(),
        '/menu/flickr'                  : flickrfeed(),
        '/menu/html'                    : html(),
        '/menu/map'                     : googlemap(),
        '/menu/connector/promotions'       : qrgenerator(),
        // '/menu/vimeovideo'              : vimeovideo(),
        '/menu/youtubevideo'            : youtubevideo(),
        '/menu/youtubegallery'          : youtubegallery(),
        // '/menu/soundcloud'              : soundcloud(),
        // '/menu/translation'             : translationtest(),
        '/menu/restaurant'          : simplegallery(),
        '/menu/instagram'               : instagramfeed(),
        // '/menu/wordpressposts'          : wordpressposts(),
        '/menu/ads/single'     : wordpresssingle(),
        '/menu/contact'                 : contact(),
        '/menu/ads'                     : ads()
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

    function homepage(){
      return {
        name: 'Home',
        identifier: 'homepage',
        type :  'A',
        headclass : 'pink',
        view :  "modules/homepage/index.html",
        files: [ "modules/homepage/controller.js" ],
        scope: {
          sections: [{ name : "The Restaurant", icon: "food", class : "green", url : "#/menu/restaurant"},
            { name : "Promotions", icon: "tvmovies", class : "purple", url : "#/menu/connector/promotions"},
            { name : "Social", icon: "profile", class : "blue", url : "#/menu/social"},
            { name : "Find us", icon: "geography", class : "red", url : "#/menu/map"}
          ],
          featured: {title : "Latest News",
            domain      : "http://www.oemenlinea.com.mx",
            postnumber  : 3,
            category    : "sociedad",
            galleryurl : "#/menu/ads/single"
          }
        }
      };
    }
    function grouplist(){
      return {
        name: 'Social',
        identifier: 'grouplist',
        type :  'A',
        headclass : 'blue',
        view :  "modules/grouplist/index.html",
        files: [ "modules/grouplist/controller.js" ],
        scope: {
          sections: [{ name : "Facebook", icon:'svg-social-icons:facebook', class : "avatar facebook", url : "#/menu/facebook"},
            { name : "Twitter", icon:'svg-social-icons:twitter', class : "avatar twitter", url : "#/menu/twitter"},
            { name : "Instagram", icon:'svg-social-icons:instagram', class : "avatar instagram", url : "#/menu/instagram"},
            { name : "Youtube", icon:'svg-social-icons:youtube', class : "avatar youtube", url : "#/menu/youtube"},
            { name : "Flickr", icon:'svg-social-icons:flickr', class : "avatar flickr", url : "#/menu/flickr"}
          ]
        }
      };
    }

    function googlemap(){
      return {
        name: 'Find us',
        identifier: 'googlemap',
        type :  'A',
        headclass : 'red',
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
        name: 'Promotions',
        identifier: 'qrgenerator',
        type :  'A',
        headclass : 'purple',
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

    function youtubevideo(){
      return {
        name: 'Youtube Video',
        identifier: 'youtubevideo',
        type :  'A',
        headclass : 'blue',
        hidden: true,
        view :  "modules/youtubevideo/index.html",
        files: ["modules/youtubevideo/controller.js", "modules/youtubevideo/directive.js"],
        scope: {
          videoid: "oHg5SJYRHA0"
        }
      };
    }

    function youtubegallery() {
      return {
        name: 'Youtube Gallery',
        identifier: 'youtubegallery',
        type : 'A',
        headclass : 'blue',
        hidden: true,
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
        headclass : 'blue',
        hidden: true,
        view :   "modules/facebookfeed/index.html",
        files: [ "modules/facebookfeed/controller.js" ],
        scope: {
          accesstoken : "583995668377553|9CrhjgiahQTZQ-l4E40edyNgh0k",
          pageid      : "laneveraroja"
        }
      };
    }

    function wordpresssingle(){
      return {
        name: 'Wordpress Single',
        identifier: 'wordpresssingle',
        type : 'A',
        headclass : 'grey',
        hidden: true,
        view :   "modules/wordpresssingle/index.html",
        files: [ "modules/wordpresssingle/controller.js" ],
        scope: {
          domain : "http://www.oemenlinea.com.mx/",
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
        headclass : 'blue',
        hidden: true,
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
        headclass : 'blue',
        hidden: true,
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
      headclass : 'green',
      view :  "modules/simplegallery/index.html",
      files: [
        "modules/simplegallery/controller.js"
      ],
      scope: {
        gallery : ["http://www.palaisnamaskar.com/media/113359/Breakfast.jpg",
          "http://www.cardamombay.co.uk/img/gallery/cardamomBayMenu16big.jpg",
          "http://www.billyparisi.com/wp-content/uploads/2014/12/xmas-slider-3.jpg"]
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
        headclass : 'blue',
        hidden: true,
        view :  "modules/twitterfeed/index.html",
        files: ["modules/twitterfeed/controller.js"],
        scope: {
          widgetid : "628892310084939776",
          limite : "2"
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
          mainsrc: "<img src='https://thechive.files.wordpress.com/2013/01/tumblr_m4p3ff1gq01qg39ewo1_500.gif'>",
          // fixedsrc: "<img src='http://info.fletchersjewelers.com/Portals/145216/images/Bottom%20Banner_Diamond%20Cheat%20Sheet.jpg'/>"
        }
      };
    }

    function html(){
      return {
        name: 'Events',
        identifier: 'html',
        type :  'A',
        headclass : 'yellow',
        view :  "modules/html/index.html",
        files: ["modules/html/controller.js"],
        scope: {
          value: '<div class="calendarpgtext"> <h1 style="text-align: center;">Private Events</h1> <h3 class="blackline" style="text-align: center;height: 1px;     width: 100%;     border-bottom: solid 1px #000;     margin-bottom: 20px;">Have your next event at The Restaurant!</h3> <div style=" height: 1px; width: 100%; border-bottom: solid 1px #000; margin-bottom: 20px; "></div><img src="http://www.martinibistro.com/wp-content/uploads/2014/03/2.jpg" style="width:100%;"> <ul> <li>Private Room: up to 75 guests.</li> </ul> <ul> <li>Main Restaurant Space: up to 150 guests.</li> </ul> <ul> <li>Area for band and dance floor.</li> </ul> <ul> <li>Semi Private Standing Bar/ Hors D’oeuvre area for up to 30 guests.</li> </ul> <ul> <li>Semi Private Seating Area for up to 30 guests.</li> </ul> <ul> <li>Menus tailored for every occasion and budget.</li> </ul> <ul> <li>Birthday Celebrations, Business Functions, Fundraisers, Holiday Parties, Showers, Christenings, Confirmations, Bar Mitzvahs, Rehearsal Dinners, Repasts.</li> </ul> <ul> <li>Contact Us at 973-376-4444 for more information.</li> </ul> <div></div> <div class="mailinglist"></div></div>'
        }
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
  }
}());
