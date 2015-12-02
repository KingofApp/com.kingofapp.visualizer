angular
  .module('king.core.structureService')
  .factory('pushIp', loadFunction);

// loadFunction.$inject = ['$http','$scope', 'structureService', '$filter', '$location'];

function loadFunction(){
  var PushipAppId = "";
  var GCMCode = "";
  console.log("WENT THROUGH PushIp");
  return {
    load : load
  };
  function load(config) {
    PushipAppId = config.PushipAppId;
    GCMCode = config.GCMCode;
    console.log("CONFIG CARGADO",GCMCode ,PushipAppId);
  }

}
