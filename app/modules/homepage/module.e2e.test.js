(function(){
	describe('Text Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load text module', function() {
			browser.get('/app/#/menu/text');
			isPresent('.text');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element(by.css('.text p')).getInnerHtml()).toBe('Text phrase');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
