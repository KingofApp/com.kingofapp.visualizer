// (function(){
// 	describe('Group list test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load group list module', function() {
// 			browser.get('/app/#/menu/grouplist');
// 			isPresent('paper-icon-item');
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
// 			expect(element.all(by.css('paper-icon-item')).count()).toBeGreaterThan(1);
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
