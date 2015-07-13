(function(){
	describe('loaderCommon', function() {

		var list;

		for(var i=0; i<2; i++){
			
			describe('should load a Jquery module ('+i+')' , function() {

				it('X', function() {
					browser.get('/app/#/x');

					list = element.all(by.css('h1'));
					expect(list.get(0).isPresent()).toBe(true);
					expect(list.get(0).getText()).toBe('Module X');

					list = element.all(by.css('h2'));
					expect(list.get(0).isPresent()).toBe(true);
					expect(list.get(0).getText()).toBe('Added by Jquery');
				});

				it('Y', function() {
					browser.get('/app/#/y');

					list = element.all(by.css('h1'));
					expect(list.get(0).isPresent()).toBe(true);
					expect(list.get(0).getText()).toBe('Module Y');

					list = element.all(by.css('h3'));
					expect(list.get(0).isPresent()).toBe(true);
					expect(list.get(0).getText()).toBe('new dinamic text');
				});

			});

			describe('should load a AngularJs module ('+i+')' , function() {

				it('angmodule', function() {
					browser.get('/app/#/angmodule');
					browser.wait(function() {
					    return $('p').isPresent(); // keeps waiting until this statement resolves to true
					}, 1000, 'message to log to console if element is not present after that time');
					expect($('p').isPresent()).toBe(true);

					list = element.all(by.css('p'));
					expect(list.get(0).getText()).toBe('URLqwdqw');
				});


				it('angmodule', function() {
					browser.get('/app/#/angmodule');
					browser.wait(function() {
					    return $('span').isPresent(); // keeps waiting until this statement resolves to true
					}, 3000, 'message to log to console if element is not present after that time');
					expect($('span').isPresent()).toBe(true);

					list = element.all(by.css('span'));
					expect(list.get(0).getText()).toBe('Custom module1');
				});
				it('angmodule2', function() {
					browser.get('/app/#/angmodule2');
					browser.wait(function() {
					    return $('span').isPresent(); // keeps waiting until this statement resolves to true
					}, 3000, 'message to log to console if element is not present after that time');
					expect($('span').isPresent()).toBe(true);

					list = element.all(by.css('span'));
					expect(list.get(0).getText()).toBe('Custom module2');
				});

				
				/*
				it('rssmodule2', function() {
					browser.get('/app/#/rssmodule2');
					browser.wait(function() {
					    return $('.item').isPresent(); // keeps waiting until this statement resolves to true
					}, 3000, 'message to log to console if element is not present after that time');
					expect($('.item').isPresent()).toBe(true);

					list = element.all(by.css('.item'));
					expect(list.count()).toBeGreaterThan(0);
				});
				it('rssmodule', function() {
					//Check for private mode in chrome
					browser.get('/app/#/rssmodule');
					browser.wait(function() {
					    return $('.item').isPresent(); // keeps waiting until this statement resolves to true
					}, 3000, 'message to log to console if element is not present after that time');
					expect($('.item').isPresent()).toBe(true);

					list = element.all(by.css('.item'));
					expect(list.count()).toBeGreaterThan(0);
				});
				*/

			});
		}


	});
}());