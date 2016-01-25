// (function(){
// 	describe('Youtube Gallery test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load youtube gallery', function() {
// 			browser.get('/app/#/menu/youtube-gallery');
// 			isPresent('.youtubegallery paper-card');
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
// 			expect(element.all(by.css('.youtubegallery paper-card img')).count()).toBeGreaterThan(3);
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
