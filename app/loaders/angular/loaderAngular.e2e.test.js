(function(){
	describe('loaderJquery', function() {
		describe('should load a Jquery', function() {
			it('h1 title and content', function() {
				browser.get('/app/#/x');
				var list = element.all(by.css('h1')); //lee los h1
				expect(list.count()).toBe(1); //se espera un unico h1
				expect(list.get(0).getText()).toBe('Module X'); //el contenido de dicho h1 es "Module X"
			});

			it('text dinamically', function() {
				browser.get('/app/#/x');
				var list = element.all(by.css('h2')); //lee los h2
				expect(list.count()).toBe(1); //se espera un unico h2
				expect(list.get(0).getText()).toBe('Added by Jquery'); //el contenido de dicho h2 es "Added by Jquery"
			});
		});
	});
}());