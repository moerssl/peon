import puppeteer from 'puppeteer'
import { saveJson, readJson } from '~/utils/storage';
import { useBrowser } from '~/utils/browser';




export default defineEventHandler(async (event) => {
  let res = event.res
  const year = 31536000
  const maxage = 60 * 60 * 24
  const url = event.req.url
  const lang = "--lang=en-US,en"
  // const lang = "--lang=de-DE,de"
 
  //res.setHeader('Cache-Control', `max-age=${maxage} s-maxage=${maxage}`);






    const query = getQuery(event)
    const langSlot = query.langslot || "en-US";
    const folder = langSlot.substring(0,2)
    const browserLang = `--lang=${langSlot},${folder}`
    let wowHeadLang = `${folder}/`;
    if (folder == "en") {
      wowHeadLang = "";
    }

    const playedClass = query.playedclass.toLowerCase().replace(" ", "-").replace("%20", "-")
    const spec = query.spec.toLowerCase().replace("%20", "-").replace(" ", "-")
    const force = query.force;

    const jsonFileName = `${folder}/${playedClass}_${spec}.json`
    const storedBisGear = await readJson(jsonFileName)

    if (storedBisGear != undefined && !force) {
      return storedBisGear;
    }

    console.log(jsonFileName, "not found, request wowhead")
    console.log("----")
    console.log(storedBisGear)
    console.log("----")
    

    // Launch a headless browser
    const browser = await puppeteer.launch({headless: "new", args: [lang]});
    const page = await browser.newPage();

 
  
    // Load the target website
    await page.goto(`https://www.wowhead.com/${wowHeadLang}guide/classes/${playedClass}/${spec}/bis-gear`, { waitUntil: 'networkidle0' });
  
    // Wait for the page to load and execute JavaScript
    // await page.waitForSelector('.grid');
  
    const gear = await page.evaluate(() => {
      let results: Array<any> = [];

      const rows = document.querySelectorAll('.grid tbody tr');

      rows.forEach((row) => {
        const rowData = {};
        const columns = row.querySelectorAll('td');
        const links = row.querySelectorAll('a');


        //rowData["itemid"] = row.querySelectorAll('a')[0].getAttribute('href').split("/")[1];
        if (columns[0].innerText != "Slot" ) {
          let rowLinks = []
          rowData["slot_tier"] = columns[0].innerText;

          rowData["item"] = columns[1].innerText;
          // rowData["itemid"] = links[0]; //.getAttribute('href').split("/")[1];
          rowData["source"] = columns[2].innerText;
          

          links.forEach(async url => {
            const href = url.getAttribute("href")
            const text = url.outerText
            rowLinks.push({
              name,
              href
            })
            // Regular expression to match the item number
            const regex = /\/item=(\d+)\//;
            const match = href.match(regex);
            if (match) {
              rowData["itemid"] = match[1];
              rowData["item_link"] = href
            } else {
              rowData["source_link"] = href

            }
           

          })

          // rowData["lnks"] = rowLinks;
          const itemIndex = results.findIndex(item => item.itemid == rowData["itemid"])
          if (itemIndex == -1) {
            results.push(rowData)

          }
        }
      })

      return results
    })

 
    // Close the browser when done
    await browser.close();
    saveJson(gear, jsonFileName)
    return gear;
  //})();
  



})