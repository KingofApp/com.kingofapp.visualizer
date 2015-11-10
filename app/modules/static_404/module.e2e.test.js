(function(){
	describe('Not found test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load not found', function() {
			browser.get('/app/#/menuldfs');
			isPresent('.static_404 paper-item');

			expectmodule();
			element(by.css('.static_404 a')).click();
			expectMenu();
		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element(by.css('.static_404 a')).getInnerHtml()).toBe('Click here to return');
		}
		function expectMenu() {
			isPresent('paper-icon-button');
			expect($('paper-icon-button').isPresent()).toBe(true);
			element(by.css('paper-icon-button')).click();
			// expect(element(by.css('#topBar > span.title')).getInnerHtml()).toBe('Polymer Menu Module');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
