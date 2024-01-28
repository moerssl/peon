

import axios from 'axios';


export default defineEventHandler(async (event) => {
  const apiUrl = 'https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=de';
  const result = await axios.get(apiUrl)

  return result.data

})