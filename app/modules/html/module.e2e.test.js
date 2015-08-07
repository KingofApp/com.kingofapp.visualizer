(function(){
	describe('Html Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load html module', function() {
			browser.get('/app/#/menu/html');
			browser.wait(function() {
					return $('.html').isPresent(); // keeps waiting until this statement resolves to true
			}, 5000, 'message to log to console if element is not present after that time');

			expectmodule();

		});

		function expectmodule() {
			//Expect color applied?
			// expect(element.all(by.css('.text p')).get(0).getInnerHtml()).toBe('Text phrase');
				element.all(by.css('.html > div > p')).first().getAttribute('style').then(function(style) {
				var bgColor = style.substr(7, 17);
				expect(bgColor).toBe('rgb(57, 169, 211)');
			});
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
