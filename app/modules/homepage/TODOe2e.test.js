(function(){
	describe('Text Module test', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(379, 666);
		    browser.ignoreSynchronization = true;
		});
		// Entro, compruebo el cambio slider, veo que carga otro
		// Clicko en el Read More
		// Valido que carga el contenido
		// Pincho en el menu y vuelvo para el home
		// compruebo el cambio de slider.
		//
		it('should load text module', function() {
			browser.get('/app/#/menu/text');
			isPresent('.text');

			expectmodule();

		});
		function isPresent(selector) {
			browser.wait(function() {
					return $(selector).isPresent();
			}, 6000, 'Main (' + selector + ') not present');
		}
		function expectmodule() {
			expect(element(by.css('.text p')).getInnerHtml()).toBe('Text phrase');
		}

		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
