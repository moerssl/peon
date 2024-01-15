import { wow } from 'blizzard.js'

let peonInstance: wow.WoWClient[] = {};
export const usePeon = async (locale='en_US') => {
  const runtimeConfig = useRuntimeConfig()
  console.log(locale)

  if (peonInstance[locale] == undefined) {
    peonInstance[locale] = await wow.createInstance({
      key: runtimeConfig.key,
      secret: runtimeConfig.secret,
      origin: 'eu', // optional
      locale: locale, // optional
      token: '', // optional
      
    })
  }
  // peonInstance.
  return peonInstance[locale];
}