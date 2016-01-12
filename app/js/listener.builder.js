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
        $rootScope.appColor = event.data.color;
      } else if (event.data.modules) {
        console.log('Modules', event.data);
        $rootScope.appModules = event.data;
      } else if (event.data.theme) {
        console.log('Theme', event.data.theme);
        $rootScope.appTheme = event.data.theme;
      }
    });
  }
});
