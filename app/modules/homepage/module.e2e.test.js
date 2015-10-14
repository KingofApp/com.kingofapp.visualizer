(function(){
	describe('Homepage test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});
		it('should load homepage', function() {
			browser.get('/app/#/menu/home');
			isPresent('paper-card');
			expecthome();
		});

		it('should load wordpress single', function() {
			element(by.css('.swiper-slide-active paper-card a')).click();
			isPresent('.wordpresssingle paper-card div.card-content p');
			expectsingle();
		});

		it('should load homepage again', function() {
			element(by.css('paper-icon-button')).click();
			isPresent('paper-menu .selectable-content a');
			var EC = protractor.ExpectedConditions;
			var menuelement = element.all(by.cssContainingText('.selectable-content a','Home')).get(0);
			browser.wait(EC.elementToBeClickable(menuelement), 10000);
			menuelement.click();

			isPresent('paper-card');
			expecthome();
		});

		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expecthome() {
			var slider = element(by.css('div.swiper-wrapper'));
			browser.actions().dragAndDrop(
			    slider,
			    {x:-800, y:0}
			).perform();
			expect(element.all(by.css('.swiper-slide')).first().isDisplayed()).toBe(false);
			expect(element.all(by.css('.tile')).count()).toBe(5);
			expect(element.all(by.css('.swiper-slide')).count()).toBe(3);
		}
		function expectsingle() {
			expect(element.all(by.css('.wordpresssingle paper-card div.card-content p')).count()).toBeGreaterThan(2);
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
