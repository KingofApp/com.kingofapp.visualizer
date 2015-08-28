(function(){
	describe('Youtube Gallery test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load youtube gallery', function() {
			browser.get('/app/#/polymer-menu/youtube-gallery');
			isPresent('.youtubegallery ul.feed li');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element.all(by.css('.youtubegallery ul.feed li')).count()).toBeGreaterThan(5);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
