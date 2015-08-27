(function(){
	describe('Polymer menu test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load polymer menu', function() {
			browser.get('/app/#/polymer-menu');
			isPresent('iron-icon');

			element(by.css('iron-icon')).click();
			var EC = protractor.ExpectedConditions;
			var menuelement = element.all(by.cssContainingText('a','Facebook Feed')).get(0);
			browser.wait(EC.elementToBeClickable(menuelement), 10000);

			menuelement.click();
			isPresent('.facebookfeed ul.feed li');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element.all(by.css('.facebookfeed ul.feed li')).count()).toBeGreaterThan(5);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
