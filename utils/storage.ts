import fs from 'fs';

export const saveJson = (content, filename) => {
  const jsonData = JSON.stringify(content);

  // return jsonData;
  try {
    
  
    fs.writeFile(`./public/gear/${filename}`, jsonData, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
      console.log('Data has been stored in data.json');
      return "Loift"
    });
  } catch (error) {
      
  }
}

export const readJson = (filename: string) => {
  const filePath = `./public/gear/${filename}`;
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          console.error(parseError);
          reject(parseError);
        }
      });
    } else {
      console.log('File does not exist 3', filename);
      resolve(undefined);
    }
  });
}

