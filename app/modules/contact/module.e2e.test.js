// (function(){
// 	describe('Contact Module test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load contact module', function() {
// 			browser.get('/app/#/menu/contact');
// 			isPresent('paper-input');
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
// 			//Fill in inputs
// 			element(by.css('input[name="name"]')).sendKeys('Mi nombre');
// 			element(by.css('input[name="email"]')).sendKeys('test@test.com');
// 			element(by.css('input[name="message"]')).sendKeys('test');
// 			//Click to send
// 			element(by.css('form paper-button')).click()
// 			//Wait for status to appear
// 			isPresent('p.status');
// 			expect(element(by.css('p.status')).getInnerHtml()).toBe('Message sent.');
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
