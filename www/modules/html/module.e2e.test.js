// (function(){
// 	describe('Html Module test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load html module', function() {
// 			browser.get('/app/#/menu/html');
// 			isPresent('.html paper-card div p');
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
// 			//Expect color applied
// 			element.all(by.css('.html paper-card div p')).first().getAttribute('style').then(function(style) {
// 				var bgColor = style.substr(7, 17);
// 				expect(bgColor).toBe('rgb(57, 169, 211)');
// 			});
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
