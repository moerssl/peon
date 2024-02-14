//import { createInstance } from "~/utils/tradeskillmaster";
import { useTsm } from '~/utils/peon';
import { AhImporter } from '~/utils/AhImporter';
import { defineCronHandler } from '#nuxt/cron'

export default defineCronHandler(() => '10 * * * *', async () => {
  const tsm = useTsm();
  const ah = new AhImporter();
  console.info("Accepted request")
  const result = await tsm.getCommodities(2);
  console.info("start import")
  ah.importData(result)
  console.info("finished import")

  return;
}, { runOnInit: false});
