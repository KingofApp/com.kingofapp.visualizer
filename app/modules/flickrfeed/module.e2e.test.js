// (function(){
// 	describe('Flickr Feed Module test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
// 		afterEach(function() {
// 			// browser.manage().logs().get('browser').then(function(browserLog) {
// 			// 	console.log('log: ' + require('util').inspect(browserLog));
// 			// });
// 		});
// 		it('should load flickr feed module', function() {
// 			browser.get('/app/#/menu/flickr');
// 			browser.debugger();
// 			isPresent('.flickrfeed paper-card img');
//
// 			expectmodule();
//
// 		});
// 		function isPresent(selector) {
// 			browser.wait(function() {
// 					return $(selector).isPresent();
// 			}, 24000, 'Main (' + selector + ') not present');
// 		}
// 		function expectmodule() {
// 			expect(element.all(by.css('.flickrfeed paper-card img')).count()).toBeGreaterThan(3);
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
// 	});
// }());
