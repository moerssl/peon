import { wow } from 'blizzard.js'

let peonInstance: wow.WoWClient
export const usePeon = async () => {
  const runtimeConfig = useRuntimeConfig()


  if (peonInstance == undefined) {
    peonInstance = await wow.createInstance({
      key: runtimeConfig.key,
      secret: runtimeConfig.secret,
      origin: 'eu', // optional
      locale: 'en_US', // optional
      token: '', // optional
      
    })
  }
  // peonInstance.
  return peonInstance;
}