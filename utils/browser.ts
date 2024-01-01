import puppeteer from 'puppeteer'


let browser;
export const useBrowser = async () => {


  if (browser == undefined) {
    browser = await puppeteer.launch({headless: "new", args: ['--lang=en-US,en']});

  }
  // peonInstance.
  return browser;
}