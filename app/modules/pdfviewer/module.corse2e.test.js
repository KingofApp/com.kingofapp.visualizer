// (function(){
// 	describe('Pdf viewer test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load pdf viewer', function() {
// 			browser.get('/app/#/menu/pdf');
// 			isPresent('p.ready');
//
// 			expectmodule();
//
// 		});
// 		function isPresent(selector) {
// 			browser.wait(function() {
// 					return $(selector).isPresent();
// 			}, 30000, 'Main (' + selector + ') not present');
// 		}
// 		function expectmodule() {
// 			expect(element(by.css('span.pagecount')).getInnerHtml()).toBe('1');
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
