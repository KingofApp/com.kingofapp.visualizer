// (function(){
// 	describe('Firebase Module test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load firebase module', function() {
// 			browser.get('/app/#/menu/fire-connector');
// 			isPresent('.firebasestatus');
// 			expectmodule();
//
// 		});
// 		function isPresent(selector) {
// 			browser.wait(function() {
// 					return $(selector).isPresent();
// 			}, 6000, 'Main (' + selector + ') not present');
// 		}
// 		function expectmodule() {
// 			expect(element(by.css('.firebasestatus')).getInnerHtml()).toBe('firebase connected!');
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
