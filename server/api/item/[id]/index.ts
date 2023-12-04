import { usePeon } from '~/utils/peon';



export default defineEventHandler(async (event) => {
  const peon = await usePeon()
  const id = event.context.params.id || 'O';


  const item = await peon.item({ id })

  /*
  const char = await peon.characterEquipment(
    { 
      name: "echskalibur", 
      realm: "malorne",
      region: "eu",
      namespace: "eu-profile" 
    })

    */
  return item.data;
})