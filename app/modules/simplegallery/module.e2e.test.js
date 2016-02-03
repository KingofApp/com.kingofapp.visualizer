// (function(){
// 	describe('Simple gallery test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load simple gallery', function() {
// 			browser.get('/app/#/menu/simple-gallery');
// 			isPresent('paper-card');
// 			isPresent('.simplegallery .swiper-slide');
//
// 			expectmodule();
//
// 		});
// 		function isPresent(selector) {
// 			browser.wait(function() {
// 					return $(selector).isPresent();
// 			}, 6000, 'Main (' + selector + ') not present');
// 		}
// 		function expectmodule() {
// 			var slider = element(by.css('div.swiper-wrapper'));
// 			browser.actions().dragAndDrop(
// 					slider,
// 					{x:-800, y:0}
// 			).perform();
// 			expect(element.all(by.css('.swiper-slide')).first().isDisplayed()).toBe(false);
// 			expect(element.all(by.css('.swiper-slide')).count()).toBe(3);
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
