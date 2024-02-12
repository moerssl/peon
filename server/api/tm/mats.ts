//import { createInstance } from "~/utils/tradeskillmaster";
import { useTsm } from '~/utils/peon';
import {AhImporter } from '~/utils/AhImporter';

export default defineEventHandler(async (event) => { 
  const instance = useTsm()
  const ah = new AhImporter();
  
  const result = await instance.getCommodities(2)
  ah.importData(result)


  return result;
})