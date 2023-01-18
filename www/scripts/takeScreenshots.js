const fs         = require('fs');
const shell      = require('shelljs');
const config     = require('./screenCaps.config.json');
const paths      = require('./screenCaps.paths.json').paths;
const platform   = config.platform;
const dimensions = config.dimensions;
const puppeteer  = require('puppeteer');
const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const baseUrl = 'http://localhost:9001/#';
  let browser, page;

  for (let path in paths) {
    try {
      browser = await puppeteer.launch();
      page    = await browser.newPage();
      await page.goto(`${baseUrl+paths[path]}`);
      await page.waitForSelector("#app");
      
      //when embed module
      if(paths[path].includes("embed")){
        await page.waitForSelector("#iframetest");
        await delay(2000);
      }
      
      //when html module
      if(paths[path].includes("superhtml")){
        await page.waitForSelector(".superhtml");
        await delay(500);
      }
      
    } catch(e) {
      console.log("Navigation ERROR", e);
    }

    for (let dimension in dimensions) {
      try {
        await page.setViewport(dimensions[dimension]);
        await page.screenshot({ path: `./screenshots/${dimension}-${Number(path)+1}.jpg` });
      } catch(e) {
        console.log(e);
      }
    }
   
    await browser.close();
    
  }
})();
