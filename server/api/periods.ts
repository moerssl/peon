

import axios from 'axios';


export default defineEventHandler(async (event) => {
  const apiUrl = 'https://raider.io/api/v1/periods';
  const result = await axios.get(apiUrl)

  return result.data

})