(function() {
  describe('loaderCommon', function() {

    var list;
    beforeEach(function() {
      browser.driver.manage().window().setSize(1124, 850);
      browser.ignoreSynchronization = true;
    });

    for (var i = 0; i < 1; i++) {

      // describe('should load a Jquery module ('+i+')' , function() {
      //
      // 	it('X', function() {
      //
      // 		browser.get('/app/#/x');
      // 		browser.wait(function() {
      // 	   		return $('h1').isPresent(); // keeps waiting until this statement resolves to true
      // 		}, 5000, 'message to log to console if element is not present after that time');
      //
      // 		list = element.all(by.css('h1'));
      // 		expect(list.get(0).isPresent()).toBe(true);
      // 		expect(list.get(0).getText()).toBe('Module X');
      // 		list = element.all(by.css('h2'));
      // 		expect(list.get(0).isPresent()).toBe(true);
      // 		expect(list.get(0).getText()).toBe('Added by Jquery');
      // 	});
      //
      // 	it('Y', function() {
      //
      // 		browser.get('/app/#/y');
      // 		browser.wait(function() {
      // 	   		return $('h1').isPresent(); // keeps waiting until this statement resolves to true
      // 		}, 5000, 'message to log to console if element is not present after that time');
      //
      // 		list = element.all(by.css('h1'));
      // 		expect(list.get(0).isPresent()).toBe(true);
      // 		expect(list.get(0).getText()).toBe('Module Y');
      //
      // 		list = element.all(by.css('h3'));
      // 		expect(list.get(0).isPresent()).toBe(true);
      // 		expect(list.get(0).getText()).toBe('new dinamic text');
      // 	});
      //
      // 	it('youtube1', function() {
      //
      // 		browser.get('/app/#/youtube');
      // 		browser.wait(function() {
      // 	   		return $('iframe').isPresent(); // keeps waiting until this statement resolves to true
      // 		}, 5000, 'message to log to console if element is not present after that time');
      //
      // 		list = element(by.css('iframe'));
      // 		expect(list.isPresent()).toBe(true);
      // 		list.getAttribute("src").then( function(attr){
      // 			expect(attr).toBe('https://www.youtube.com/embed/k1eKW37q8Fo');
      // 		});
      // 	});
      //
      // 	it('youtube2', function() {
      //
      // 		browser.get('/app/#/youtube2');
      // 		browser.wait(function() {
      // 	   		return $('iframe').isPresent(); // keeps waiting until this statement resolves to true
      // 		}, 5000, 'message to log to console if element is not present after that time');
      //
      // 		list = element(by.css('iframe'));
      // 		expect(list.isPresent()).toBe(true);
      // 		list.getAttribute("src").then( function(attr){
      // 			expect(attr).toBe('https://www.youtube.com/embed/L0ReUkIA7F4');
      // 		});
      // 	});
      //
      // });

      // describe('should load a AngularJs module ('+i+')' , function() {
      //
      // 	it('should load angular menu', function() {
      // 		browser.get('/app/#/menu1');
      // 		browser.wait(function() {
      // 		    return $('menu').isPresent(); // keeps waiting until this statement resolves to true
      // 		}, 5000, 'message to log to console if element is not present after that time');
      // 		expect($('menu').isPresent()).toBe(true);
      //
      // 		list = element.all(by.css('p.info'));
      // 		expect(list.get(0).getInnerHtml()).toBe('Module X');
      // 	});
      //
      //
      // 	// it('angmodule', function() {
      // 	// 	browser.get('/app/#/angmodule');
      // 	// 	browser.wait(function() {
      // 	// 	    return $('span').isPresent(); // keeps waiting until this statement resolves to true
      // 	// 	}, 5000, 'message to log to console if element is not present after that time');
      // 	// 	expect($('span').isPresent()).toBe(true);
      // 	//
      // 	// 	list = element.all(by.css('span'));
      // 	// 	expect(list.get(0).getText()).toBe('Custom module1');
      // 	// });
      // 	//
      // 	// it('angmodule2', function() {
      // 	// 	browser.get('/app/#/angmodule2');
      // 	// 	browser.wait(function() {
      // 	// 	    return $('span').isPresent(); // keeps waiting until this statement resolves to true
      // 	// 	}, 5000, 'message to log to console if element is not present after that time');
      // 	// 	expect($('span').isPresent()).toBe(true);
      // 	//
      // 	// 	list = element.all(by.css('span'));
      // 	// 	expect(list.get(0).getText()).toBe('Custom module2');
      // 	// });
      //
      //
      // 	/*
      // 	it('rssmodule2', function() {
      // 		browser.get('/app/#/rssmodule2');
      // 		browser.wait(function() {
      // 		    return $('.item').isPresent(); // keeps waiting until this statement resolves to true
      // 		}, 5000, 'message to log to console if element is not present after that time');
      // 		expect($('.item').isPresent()).toBe(true);
      //
      // 		list = element.all(by.css('.item'));
      // 		expect(list.count()).toBeGreaterThan(0);
      // 	});
      // 	it('rssmodule', function() {
      // 		//Check for private mode in chrome
      // 		browser.get('/app/#/rssmodule');
      // 		browser.wait(function() {
      // 		    return $('.item').isPresent(); // keeps waiting until this statement resolves to true
      // 		}, 5000, 'message to log to console if element is not present after that time');
      // 		expect($('.item').isPresent()).toBe(true);
      //
      // 		list = element.all(by.css('.item'));
      // 		expect(list.count()).toBeGreaterThan(0);
      // 	});
      // 	*/
      //
      //
      // });
    }
    afterEach(function() {
      browser.ignoreSynchronization = false;
    });
  });
}());
