// (function(){
// 	describe('Vimeo Video test', function() {
// 		beforeEach(function(){
// 		    browser.driver.manage().window().setSize(379, 666);
// 		    browser.ignoreSynchronization = true;
// 		});
//
// 		it('should load vimeo video', function() {
// 			browser.get('/app/#/menu/vimeo-video');
//
// 			browser.wait(function() {
// 				return $('.vimeovideo').isPresent(); // keeps waiting until this statement resolves to true
// 			}, 5000, 'Main (.vimeovideo) not present')
// 			.then(function(){
// 		     browser.wait(function() {
//  					browser.switchTo().frame(browser.findElement(by.css("iframe"))).then(function(){});
//  					return $('head title').isPresent(); // keeps waiting until this statement resolves to true
//  				}, 5000, 'Main (head title) not present')
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
// 			expect(element(by.css('head title')).getInnerHtml()).toBe('Dominio Público -  Demo Reel Video Clips 2015 from Dominio Publico Films on Vimeo');
// 		}
//
// 		afterEach(function() {
// 			browser.ignoreSynchronization = false;
// 		});
//
// 	});
// }());
