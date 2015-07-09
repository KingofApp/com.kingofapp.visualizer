(function(){
	'use strict';
	describe('loaderAngular', function() {

		beforeEach(module('king.loaders.common'));

	    it('should load a Angular module on the first call', function() {
			/*
			beforeEach(function(){
			});
			*/
			console.log("Entra aqui");
			browser.get('/app/#/angmodule');

	    	//expect(element(by.tagName('p')).getText()).toBe('URLqwdqw');
    		//console.log(element(by.tagName('p')).getText());
	    });

	});

}());