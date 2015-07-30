(function(){
	describe('Angular modules test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(1124, 850);
		    browser.ignoreSynchronization = true;
		});
    // NOTE: Angular tests
		// * Estructurar un poco los nombres de modulos y el structureService
		// * angular-scope
		// * angular-menu
		// * angular-staticfeed
		// /menu
		// /menu/scope-module
		// /menu/scope-diff-module
		// /menu/scope-same-module
		// /menu/scope-module/static-feed
		// /menu/level1-feed
		// *************************************************************************************
    // * Carga de modulos con el mismo nombre que la carpeta del modulo
    // * Carga de modulos con nombre diferente a la carpeta de modulo
		// * Carga mismo modulo diferentes paths
    // * Carga de modulos 2 niveles (Cada uno carga su titulo y sus funciones van)
    // * Carga de modulos 3 niveles (Cada uno carga su titulo y sus funciones van)
    // * Interaccion modulos de 2 niveles scope send texts
    // * Interaccion modulos de 3 niveles scope send texts
    // * Interaccion modulo simple con el mismo nombre que la carpeta del modulo
    // * Interaccion modulo simple con diferente nombre que la carpeta del modulo
    // * Alternancia entre rutas repetidas N veces
    // *
    // *
    // *
	// describe('should load a AngularJs module ('+i+')' , function() {
		function expectMenu() {
			expect($('menu').isPresent()).toBe(true);
			list = element.all(by.css('.angularmenu > span.info'));
			expect(list.get(0).getInnerHtml()).toBe('Angular Menu Module');
		}
		function expectFeed() {
			list = element.all(by.css('.angularstaticfeed > span.info'));
			expect(list.get(0).getInnerHtml()).toBe('Angular Static Feed Module');
		}
		function expectScope() {
			list = element.all(by.css('.angularscope > span.info'));
			expect(list.get(0).getInnerHtml()).toBe('Angular Scope Module');

			element(by.model('yourName')).sendKeys('test');
			expect(element.all(by.css('p.result')).get(0).getInnerHtml()).toBe('Hello test');
		}

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
		});

		describe('for repeated routes', function() {
			it('should load angular scope inside angular menu', function() {
				browser.get('/app/#/menu/scope-module');
				browser.wait(function() {
						return $('.angularscope').isPresent(); // keeps waiting until this statement resolves to true
				}, 5000, 'message to log to console if element is not present after that time');

				expectMenu();

				expectScope();
			});
		});

// Varios modulos con repeticiones


		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
