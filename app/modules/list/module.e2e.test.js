(function(){
	describe('List Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load list module', function() {
			browser.get('/app/#/menu/fire-connector/list');
			isPresent('div.item');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element.all(by.css('div.item')).count()).toBeGreaterThan(2);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
