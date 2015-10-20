window.addEventListener('message', function(event) {
  var $body = angular.element(document.body);
  var $rootScope = $body.injector().get('$rootScope');
  console.log("Recieved",event);
  $rootScope.$apply(function () {
    if(event.data.modules){
      $rootScope.appData = event.data;
    }else if(event.data.color){
      console.log("Color",event.data.color);
      $rootScope.appColor = event.data.color;
    }else if(event.data.theme){
      console.log("Theme",event.data.theme);
      $rootScope.appTheme = event.data.theme;
    }
  });

});
