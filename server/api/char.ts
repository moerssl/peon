import { usePeon } from '~/utils/peon';



export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // return query.name.toLowerCase()
  const peon = await usePeon()

  const char = await peon.characterEquipment(
    { 
      name: query.name?.toLowerCase() || "leyka", 
      realm: query.realm?.toLowerCase() || "ysera",
      region: query.region?.toLowerCase() || "eu",
      namespace: "eu-profile",
      locale: "en_US" 
    })
  const profile = await peon.characterProfile({ 
    name: query.name?.toLowerCase() || "leyka", 
    realm: query.realm?.toLowerCase() || "ysera",
    region: query.region?.toLowerCase() || "eu",
    namespace: "eu-profile",
    locale: "en_US"
  })
  return Object.assign(profile.data, char.data);
})