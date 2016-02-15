(function() {
	describe('Not found test', function() {
		beforeEach(function() {
      browser.driver.manage().window().setSize(379, 666);
      browser.ignoreSynchronization = true;
    });
    var EC = protractor.ExpectedConditions;

    it('should load not found', function() {
      browser.get('/app/#/menuldfs');
      isPresent('.static_404 paper-item');
      // element(by.css('.static_404 a')).click();

      expectmodule();
      var aelement = element(by.css('a.return'));
      browser.wait(EC.elementToBeClickable(aelement), 10000);
      aelement.click();
    });
    it('should load menu after not found', function() {
      expectMenu();
    });

    function isPresent(selector) {
      browser.wait(function() {
        return $(selector).isPresent();
      }, 6000, 'Main (' + selector + ') not present');
    }

    function expectmodule() {
      expect(element(by.css('paper-item')).getText()).toBe('Resource not found!');
    }

    function expectMenu() {
      expect(element(by.css('#topBar div')).getText()).toBe('Polymer Menu Module');
    }

    afterEach(function() {
      browser.ignoreSynchronization = false;
    });
  });
}());
