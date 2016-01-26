// (function(){
// 	describe('Polymer menu test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(479, 866);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should open polymer menu', function() {
// 			browser.get('/app/#/menu');
// 			isPresent('paper-item');
// 			var EC = protractor.ExpectedConditions;
// 			var menuelement = element(by.css('paper-icon-button'));
// 			browser.wait(EC.elementToBeClickable(menuelement), 10000);
// 			element(by.css('paper-icon-button')).click();
// 		});
//
// 		it('should click polymer menu', function() {
// 			isPresent('paper-menu .selectable-content a.Facebook-Feed');
// 			var EC = protractor.ExpectedConditions;
// 			var menuelement = element(by.css('a.Facebook-Feed'));
// 			isPresent('#mainContainer');
// 			browser.wait(EC.elementToBeClickable(menuelement), 10000);
// 			menuelement.click();
// 		});
//
// 		it('should load facebook after polymer menu', function() {
// 			isPresent('.facebookfeed paper-card img');
// 			expectmodule();
// 		});
// 		function isPresent(selector) {
// 			browser.wait(function() {
// 					return $(selector).isPresent();
// 			}, 6000, 'Main (' + selector + ') not present');
// 		}
// 		function expectmodule() {
// 			expect(element.all(by.css('.facebookfeed paper-card img')).count()).toBeGreaterThan(5);
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
