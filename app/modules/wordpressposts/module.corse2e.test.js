(function(){
	describe('Wordpress Posts test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load wordpress posts', function() {
			browser.get('/app/#/polymer-menu/wordpress');
			isPresent('.wordpressposts ul.feed li');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 20000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element.all(by.css('.wordpressposts ul.feed li')).count()).toBeGreaterThan(0);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
