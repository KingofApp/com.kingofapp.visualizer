module.exports = {

  clickElement         : clickElement,
  wait                 : wait,
  isPresent            : isPresent,
  correctImage         : correctImage,
  checkAriaPressedToBe : checkAriaPressedToBe,
  checkStyleToContain  : checkStyleToContain,
  checkElementToBe     : checkElementToBe,
  checkElementToExist  : checkElementToExist,
  elementExist         : elementExist,
  checkUrl             : checkUrl,
  setValue             : setValue
};

function checkAttributeToContain(elementId, valueExpected, attribbute, toContain) {
  elementExist(elementId);
  element.all(by.css(elementId)).first().getAttribute(attribbute).then(function(value) {
    (toContain) ? expect(value).toContain(valueExpected) : expect(value).not.toContain(valueExpected);
  });
}

function checkElementToBe(elementId, valueExpected) {
  isPresent(elementId, true);
  element.all(by.css(elementId)).first().getText().then(function(text) {
    expect(text).toBe(valueExpected);
  });
}

function checkStyleToContain(elementId, valueExpected, toContain) {
  checkAttributeToContain(elementId, valueExpected, 'style', toContain);
}

function checkAriaPressedToBe(elementId, valueExpected, toContain) {
  checkAttributeToContain(elementId, valueExpected, 'aria-pressed', toContain);
}


function checkElementToExist(elementId, attribute, toExist) {
  isPresent(elementId, true);
  element.all(by.css(elementId)).first().getAttribute(attribute).then(function(value) {
    (toExist) ? expect(value).toBeTruthy() : expect(value).toBeFalsy();
  });
}


function checkUrl(urlToCheck) {
  return wait(500)
  .then(browser.getCurrentUrl)
  .then(function(url) {
      expect(url).toContain(urlToCheck);
  });
}

function clickElement(where) {
  return elementExist(where)
  .then(element.all(by.css(where)).first().click)
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

function correctImage(elementId, expectedValue) {
  element.all(by.css(elementId)).first().getAttribute('src').then(function(value) {
    expect(value).toContain(expectedValue);
  });
}

function setValue(elementName, elementValue, clear) {
  isPresent(elementName, true);
  if (clear) element(by.css(elementName)).clear();
  element(by.css(elementName)).sendKeys(elementValue);
}
