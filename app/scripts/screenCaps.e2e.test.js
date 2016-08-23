(function() {
  describe('App Screens', function() {
    beforeEach(function() {
      browser.driver.manage().window().setSize(340, 850);
      browser.ignoreSynchronization = true;
    });
    describe('TEST', function() {

      it('X', function() {
        browser.get('#/menu-abcd/home-abcd');
        browser.wait(function() {
          return $('h1').isPresent(); // keeps waiting until this statement resolves to true
        }, 10000, 'message to log to console if element is not present after that time');

      });


    });
    afterEach(function() {
      browser.ignoreSynchronization = false;
    });
  });
}());
