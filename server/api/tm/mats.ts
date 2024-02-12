//import { createInstance } from "~/utils/tradeskillmaster";
import { useTsm } from '~/utils/peon';
import { AhImporter } from '~/utils/AhImporter';

export default defineEventHandler(async (event) => { 
  const tsm = useTsm();
  const ah = new AhImporter();

  const resultPromise = tsm.getCommodities(2);
  const importPromise = resultPromise.then(result => ah.importData(result));

  //await Promise.all([resultPromise, importPromise]);
  setResponseStatus(event,202, 'Accepted')
  return; // HTTP Code accepted
});
