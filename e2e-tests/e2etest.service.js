module.exports = {

  clickElement     : clickElement,
  wait             : wait,
  isPresent        : isPresent,
  correctImage     : correctImage,

  elementExist     : elementExist,
  checkElementToBe : checkElementToBe,
  checkUrl         : checkUrl
};

function checkUrl(urlToCheck) {
  return wait(500)
  .then(browser.getCurrentUrl)
  .then(function(url) {
      expect(url).toContain(urlToCheck);
  });
}

function clickElement(where) {
  return elementExist(where)
  .then($(where).click)
  .then(wait(500));
}

function wait(time) {
    return browser.driver.sleep(time);
}

function elementExist(element, time) {
    time = time || 5000;
    return browser.wait(function() {
      return $(element).isPresent();
    }, time, 'Main (' + element + ') is not present');
}

function isPresent(element, status) {
  expect(browser.isElementPresent(by.css(element))).toBe(status);
}

function checkElementToBe(elementId, value) {
  isPresent(elementId, true);
  element.all(by.css(elementId)).first().getText().then(function(text) {
    expect(text).toContain(value);
  });
}

function correctImage(elementId, expectedValue) {
  element.all(by.css(elementId)).first().getAttribute('src').then(function(value) {
    expect(value).toContain(expectedValue);
  });
}
