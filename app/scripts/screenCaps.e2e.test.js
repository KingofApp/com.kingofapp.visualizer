(function() {

  var fs = require('fs'),
      shell = require('shelljs'),
      sharp = require('sharp'),
      config = require('./screenCaps.config.json'),
      structure = require('./../core/structure.json').modules,
      routes = [],
      platform = config.platform,
      width = config.dimensions.width,
      height = config.dimensions.height;

  describe('App screens', function() {
    shell.mkdir('-p', 'screenshots');
    shell.cd('screenshots');

    beforeEach(function() {
      browser.driver.manage().window().setSize(414, 850);
      // setPixelPerPx(2);
      browser.ignoreSynchronization = true;
    });

    describe('App screenshots', function() {

      for (var module in structure) {
        if (!structure[module]['scope']['menuItems']) {
          routes.push('#' + module);
        }
      }
      var numberOfScreenshots = (routes.length < config.max ? routes.length : config.max);

      for (var cont = 0; cont < numberOfScreenshots; cont++) {
        var i = 0;
        it ('protractor takes a screenshot at ' + routes[cont], function() {
          var timeToSleep = (i === 0) ? 15000 : 5000;
          browser.get(routes[i]);
          browser.sleep(timeToSleep);
          browser.wait(function() {
            var resul = $('koa-app').isPresent();
            resul.then(function() {
              browser.takeScreenshot().then( function(data) {
                var base64Data = data.replace(/^data:image\/png;base64,/, '');
                fs.writeFile('screenshot-' + i + '.png', base64Data, 'base64', function(err) {
                  if (!err) sharp('screenshot-' + i + '.png')
                              .resize(width, height, {interpolator: sharp.interpolator.nohalo})
                              .embed()
                              .ignoreAspectRatio()
                              .toFile(platform + '-' + i + '.png', function(err) {
                                if(err) console.error(err);
                                else {
                                  fs.unlink('screenshot-' + i + '.png', function(err) {
                                    !err ? i++ : console.error(err);
                                  });
                                }
                              });
                });
              });
            });
            return resul; // keeps waiting until this statement resolves to true
          }, 10000, 'message to log to console if element is not present after that time');
        });
      }

      it ('protractor takes a screenshot of polymermenu', function() {
        browser.wait(function() {
          var resul = $('.toolbar-tools [role="button"][icon="menu"]').isPresent();
          resul.then(
            function() {
              $('.toolbar-tools [role="button"][icon="menu"]').click();
              browser.sleep(1000);
              browser.takeScreenshot().then(function(data) {
                var base64Data = data.replace(/^data:image\/png;base64,/, '');
                fs.writeFile('menu.png', base64Data, 'base64', function(err) {
                  if (err) console.info('[V] There is an error', err);
                });
                return true;
              });
            }
          )
          return resul;
        }, 10000, 'message to log to console if element is not present after that time');
      })

      it('protractor close the browser when screenshoots has been taken', function() {
        browser.close();
        return true;
      })
    });

    afterEach(function() {
      browser.ignoreSynchronization = false;
    });
  });
}());
