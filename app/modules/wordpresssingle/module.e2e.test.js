// (function(){
// 	describe('Wordpress Single Post test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
// 		it('should load wordpress posts', function() {
// 			browser.get('/app/#/menu/wordpresssingle');
// 			isPresent('.wordpresssingle paper-card div.card-content p');
//
// 			expectmodule();
//
// 		});
// 		function isPresent(selector) {
// 			browser.wait(function() {
// 					return $(selector).isPresent();
// 			}, 20000, 'Main (' + selector + ') not present');
// 		}
// 		function expectmodule() {
// 			expect(element(by.css('.wordpresssingle paper-card h2.title-text')).getInnerHtml()).toBe('About');
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
