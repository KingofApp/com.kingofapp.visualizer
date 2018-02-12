const fs         = require('fs');
const shell      = require('shelljs');
const sharp      = require('sharp');
const config     = require('./screenCaps.config.json');
const paths      = require('./screenCaps.paths.json').paths;
const platform   = config.platform;
const dimensions = config.dimensions;
const puppeteer  = require('puppeteer');

(async () => {
  const baseUrl = 'http://localhost:9001/#';
  let browser, page;
  
  for (let path in paths) {
    console.log(`${baseUrl+paths[path]}`);

    try {
      browser     = await puppeteer.launch();
      page        = await browser.newPage();
      await page.goto(`${baseUrl+paths[path]}`);
      await page.waitForNavigation({
        waitUntil: 'networkidle0'
      });
    } catch(e) {
      console.log(e);
    }

    for (let dimension in dimensions) {
      try {
        await page.setViewport(dimensions[dimension]);
        await page.screenshot({path: `./screenshots/${dimension}-${Number(path)+1}.jpg`});
      } catch(e) {
        console.log(e);
      }
    }

    await browser.close();
  }
})();