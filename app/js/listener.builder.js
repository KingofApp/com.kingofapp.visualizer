window.addEventListener('message', function(event) {
  var $body = angular.element(document.body);

  console.log('Recieved!?', event);

  if ($body.injector()) {
    var $rootScope = $body.injector().get('$rootScope');

    $rootScope.$apply(function() {
      if (event.data.config) {
        console.log('Data');
        $rootScope.appData = event.data;
      } else if (event.data.color) {
        console.log('Color', event.data.color);
        $rootScope.appColors = event.data.color;
      } else if (event.data.fonts) {
        console.log('Fonts', event.data.fonts);
        $rootScope.appFonts = event.data.fonts;
      } else if (event.data.modules) {
        console.log('Modules', event.data);
        $rootScope.appModules = event.data;
      } else if (event.data.theme) {
        console.log('Theme', event.data);
        $rootScope.appTheme = event.data;
      }
    });
  }
});
