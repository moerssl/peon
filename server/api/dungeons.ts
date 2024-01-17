import { usePeon } from '~/utils/peon';
import bonuses from '~/public/bonuses.json'
import axios from 'axios';


export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // return query.name.toLowerCase()
  const apiUrl = 'https://raider.io/api/v1/characters/profile';

  const params = { 
    name: query.name?.toLowerCase() || "leyka", 
    realm: query.realm?.toLowerCase() || "ysera",
    region: query.region?.toLowerCase() || "eu",
    fields: 'mythic_plus_weekly_highest_level_runs,mythic_plus_scores_by_season:current,mythic_plus_previous_weekly_highest_level_runs'

  }

  const result = await axios.get(apiUrl, {
      params

  })

  return result.data

})