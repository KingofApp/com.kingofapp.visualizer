
	describe('loaderAngular', function() {

		//beforeEach(module('king.loaders.common'));

		it('should load a Angular module on the first call', function() {
			browser.get('/app/#/angmodule');
			expect(element(by.css('p')).getText()).toBe('URLqwdqw');
		});

		it('should load a Angular module on the second call', function() {
			browser.get('/app/#/rssmodule');
			expect(element(by.css('p')).getText()).toBe('URLqwdqw');
		});

	});
