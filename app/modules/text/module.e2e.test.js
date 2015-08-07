(function(){
	describe('Text Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load text module', function() {
			browser.get('/app/#/menu/text');
			browser.wait(function() {
					return $('.text').isPresent(); // keeps waiting until this statement resolves to true
			}, 5000, 'message to log to console if element is not present after that time');

			expectmodule();

		});

		function expectmodule() {
			expect(element.all(by.css('.text p')).get(0).getInnerHtml()).toBe('Text phrase');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
