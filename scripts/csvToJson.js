/*
 * This file was used on Jan 15, 2020 to process a spreadsheet of nominees (in CSV format)
 * and automatically generate Json files for each entry in the spreadsheet.
 *
 * It was not designed to be fool-proof, but only an assist in automating the task of
 * processing multiple entries. 
 *
 * This script was executed inside a tmp/ folder with the following command:
 * node ../scripts/csvToJson.js
 *
 * Additional changes were done manually, and when all json files were compliant with 
 * the schema, they were moved to the nominees/ folder.
 */

const fs = require('fs');
const csv = require('csvtojson');

// Set CSV file to process
const csvFilePath='nominees.csv';

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  for (let i=0; i<jsonObj.length; i++) {

    // Convert lists to arrays
    jsonObj[i]['SDGs'] = jsonObj[i]['SDGs'].replace(/\s/g, '').split(',').map(Number);
    jsonObj[i]['type'] = jsonObj[i]['type'].replace(/\s/g, '').split(',');

    // add common field to set
    jsonObj[i]['supported_by'] = {
      'org_name': 'UNICEF Ventures Fund',
    }

    if(jsonObj[i].hasOwnProperty('license')) {
      // Check we have not processed this file already
      if(!jsonObj[i]['license'].hasOwnProperty('spdx')) {

        // Create new object
        const tmpObj = { 'spdx': jsonObj[i]['license'], 'link': jsonObj[i]['license_link']};

        // Make sure we are dealing with an array, and store object as its first element
        jsonObj[i]['license'] = [];
        jsonObj[i]['license'][0] = tmpObj;

        // Delete deprecated object property;
        delete jsonObj[i]['license_link'];
      }
    }

    // Create filename from name field, removing white spaces
    let filename = jsonObj[i]['name'].toLowerCase().replace(/ /g,'');

    // Write Json object to its own file
    fs.writeFile(filename + '.json', JSON.stringify(jsonObj[i], null, 4) + "\n", 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object from file: "+files[i]);
                return console.log(err);
            }
          });
  }
});
 