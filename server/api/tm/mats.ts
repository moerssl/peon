//import { createInstance } from "~/utils/tradeskillmaster";
import { useTsm } from '~/utils/peon';
import { AhImporter } from '~/utils/AhImporter';

export default defineEventHandler(async (event) => { 
  const tsm = useTsm();
  const ah = new AhImporter();
  console.info("Accepted request")
  const resultPromise = tsm.getCommodities(2);

  const importPromise = resultPromise.then(result => {
  console.info("Received commodities")
    
    ah.importData(result)
  });
  console.info("set status code")

  //await Promise.all([resultPromise, importPromise]);
  setResponseStatus(event,202, 'Accepted')
  return "this is fine"; // HTTP Code accepted
});
