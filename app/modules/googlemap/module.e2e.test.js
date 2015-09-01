(function(){
	describe('Google Map test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load google map', function() {
			browser.get('/app/#/polymer-menu/google-map');
      isPresent('.angular-google-map');
			expectmodule();
		});

    function isPresent(selector) {
      browser.wait(function() {
          return $(selector).isPresent();
      }, 6000, 'Main (' + selector + ') not present');
    }

		function expectmodule() {
      isPresent('canvas');
			expect(element.all(by.css('canvas')).count()).toBeGreaterThan(0);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});

	});
}());
