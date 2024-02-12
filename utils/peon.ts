import { wow } from 'blizzard.js';
import { TradeSkillMasterAPI } from '~/utils/TradeSkillMasterAPI'

let peonInstance: wow.WoWClient[] = {};
let tsmInstance: TradeSkillMasterAPI;
const runtimeConfig = useRuntimeConfig()

export const usePeon = async (locale='en_US') => {
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

export const useTsm = () => {
  if (tsmInstance == undefined) {
    tsmInstance = new TradeSkillMasterAPI(runtimeConfig.tsm)
  }

  return tsmInstance;
}