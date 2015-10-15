document.addEventListener("deviceready", function(){
  var Puship = window.plugins.puship;
  Puship.EnableLog = true;
  Puship.PushipAppId = 'Lc1oSo20j3DMQs8'; // From Puship.com application id

  if (Puship.Common.GetCurrentOs()==Puship.OS.ANDROID){
    var GCMCode = '341724041512'; // From Google Cloud Messaging - Proyect Number
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
