import { usePeon } from '~/utils/peon';
import bonuses from '~/public/bonuses.json'


export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // return query.name.toLowerCase()
  const peon = await usePeon()
  const lang = query.lang.toLowerCase()
  let locale = "de_DE"
  if (lang == "en") {
    locale = "en_US"
  }

  const equipment = await peon.characterEquipment(
    { 
      name: query.name?.toLowerCase() || "leyka", 
      realm: query.realm?.toLowerCase() || "ysera",
      region: query.region?.toLowerCase() || "eu",
      namespace: "eu-profile",
      locale
    })
  

  const profile = await peon.characterProfile({ 
    name: query.name?.toLowerCase() || "leyka", 
    realm: query.realm?.toLowerCase() || "ysera",
    region: query.region?.toLowerCase() || "eu",
    namespace: "eu-profile",
    locale: "en_US"
  })

  const translation =  await peon.characterProfile({ 
    name: query.name?.toLowerCase() || "leyka", 
    realm: query.realm?.toLowerCase() || "ysera",
    region: query.region?.toLowerCase() || "eu",
    namespace: "eu-profile",
    locale
  })


equipment.data.equipped_items.forEach((item) => {
  
  const itemBonuses = item?.bonus_list?.map((bonusId) => {
    return bonuses[bonusId];
  });
  
  // Add the itemBonuses to the item object
  const upgrade = itemBonuses?.filter(item => item != null && item.upgrade != undefined)

  if (upgrade != undefined && upgrade.length > 0) {
    item.upgrade = upgrade[0].upgrade
  }
});


  return Object.assign(profile.data, equipment.data, { translation: translation.data });
})