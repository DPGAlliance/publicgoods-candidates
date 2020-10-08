/*
 * This file was used on Jan 10, 2020 to convert most nominee files in bulk
 * The 'license' field was migrated from a simple array to an array of objects
 * where each object has the property 'spdx' and the 'link' for that license.
 *
 * This script was executed inside the nominees/ folder with the following command:
 * node ../scripts/migrate-v0.1.0.js 
 *
 * Files that had at the time more than one license were modified manually
 */

const fs = require('fs');
const glob = require('glob');

const path = './';

// scan for all json files in path
glob(path + '*.json', {}, async (err, files) => {

  // for each file in the set do as follows
  for (let i=0; i<files.length; i++) {

    // read data from the file
    let jsonData = fs.readFileSync(files[i], 'utf8', function (err) {
      if (err) {
          console.log("An error occured while reading JSON Object from file: "+files[i]);
          return console.log(err);
      }
    });

    // Parse JSON object from data
    var jsonObject = JSON.parse(jsonData);

    // move SDGs array of enum of object to a different array of objects
    for (let k=0; k<jsonObject['SDGs'].length; k++) {        
        jsonObject['SDGs'][k] = {
            SDGNumber: jsonObject['SDGs'][k][0],
        }
    }

    // as an interim solution, move SDGevidence into all SDG entries. Human review will follow
    if(jsonObject.hasOwnProperty('SDGevidence')) {
        for (let k=0; k<jsonObject['SDGs'].length; k++) {
            jsonObject['SDGs'][k]['evidenceText'] = jsonObject['SDGevidence']
        }
        delete jsonObject['SDGevidence']
    }

    // Write the JSON object back to the file
    fs.writeFile(files[i], JSON.stringify(jsonObject, null, 2) + "\n", 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object from file: "+files[i]);
          return console.log(err);
      }
    });

  }
  console.log(files.length + ' file(s) updated.');
});

