(function(){
	'use strict';
	console.log("BeforeDescribe");
	describe('loaderAngular', function() {
		console.log("InDescribe");
		beforeEach(module('king.loaders.common'));
		console.log("After-beforeEach");
	    it('should load a Angular module on the first call', function() {
	    	console.log("Inside IT");
	    	browser.get('http://localhost:8000/app/#/ang-module');
	    	expect(element(by.tagName('p')).getText()).toBe('URLqwdqw');
    		console.log(element(by.tagName('p')).getText());
	    });
	    console.log("LAST");
	});

}());



