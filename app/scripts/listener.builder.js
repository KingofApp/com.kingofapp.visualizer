var previousData = "";
window.addEventListener('message', function(event) {
  var $body = angular.element(document.body);

  console.log('[V] Recieved!?', event);

  if ($body.injector()) {
    var $rootScope = $body.injector().get('$rootScope');

    $rootScope.$apply(function() {
      if(JSON.stringify(event.data) !== previousData){
        if (event.data.config) {
          console.log('[V] Data');
          $rootScope.appData = event.data;
        } else if (event.data.color) {
          console.log('[V] Color', event.data.color);
          $rootScope.appColors = event.data.color;
        } else if (event.data.fonts) {
          console.log('[V] Fonts', event.data.fonts);
          $rootScope.appFonts = event.data.fonts;
        } else if (event.data.modules) {
          console.log('[V] Modules', event.data.modules);
          $rootScope.appModules = event.data;
        } else if (event.data.theme) {
          console.log('[V] Theme', event.data);
          $rootScope.appTheme = event.data;
        }
        setPreventions();
      }


    });
    function setPreventions() {
      $rootScope.previous = "";
      previousData = JSON.stringify(event.data);
    }
  }
});
