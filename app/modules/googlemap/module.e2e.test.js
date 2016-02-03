// (function(){
// 	describe('Google Map test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load google map', function() {
// 			browser.get('/app/#/menu/google-map');
//       isPresent('google-maps-api');
// 			expectmodule();
// 		});
//
//     function isPresent(selector) {
//       browser.wait(function() {
//           return $(selector).isPresent();
//       }, 6000, 'Main (' + selector + ') not present');
//     }
//
// 		function expectmodule() {
//       isPresent('google-map img');
// 			expect(element.all(by.css('google-map img')).count()).toBeGreaterThan(0);
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
//
// 	});
// }());
