(function(){
	describe('Facebook Feed Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load facebook feed module', function() {
			browser.get('/app/#/menu/facebook');
			browser.wait(function() {
					return $('.facebookfeed ul.feed li').isPresent(); // keeps waiting until this statement resolves to true
			}, 5000, 'message to log to console if element is not present after that time');

			expectmodule();

		});

		function expectmodule() {
			expect(element.all(by.css('.facebookfeed ul.feed li')).count()).toBeGreaterThan(5);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
