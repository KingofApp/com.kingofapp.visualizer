// (function(){
// 	describe('Embed Module test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load embed module', function() {
// 			browser.get('/app/#/menu/embed');
//
// 			browser.wait(function() {
// 				return $('.embed').isPresent(); // keeps waiting until this statement resolves to true
// 			}, 5000, 'Main (.embed) not present')
// 			.then(function(){
// 		     browser.wait(function() {
//  					browser.switchTo().frame(browser.findElement(by.css("iframe#embedtest"))).then(function(){});
//  					return $('div#Outer').isPresent(); // keeps waiting until this statement resolves to true
//  				}, 5000, 'Main (div#Outer) not present')
//  				.then(function(){
// 				 	expectmodule();
// 				 });
// 		 });
//
//
//
// 		});
//
// 		function expectmodule() {
// 			expect(element(by.css('h1 span')).getInnerHtml()).toBe('Lorem Ipsum');
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
//
// 	});
// }());
