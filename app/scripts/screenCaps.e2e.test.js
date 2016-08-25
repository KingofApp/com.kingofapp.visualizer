(function() {

  var fs = require('fs'),
      structure = require('./../core/structure.json').modules,
      routes = [];

  describe('App screens', function() {
    beforeEach(function() {
      browser.driver.manage().window().setSize(340, 850);
      browser.ignoreSynchronization = true;
    });
    describe('App screenshots', function() {

      for (var module in structure) {
        if (!structure[module]['scope']['menuItems']) {
          routes.push('#' + module);
        }
      }

      for (var route in routes) {
        var i = 0;
        it ('protractor takes a screenshot at ' + routes[route], function() {
          var timeToSleep = (i === 0) ? 15000 : 5000;
          browser.get(routes[i]);
          browser.sleep(timeToSleep);
          browser.wait(function() {
            var resul = $('koa-app').isPresent();
            resul.then(function() {
              browser.takeScreenshot().then( function(data) {
                var base64Data = data.replace(/^data:image\/png;base64,/, '');
                fs.writeFile(i + '.png', base64Data, 'base64', function(err) {
                  if (!err) i++;
                });
              });
            });
            return resul; // keeps waiting until this statement resolves to true
          }, 10000, 'message to log to console if element is not present after that time');
        });
      }

      it ('protractor takes a screenshot of polymermenu', function() {
        $('.toolbar-tools [role="button"][icon="menu"]').click();
        browser.sleep(1000);
        browser.takeScreenshot().then(function(data) {
          var base64Data = data.replace(/^data:image\/png;base64,/, '');
          fs.writeFile('menu.png', base64Data, 'base64', function(err) {
            throw err;
          });
        });
      })
    });
    afterEach(function() {
      browser.ignoreSynchronization = false;
    });
  });
}());
