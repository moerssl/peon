import { usePeon } from '~/utils/peon';



export default defineEventHandler(async (event) => {
  const wowClient = await usePeon()

  const realm = await wowClient.realm({slug: "malorne"});

  return realm.data

  return wowClient.auctionHouse({ id: 1097 })



})