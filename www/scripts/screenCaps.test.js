(function() {

  var fs = require('fs'),
      shell = require('shelljs'),
      sharp = require('sharp'),
      config = require('./screenCaps.config.json'),
      paths = require('./screenCaps.paths.json').paths,
      platform = config.platform,
      dimensions = config.dimensions;

  describe('App screens', function() {
    shell.mkdir('-p', 'screenshots');
    shell.cd('screenshots');

    beforeEach(function() {
      browser.driver.manage().window().setSize(414, 850);
      // setPixelPerPx(2);
      browser.ignoreSynchronization = true;
    });

    describe('Device screenshots', function() {

      takeScrenshot('handset');
      takeScrenshot('tablet');

      it('protractor close the browser when screenshoots has been taken', function() {
        browser.close();
        return true;
      })
    });
    function takeScrenshot(device) {
      var i = 0;
      for (var path in paths) {
        it ('protractor takes a screenshot at ' + path + '-' + paths[i], function() {
          var timeToSleep = (i === 0) ? 15000 : 5000;
          browser.get('/#' + paths[i]);
          browser.sleep(timeToSleep);
          browser.wait(function() {
            var resul = $('koa-app').isPresent();
            resul.then(function() {
              browser.takeScreenshot().then( function(data) {
                var base64Data = data.replace(/^data:image\/jpg;base64,/, '');
                fs.writeFile(device + '-screenshot-' + i + '.jpg', base64Data, 'base64', function(err) {
                  if (!err) sharp(device + '-screenshot-' + i + '.jpg')
                              .resize(dimensions[device].width, dimensions[device].height, {interpolator: sharp.interpolator.nohalo})
                              .embed()
                              .ignoreAspectRatio()
                              .toFile(device + '-' + platform + '-' + i + '.jpg', function(err) {
                                if (err) console.error(err);
                              });
                });
              });
            });
            i++;
            return resul; // keeps waiting until this statement resolves to true
          }, 10000, 'message to log to console if element is not present after that time');
        });
      }   
    }
    afterEach(function() {
      browser.ignoreSynchronization = false;
    });
  });
}());
