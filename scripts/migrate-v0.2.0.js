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

const path = '';
var records = 0;

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

    // Check for deprecated field
    if(jsonObject.hasOwnProperty('license_link')) {
      // Make sure object property exists, and there is only one element, otherwise handle manually
      if(jsonObject.hasOwnProperty('license') && jsonObject['license'].length == 1) {
        // Check we have not processed this file already
        if(!jsonObject['license'].hasOwnProperty('spdx')) {

          // Create new object
          const tmpObj = { 'spdx': jsonObject['license'][0], 'link': jsonObject['license_link']};

          // Make sure we are dealing with an array, and store object as its first element
          jsonObject['license'] = [];
          jsonObject['license'][0] = tmpObj;

          // Delete deprecated object property;
          delete jsonObject['license_link'];

          // Write the JSON object back to the file
          fs.writeFile(files[i], JSON.stringify(jsonObject, null, 4) + "\n", 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object from file: "+files[i]);
                return console.log(err);
            }
          });

          // Keep a count of how many files we are modifying
          records++;
        }
      } else {
          console.log('Modify file manually: '+files[i]);
      }
    }
  }
  console.log(records + ' file(s) updated.');
});

