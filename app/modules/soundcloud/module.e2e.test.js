(function(){
	describe('SoundCloud test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load soundcloud', function() {
			browser.get('/app/#/polymer-menu/soundcloud');
      isPresent('soundcloud .details');
			expectmodule();
		});

    function isPresent(selector) {
      browser.wait(function() {
          return $(selector).isPresent();
      }, 6000, 'Main (' + selector + ') not present');
    }

		function expectmodule() {
			isPresent('p.ready');
			expect(element(by.css('.track-info a.band')).getInnerHtml()).toBe("Alain Galvan");
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});

	});
}());
