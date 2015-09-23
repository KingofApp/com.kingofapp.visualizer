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
        'lang'            : 'es'
      };
    }

    function menu(){
      return {
        //Menu 2 for real app
        '/menu'                         : polymermenu("/menu"),
        '/menu/home'          : homepage(),
        // '/menu/connector'          : firebase(),
        // '/menu/connector/list'     : list(),
        // '/menu/rss'                     : rss(),
        '/menu/social'                : grouplist(),
        '/menu/social2'                : grouplist2(),
        '/menu/facebook'                : facebookfeed(),
        '/menu/twitter'                 : twitterfeed(),
        '/menu/flickr'                  : flickrfeed(),
        // '/menu/html'                    : html(),
        // '/menu/connector/promotions'       : qrgenerator(),
        // '/menu/vimeovideo'              : vimeovideo(),
        '/menu/youtubevideo'            : youtubevideo(),
        '/menu/youtube'          : youtubegallery(),
        // '/menu/soundcloud'              : soundcloud(),
        // '/menu/translation'             : translationtest(),
        // '/menu/restaurant'          : simplegallery(),
        '/menu/instagram'               : instagramfeed(),
        '/menu/blog'          : wordpressposts(),
        '/menu/ads/single'     : wordpresssingle(),
        // '/menu/map'                     : googlemap(),
        '/menu/contact'                 : contact(),
        '/menu/idioma'                 : translationtest(),
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
        name: 'Inicio',
        identifier: 'homepage',
        type :  'A',
        headclass : 'orange',
        view :  "modules/homepage/index.html",
        files: [ "modules/homepage/controller.js" ],
        scope: {
          sections: [{ name : "Social", icon: "food", class : "blue", url : "#/menu/social"},
            { name : "Inspiración", icon: "tvmovies", class : "purple", url : "#/menu/social2"},
            { name : "Blog", icon: "profile", class : "grey1", url : "#/menu/blog"},
            { name : "Contact", icon: "geography", class : "red1", url : "#/menu/contact"}
          ],
          featured: {title : "Últimas noticias",
            domain      : "http://www.ateneupopular.com",
            postnumber  : 3,
            category    : "",
            galleryurl : "#/menu/ads/single"
          }
        }
      };
    }

    function wordpressposts(){
      return {
        name: 'Blog',
        identifier: 'wordpressposts',
        type : 'A',
        headclass : 'grey',
        view :   "modules/wordpressposts/index.html",
        files: [ "modules/wordpressposts/controller.js" ],
        scope: {
          domain : "http://www.ateneupopular.com",
          postnumber      : 5,
          category      : "",
          galleryurl : "#/menu/ads/single"
        }
      };
    }

    function translationtest(){
      return {
        name: 'Idioma',
        identifier: 'translationtest',
        type :  'A',
        headclass : 'orange',
        view :  "modules/translationtest/index.html",
        files: ["modules/translationtest/controller.js"],
        scope: {
          name: "Noemal"
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
            { name : "Twitter", icon:'svg-social-icons:twitter', class : "avatar twitter", url : "#/menu/twitter"}
          ]
        }
      };
    }
    function grouplist2(){
      return {
        name: 'Inspiración',
        identifier: 'grouplist',
        type :  'A',
        headclass : 'purple',
        view :  "modules/grouplist/index.html",
        files: [ "modules/grouplist/controller.js" ],
        scope: {
          sections: [{ name : "Instagram", icon:'svg-social-icons:instagram', class : "avatar instagram", url : "#/menu/instagram"},
            { name : "Youtube", icon:'svg-social-icons:youtube', class : "avatar youtube", url : "#/menu/youtube"},
            { name : "Flickr", icon:'svg-social-icons:flickr', class : "avatar flickr", url : "#/menu/flickr"}
          ]
        }
      };
    }

    function youtubevideo(){
      return {
        name: 'Youtube Video',
        identifier: 'youtubevideo',
        type :  'A',
        headclass : 'purple',
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
        headclass : 'purple',
        hidden: true,
        view :   "modules/youtubegallery/index.html",
        files: [ "modules/youtubegallery/controller.js" ],
        scope: {
          channelid  : "UC9kxpA_FHEsXX1xWMb-Egow",
          galleryurl : "#/menu/youtubevideo"
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
        name: 'Facebook',
        identifier: 'facebookfeed',
        type : 'A',
        headclass : 'blue',
        hidden: true,
        view :   "modules/facebookfeed/index.html",
        files: [ "modules/facebookfeed/controller.js" ],
        scope: {
          accesstoken : "583995668377553|9CrhjgiahQTZQ-l4E40edyNgh0k",
          pageid      : "ateneupopulardesign"
        }
      };
    }

    function wordpresssingle(){
      return {
        name: 'Blog',
        identifier: 'wordpresssingle',
        type : 'A',
        headclass : 'grey',
        hidden: true,
        view :   "modules/wordpresssingle/index.html",
        files: [ "modules/wordpresssingle/controller.js" ],
        scope: {
          domain : "http://www.ateneupopular.com",
          type   : "pages"
        }
      };
    }

    function flickrfeed(){
      return {
        name: 'Flickr',
        identifier: 'flickrfeed',
        type : 'A',
        headclass : 'purple',
        hidden: true,
        view :   "modules/flickrfeed/index.html",
        files: [ "modules/flickrfeed/controller.js" ],
        scope: {
          accesstoken : "1d2b22596adb2b99645c52ba2f5d1542",
          photosetid  : "72157627618052228",
          results     : "5"
        }
      };
    }

    function instagramfeed(){
      return {
        name: 'Instagram',
        identifier: 'instagramfeed',
        type : 'A',
        headclass : 'purple',
        hidden: true,
        view :   "modules/instagramfeed/index.html",
        files: [ "modules/instagramfeed/controller.js" ],
        scope: {
          accesstoken : "45358531.5b9e1e6.bd8539f0a0894bf9aeec75af70d7d51b",
          userid      : "154695"
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
        name: 'Contacta',
        identifier: 'contact',
        type: 'A',
        headclass : 'red',
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
          limite : "4"
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
          // mainsrc: "<img style='width:100%;' src='http://photos1.blogger.com/blogger/2778/1924/1600/superannouncement10.jpg'>",
          fixedsrc: "<img style='width:100%;' src='http://wiki.lws-hosting.com/lib/exe/fetch.php/banner%20fotolia.jpg'/>"
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
