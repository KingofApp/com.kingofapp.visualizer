angular
  .module('king.core.structureService')
  .factory('googleAnalytics', loadFunction);

// loadFunction.$inject = ['$http','$scope', 'structureService', '$filter', '$location'];

function loadFunction(){
  var trackingID = "";
  console.log("WENT THROUGH GOOGLE ANALYTICS");
  return {
    load : load
  };
  function load(config) {
    trackingID = config.trackingID;
    console.log("CONFIG CARGADO",trackingID);
  }

}
