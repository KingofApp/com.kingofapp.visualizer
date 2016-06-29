var previousData = '';

window.addEventListener('message', function(event) {
  var $body = angular.element(document.body);

  console.info('[V] Recieved!?', event);

  if ($body.injector()) {
    var $rootScope = $body.injector().get('$rootScope');

    $rootScope.$apply(function() {
      if (JSON.stringify(event.data) !== previousData) {
        if (event.data.config) {
          console.info('[V] Data');
          $rootScope.appData = event.data;
        } else if (event.data.color) {
          console.info('[V] Color', event.data.color);
          $rootScope.appColors = event.data.color;
        } else if (event.data.fonts) {
          console.info('[V] Fonts', event.data.fonts);
          $rootScope.appFonts = event.data.fonts;
        } else if (event.data.modules) {
          console.info('[V] Modules', event.data.modules);
          $rootScope.appModules = event.data;
        } else if (event.data.theme) {
          console.info('[V] Theme', event.data);
          $rootScope.appTheme = event.data;
        } else if (event.data.spinner) {
          console.info('[V] Spinner', event.data);
          $rootScope.appSpinner = event.data;
        }
        setPreventions();
      }

    });
  }
  function setPreventions() {
    $rootScope.previous = '';
    previousData = JSON.stringify(event.data);
  }
});
