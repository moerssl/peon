import axios from 'axios';
import { JSDOM } from 'jsdom';
import got from 'got';

export default defineEventHandler(async (event) => {
  const url = 'https://www.wowhead.com/de/guide/classes/evoker/augmentation/bis-gear';

  // const url = "https://www.jonas-k.me/articles/";
  let articles = []
  try {

    return new Promise((resolve, reject) => {
      got(url).then(response => {
        const options = {
          url: url,
          resources: 'usable',
          runScripts: 'dangerously',
        }
        const dom = new JSDOM(response.body, options);

        dom.window.document.addEventListener('DOMContentLoaded', () => {
          // We need to delay one extra turn because we are the first DOMContentLoaded listener,
          // but we want to execute this code only after the second DOMContentLoaded listener
          // (added by external.js) fires.
          setImmediate(() => {
            // console.log(dom.window.document.body.children.length) // Expecting to see `1`
            // console.log(dom.window.document.body.innerHTML) // Expecting to see `<h1>Hello world</h1>`

            const selector = dom.window.document.querySelectorAll(".grid tbody tr td");
        
            [...selector].forEach((article) => {
              articles.push(article.textContent);
            });
            resolve(articles)
          });
        });


      }).catch(err => {
        console.log(err);
        reject(err)
      });
    })
    
    

  } catch (error) {
    return error
  }
})
