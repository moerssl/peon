//import { createInstance } from "~/utils/tradeskillmaster";
import { useTsm } from '~/utils/peon';

export default defineEventHandler(async (event) => { 
  const instance = useTsm()
  
  const result = await instance.getRegions()
  return result;
})