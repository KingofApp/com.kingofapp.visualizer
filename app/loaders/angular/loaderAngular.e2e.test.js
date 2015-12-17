(function(){
	describe('Angular modules test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});

		// describe('for simple modules', function() {
		// 	it('should load angular menu', function() {
		// 		browser.get('/app/#/menu');
		// 		// isPresent('paper-toolbar');
		//
		// 		expectMenu();
		//
		// 	});
		//
		// 	it('should load angular scope', function() {
		// 		browser.get('/app/#/scope');
		// 		isPresent('.angularscope');
		//
		// 		expectScope();
		//
		// 	});
		//
		// 	it('should load angular feed', function() {
		// 		browser.get('/app/#/feed');
		// 		isPresent('.angularstaticfeed');
		//
		// 		expectFeed();
		//
		// 	});
		//
		// 	it('should load angular simple directive', function() {
		// 		browser.get('/app/#/simple-directive');
		// 		isPresent('.simpledirective');
		//
		// 		expectSimpledirective();
		//
		// 	});
		//
		// 	it('should load angular filters', function() {
		// 		browser.get('/app/#/filters');
		// 		isPresent('.filters');
		//
		// 		expectFilters();
		//
		// 	});
		//
		// });
		//
		// describe('for multi-level modules', function() {
		// 	it('should load angular scope inside angular menu', function() {
		// 		browser.get('/app/#/menu/scope-module');
		// 		// isClickable('paper-toolbar');
		//
		// 		expectMenu();
		// 		expectScope();
		//
		// 	});
		// 	it('should load angular feed inside angular menu', function() {
		// 		browser.get('/app/#/menu/level1-feed');
		// 		// isClickable('paper-toolbar');
		//
		// 		expectMenu();
		// 		expectFeed();
		//
		// 	});
		// 	it('should load a different angular scope inside angular menu', function() {
		// 		browser.get('/app/#/menu/scope-diff-module');
		// 		// isClickable('paper-toolbar');
		//
		// 		expectMenu();
		// 		expectDiffScope();
		//
		// 	});
		// 	it('should load angular scope inside angular menu with different route', function() {
		// 		browser.get('/app/#/menu/scope-same-module');
		// 		// isClickable('paper-toolbar');
		//
		// 		expectMenu();
		// 		expectScope();
		//
		// 	});
		// 	it('should load angular feed inside angular scope inside angular menu', function() {
		// 		browser.get('/app/#/menu/scope-module/static-feed');
		// 		// isClickable('paper-toolbar');
		//
		// 		expectMenu();
		// 		expectScope();
		// 		expectFeed();
		//
		// 	});
		// });
		//
		//
		// describe('for repeated routes', function() {
		// 	// Varios modulos con repeticiones
		// 	for(var i=0; i<3; i++){
		// 		it('should load angular scope inside angular menu ('+i+')', function() {
		// 			browser.get('/app/#/menu/scope-module');
		// 			isPresent('.angularscope');
		// 			expectScope();
		//
		// 		});
		// 	}
		// 	for(var i=0; i<3; i++){
		// 		it('should load angular feed inside angular scope inside angular menu ('+i+')', function() {
		// 			browser.get('/app/#/menu/scope-module/static-feed');
		// 			isPresent('.angularstaticfeed');
		//
		// 			expectScope();
		// 			expectFeed();
		//
		// 		});
		// 	}
		// });
		//
		// describe('for multiple files in a module', function() {
		// 	it('should load angular simple directive', function() {
		// 		browser.get('/app/#/multiple-files');
		// 		isPresent('.multiplefiles');
		//
		// 		expectSimpledirective();
		//
		// 	});
		// });
		//
		// describe('for ads module', function() {
		// 	it('should load ads module', function() {
		// 		browser.get('/app/#/ads');
		// 		isPresent('div.ng-hide');
		//
		// 		expectAds();
		//
		// 	});
		// 	it('should load menu inside ads module', function() {
		// 		browser.get('/app/#/ads/menu');
		// 		isPresent('div.ng-hide');
		//
		// 		expectAds();
		// 		expectMenu();
		//
		// 	});
		//
		// 	it('should load angular scope inside menu, inside ads module', function() {
		// 		browser.get('/app/#/ads/menu/angular-scope');
		// 		isPresent('div.ng-hide');
		//
		// 		expectAds();
		// 		expectMenu();
		// 		expectScope();
		//
		// 	});
		// });
		//
		// describe('for translations', function() {
		// 	it('should load english translation', function() {
		// 		browser.get('/app/#/menu/translation');
		// 		isPresent('paper-button');
		//
		// 		expectEnglishTexts();
		//
		// 	});
		// 	it('should load and keep spanish translation', function() {
		// 		browser.get('/app/#/menu/translation');
		// 		isPresent('paper-button');
		//
		// 		element(by.css('paper-button')).click();
		// 		browser.get('/app/#/menu');
		// 		isPresent('paper-icon-button');
		// 		browser.get('/app/#/menu/translation');
		// 		isPresent('paper-button');
		// 		expectSpanishTexts();
		//
		// 		element(by.css('paper-button')).click();
		// 		element(by.css('paper-button')).click();
		// 		browser.get('/app/#/menu');
		// 		isPresent('paper-icon-button');
		// 		browser.get('/app/#/menu/translation');
		// 		isPresent('paper-button');
		// 		expectEnglishTexts();
		//
		// 	});
		//
		// });

		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function isClickable(selector) {
			var EC = protractor.ExpectedConditions;
			var menuelement = element(by.css(selector));
			browser.wait(EC.elementToBeClickable(menuelement), 10000);
		}
		function expectEnglishTexts() {
			expect(element(by.css('p.text1')).getInnerHtml()).toBe('First text');
			expect(element(by.css('p.text2')).getInnerHtml()).toBe('Second text');
			expect(element(by.css('p.text3')).getInnerHtml()).toBe('Third text');
			expect(element(by.css('p.text4')).getInnerHtml()).toBe('My name is: Noemal');
			// expectEnglishMenu();
		}
		function expectSpanishTexts() {
			expect(element(by.css('p.text1')).getInnerHtml()).toBe('Primer texto');
			expect(element(by.css('p.text2')).getInnerHtml()).toBe('Segundo texto');
			expect(element(by.css('p.text3')).getInnerHtml()).toBe('Tercero texto');
			expect(element(by.css('p.text4')).getInnerHtml()).toBe('Mi nombre es: Noemal');
			// expectSpanishMenu()
		}
		function expectAds() {
			expect(element(by.css('.bottom-ads > div > h3')).getInnerHtml()).toBe('fixed');
		}
		function expectSimpledirective() {
			expect(element(by.css('directivecompile p')).getInnerHtml()).toBe('P test');
			expect(element(by.css('directive')).getInnerHtml()).toBe('Element with personal scope');
		}
		function expectFilters() {
			expect(element(by.css('.filters span.info')).getInnerHtml()).toBe('Filterstest');
		}
		function expectMenu() {
			isPresent('paper-item');
			var EC = protractor.ExpectedConditions;
			var menuelement = element(by.css('paper-icon-button'));
			browser.wait(EC.elementToBeClickable(menuelement), 10000);
			menuelement.click();
			isPresent('paper-toolbar');
		}
		function expectFeed() {
			expect(element(by.css('.angularstaticfeed > span.info')).getInnerHtml()).toBe('Angular Static Feed Module');

			feedrows = element.all(by.css('.angularstaticfeed > p.item'));
			expect(feedrows.count()).toEqual(5);
		}
		function expectScope() {
			expect(element(by.css('.angularscope > span.info')).getInnerHtml()).toBe('Angular Scope Module');

			element(by.model('yourName')).sendKeys('test');
			expect(element(by.css('p.result')).getInnerHtml()).toBe('Hello test');
		}
		function expectDiffScope() {
			expect(element(by.css('.angularscope > span.info')).getInnerHtml()).toBe('Angular Different Scope Module');

			element(by.model('yourName')).sendKeys('test');
			expect(element(by.css('p.result')).getInnerHtml()).toBe('Hello test');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
