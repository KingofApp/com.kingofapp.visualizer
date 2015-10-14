(function(){
	describe('QR generator test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load qr generator', function() {
			browser.get('/app/#/menu/fire-connector/qr');
			isPresent('.qrgenerator');

			expectstatic();
			expectdynamic();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 9000, 'Main (' + selector + ') not present');
		}
		function expectstatic() {
			expect(element(by.css('.static qr-code')).isPresent()).toBe(true);
		}
		function expectdynamic() {
			isPresent('paper-card.dynamic');
			expect(element.all(by.css('paper-card.dynamic qr-code')).count()).toBeGreaterThan(1);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
