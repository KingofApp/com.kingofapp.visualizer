angular
  .module('king.services.googleanalytics',[])
  .factory('googleAnalytics', loadFunction);


function loadFunction(){
  var trackingId = "";
  console.log("WENT THROUGH GOOGLE ANALYTICS");
  return {
    load : load
  };
  function load(config) {
    trackingId = config.trackingId;
    console.log("CONFIG CARGADO",trackingId);

    // googleAnalyticsCordova.trackingId = trackingId;
  }

}
