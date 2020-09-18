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
const csvFilePath='projects.csv';

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  for (let i=0; i<jsonObj.length; i++) {

    // Rename field title to name
    jsonObj[i]['name'] = jsonObj[i]['title'];
    delete jsonObj[i]['title'];

    // Rename field summary to description
    jsonObj[i]['description'] = jsonObj[i]['summary'];
    delete jsonObj[i]['summary'];

    // Rename link-to-live-product to website
    jsonObj[i]['website'] = jsonObj[i]['link-to-live-product'];
    delete jsonObj[i]['link-to-live-product'];

    // Restructure license field
    jsonObj[i]['tmp'] = [
      {
        'spdx': jsonObj[i]['license'],
        'licenseURL': ''
      }
    ];
    delete jsonObj[i]['license'];
    jsonObj[i]['license'] = jsonObj[i]['tmp'];
    delete jsonObj[i]['tmp'];


    // Map them all as health nominees
    jsonObj[i]['SDGs'] = [
      [
        3,
        "Good Health and Well-Being"
      ]
    ]

    // default to software, edit manually afterwards
    jsonObj[i]['type'] = ['software'];

    // Rename GithubURL
    jsonObj[i]['repositoryURL'] = jsonObj[i]['link-to-source'];
    delete jsonObj[i]['link-to-source'];

    // Rename/restructure org field
    jsonObj[i]['organizations'] = [
      {
        'name': jsonObj[i]['organizing-org'],
        'org_type': 'owner',
        'contact_email': jsonObj[i]['main-poc']
      }
    ]
    delete jsonObj[i]['organizing-org'];
    delete jsonObj[i]['main-poc'];



    // remove all other fields
    delete jsonObj[i]['topics'];
    delete jsonObj[i]['platform'];
    delete jsonObj[i]['tags'];
    delete jsonObj[i]['link-to-live-product'];
    delete jsonObj[i]['link-to-community'];
    delete jsonObj[i]['contributor-guides'];
    delete jsonObj[i]['documentation'];

    // Create filename from name field, removing white spaces
    let filename = jsonObj[i]['name'].toLowerCase().replace(/ /g,'-');

    // Write Json object to its own file
    fs.writeFile('tmp/'+ filename + '.json', JSON.stringify(jsonObj[i], null, 2) + "\n", 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object from file: "+files[i]);
                return console.log(err);
            }
          });
  }
});
 