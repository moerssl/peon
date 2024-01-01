import fs from 'fs';
import { saveJson, readJson } from '~/utils/storage';

export default defineEventHandler(async (event) => {
  const fileContent = {
    bla: "blug",
    narf: 37,
    brain: {
      weltherrschaft: 0,
      plan: [{
        name: "a",
        subject: "Pinky"
      },
    
      {
        name: "b",
        subject: "Brain"
      },]
    }
  }

  const filename = "evoker-devastati.json";
  const bis = await readJson(filename)
  if (bis == undefined) {
    saveJson(fileContent,filename)
    return "saved new file"
  } else {
    return bis;
  }
})