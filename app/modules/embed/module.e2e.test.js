(function(){
	describe('Embed Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = false;
		});

		it('should load embed module', function() {
			browser.get('/app/#/menu/embed');

			browser.wait(function() {
				return $('.embed').isPresent(); // keeps waiting until this statement resolves to true
			}, 5000, 'message to log to console if element is not present after that time')
			.then(function(){
		     //Switch protractor to iframe
				 browser.waitForAngular();
				 browser.switchTo().frame('embedtest').then(function(){});
		 });

			expectmodule();

		});

		function expectmodule() {
			expect(element(by.css('.angularscope .info')).getInnerHtml()).toBe('Angular Scope Module');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});

	});
}());
