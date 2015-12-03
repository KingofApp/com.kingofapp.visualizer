angular
  .module('king.services.puship',[])
  .factory('pushIp', loadFunction);

// loadFunction.$inject = ['$http','$scope', 'structureService', '$filter', '$location'];

function loadFunction(){
  var PushipAppId = "";
  var GCMCode = "";
  return {
    load : load
  };
  function load(config) {
    PushipAppId = config.PushipAppId;
    GCMCode = config.GCMCode;
    console.log("CONFIG CARGADO",GCMCode ,PushipAppId);
    document.addEventListener("deviceready", function(){
      console.log("Device Ready");
      var Puship = window.plugins.puship;
      Puship.EnableLog = true;
      Puship.PushipAppId = PushipAppId; // From Puship.com application id

      if (Puship.Common.GetCurrentOs()==Puship.OS.ANDROID){
        var GCMCode = GCMCode; // From Google Cloud Messaging - Proyect Number
        Puship.GCM.Register(GCMCode,
        {
          successCallback: function (pushipresult){
            console.log("device registered with DeviceId:" + pushipresult.DeviceId);
          },
          failCallback: function (pushipresult){
            console.log("error during registration: "+ JSON.stringify(pushipresult));
          }
        });
      } else if (Puship.Common.GetCurrentOs()==Puship.OS.IOS){
        Puship.APNS.Register(
        {
          successCallback: function (pushipresult){
            console.log("device registered with DeviceId:" + pushipresult.DeviceId);
          },
          failCallback: function (pushipresult){
            console.log("error during registration: "+ JSON.stringify(pushipresult));
          }
        });
      } else if (Puship.Common.GetCurrentOs()==Puship.OS.WP){
        Puship.WP.Register(
        {
          successCallback: function (pushipresult){
            console.log("device registered with DeviceId:" + pushipresult.DeviceId);
          },
          failCallback: function (pushipresult){
            console.log("error during registration: "+ JSON.stringify(pushipresult));
          }
        });
      } else {
        Console.log("Not supported platform");
      }
    }, false);

  }

}
