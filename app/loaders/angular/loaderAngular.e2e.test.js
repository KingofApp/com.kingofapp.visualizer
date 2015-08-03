(function(){
	describe('Angular modules test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(1124, 850);
		    browser.ignoreSynchronization = true;
		});
    // NOTE: Angular tests
		// * angular-scope
		// * angular-menu
		// * angular-staticfeed
		// /menu
		// /menu/scope-module
		// /menu/scope-diff-module
		// /menu/scope-same-module
		// /menu/scope-module/static-feed
		// /menu/level1-feed

		describe('for simple modules', function() {
			it('should load angular menu', function() {
				browser.get('/app/#/menu');
				browser.wait(function() {
						return $('.angularmenu').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectMenu();

			});

			it('should load angular scope', function() {
				browser.get('/app/#/scope');
				browser.wait(function() {
						return $('.angularscope').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectScope();

			});

			it('should load angular feed', function() {
				browser.get('/app/#/feed');
				browser.wait(function() {
						return $('.angularstaticfeed').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectFeed();

			});

		});

		describe('for multi-level modules', function() {
			it('should load angular scope inside angular menu', function() {
				browser.get('/app/#/menu/scope-module');
				browser.wait(function() {
						return $('.angularscope').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectMenu();
				expectScope();

			});
			it('should load angular feed inside angular menu', function() {
				browser.get('/app/#/menu/level1-feed');
				browser.wait(function() {
						return $('.angularstaticfeed').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectMenu();
				expectFeed();

			});
			it('should load a different angular scope inside angular menu', function() {
				browser.get('/app/#/menu/scope-diff-module');
				browser.wait(function() {
						return $('.angularscope').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectMenu();
				expectDiffScope();

			});
			it('should load angular scope inside angular menu with different route', function() {
				browser.get('/app/#/menu/scope-same-module');
				browser.wait(function() {
						return $('.angularscope').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectMenu();
				expectScope();

			});
			it('should load angular feed inside angular scope inside angular menu', function() {
				browser.get('/app/#/menu/scope-module/static-feed');
				browser.wait(function() {
						return $('.angularstaticfeed').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectMenu();
				expectScope();
				expectFeed();

			});
		});

		describe('for repeated routes', function() {
			// Varios modulos con repeticiones
			for(var i=0; i<3; i++){
				it('should load angular scope inside angular menu ('+i+')', function() {
					browser.get('/app/#/menu/scope-module');
					browser.wait(function() {
							return $('.angularscope').isPresent(); // keeps waiting until this statement resolves to true
					}, 5000, 'message to log to console if element is not present after that time');

					expectMenu();
					expectScope();

				});
			}
			for(var i=0; i<3; i++){
				it('should load angular feed inside angular scope inside angular menu ('+i+')', function() {
					browser.get('/app/#/menu/scope-module/static-feed');
					browser.wait(function() {
							return $('.angularstaticfeed').isPresent(); // keeps waiting until this statement resolves to true
					}, 5000, 'message to log to console if element is not present after that time');

					expectMenu();
					expectScope();
					expectFeed();

				});
			}
		});

		function expectMenu() {
			expect($('menu').isPresent()).toBe(true);
			element(by.css('.statusBar button')).click();
			list = element.all(by.css('.angularmenu > span.info'));
			expect(list.get(0).getInnerHtml()).toBe('Angular Menu Module');
		}
		function expectFeed() {
			list = element.all(by.css('.angularstaticfeed > span.info'));
			expect(list.get(0).getInnerHtml()).toBe('Angular Static Feed Module');

			feedrows = element.all(by.css('.angularstaticfeed > p.item'));
			expect(feedrows.count()).toEqual(5);
		}
		function expectScope() {
			list = element.all(by.css('.angularscope > span.info'));
			expect(list.get(0).getInnerHtml()).toBe('Angular Scope Module');

			element(by.model('yourName')).sendKeys('test');
			expect(element.all(by.css('p.result')).get(0).getInnerHtml()).toBe('Hello test');
		}
		function expectDiffScope() {
			list = element.all(by.css('.angularscope > span.info'));
			expect(list.get(0).getInnerHtml()).toBe('Angular Different Scope Module');

			element(by.model('yourName')).sendKeys('test');
			expect(element.all(by.css('p.result')).get(0).getInnerHtml()).toBe('Hello test');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
