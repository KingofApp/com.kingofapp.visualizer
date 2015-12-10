(function(){
	/*describe('Twitter Feed Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		it('should load twitter feed module', function() {
			browser.get('/app/#/menu/twitter');
			browser.wait(function() {
				return $("iframe.twitter-timeline").isPresent(); // keeps waiting until this statement resolves to true
			}, 10000, 'message1 to log to console if element is not present after that time')
			.then(function(){
				browser.wait(function() {
					browser.switchTo().frame(browser.findElement(by.css("iframe.twitter-timeline"))).then(function(){});
					return $('html.SandboxRoot').isPresent(); // keeps waiting until this statement resolves to true
				}, 10000, 'message2 to log to console if element is not present after that time')
				.then(function(){
					browser.wait(function() {
						return $('div.timeline').isPresent(); // keeps waiting until this statement resolves to true
					}, 10000, 'message3 to log to console if element is not present after that time')
					.then(function(){
							expectmodule();
					});
	 			});
			});
		});

		function expectmodule() {
			expect(element.all(by.css('ol li')).count()).toBeGreaterThan(4);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});*/
}());
