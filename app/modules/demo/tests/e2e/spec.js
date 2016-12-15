describe('demo controller', function() {
  beforeEach(function() {
    browser.driver.manage().window().setSize(400, 666);
    browser.get('http://localhost:9001/#/menu-abcd/demo');
  });

  it('should load module', function() {
    expect(element(by.css('.demo'))).toBeDefined();
  });
});
