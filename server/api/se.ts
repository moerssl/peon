import axios from "axios";
import flip from "@/public/ah/flip.json"

const enrich = data => {
  // Find the lowest listing_price_level.from_price_level
const lowestPriceLevel = Math.min(...data.map(item => item.flip_price_levels[0].listing_price_level.from_price_level));

// Sort the array based on the condition
data.sort((a, b) => {
  if (a.avg_price >= lowestPriceLevel && b.avg_price < lowestPriceLevel) {
    return -1;
  } else if (a.avg_price < lowestPriceLevel && b.avg_price >= lowestPriceLevel) {
    return 1;
  } else {
    return 0;
  }
});

// Add "above_avg" property to items with avg_price lower than lowestPriceLevel
data.forEach(item => {
  if (item.avg_price < lowestPriceLevel) {
    item.above_avg = true;
  }
});

return data;
}

export default defineEventHandler(async (event) => { 
  //return flip;
  try {
    // Construct the payload for saddlebagexchange.com
    const formData = {
      itemClass: -1,
      itemSubClass: -1,
      itemQuality: 1,
      desiredAvgPrice: 100,
      desiredSalesPerDay: 40,
      desiredSellPrice: 40,
      desiredPriceIncrease: 20,
      flipRiskLimit: 3,
      underMarketPricePercent: 0,
      overMarketPricePercent: 0,
      region: 'EU',
      homeRealmId: '1097---Malorne'
    };

    // Convert formData to query string (optional if not already in that format)
    const payload = new URLSearchParams(formData).toString();

    // Send a request to saddlebagexchange.com
    const url = 'https://saddlebagexchange.com/wow/shortages/commodities?_data=routes%2Fwow.shortages.commodities';

    const result = await axios.post(url, payload, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
    })
    console.log(result)
    return enrich(result.data.increase);
  } catch (e) {
    return e
  }
})
