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
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectstatic() {
			expect(element(by.css('.static qrcode canvas')).isPresent()).toBe(true);
		}
		function expectdynamic() {
			isPresent('ul li.list');
			expect(element.all(by.css('ul li.list')).count()).toBeGreaterThan(1);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
