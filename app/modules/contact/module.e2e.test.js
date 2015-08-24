(function(){
	describe('Contact Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load contact module', function() {
			browser.get('/app/#/menu/contact');
			isPresent('form');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			//Fill in inputs
			element(by.model('contact.name')).sendKeys('Mi nombre');
			element(by.model('contact.email')).sendKeys('test@test.com');
			element(by.model('contact.message')).sendKeys('test');
			//Click to send
			element(by.css('.send')).click()
			//Wait for status to appear
			isPresent('p.status');
			expect(element(by.css('p.status')).getInnerHtml()).toBe('sent');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
