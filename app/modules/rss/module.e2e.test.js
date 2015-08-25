(function(){
	describe('RSS Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load rss module', function() {
			browser.get('/app/#/menu/rss');
			isPresent('ul.rss li');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element.all(by.css('ul.rss li')).count()).toBeGreaterThan(2);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
