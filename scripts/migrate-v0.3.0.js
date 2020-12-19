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
var records = 0;

sdg = []
sdg[1] = "No Poverty"
sdg[2] = "Zero Hunger"
sdg[3] = "Good Health and Well-Being"
sdg[4] = "Quality Education"
sdg[5] = "Gender Equality"
sdg[6] = "Clean Water and Sanitation"
sdg[7] = "Affordable and Clean Energy"
sdg[8] = "Decent Work and Economic Growth"
sdg[9] = "Industry, Innovation and Infrastructure"
sdg[10] = "Reduced Inequalities"
sdg[11] = "Sustainable Cities and Communities"
sdg[12] = "Responsible Consumption and Production"
sdg[13] = "Climate Action"
sdg[14] = "Life Below Water"
sdg[15] = "Life On Land"
sdg[16] = "Peace, Justice and Strong Institutions"
sdg[17] = "Partnerships for the Goals"

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

    // Rename license -> link field to license -> licenseURL
    for (let k=0; k<jsonObject['license'].length; k++) {
      if(jsonObject['license'][k].hasOwnProperty('link')) {
        jsonObject['license'][k]['licenseURL'] = jsonObject['license'][k]['link']
        delete jsonObject['license'][k]['link']
        records++
      }
    }

    // Rename repo_main to repositoryURL
    if(jsonObject.hasOwnProperty('repo_main')) {
      jsonObject['repositoryURL'] = jsonObject['repo_main']
      delete jsonObject['repo_main']
    }

    // drop repo_org if it exists
    if(jsonObject.hasOwnProperty('repo_org')) {
      delete jsonObject['repo_org']
    }

    // drop repo_others if it exists
    if(jsonObject.hasOwnProperty('repo_others')) {
      delete jsonObject['repo_others']
    }

    // move initialism to element in aliases
    if(jsonObject.hasOwnProperty('initialism')) {
      if(jsonObject.hasOwnProperty('aliases')) {
        jsonObject['aliases'].append(jsonObject['initialism'])
      } else {
        jsonObject['aliases'] = []
        jsonObject['aliases'][0] = jsonObject['initialism']
      }
      delete jsonObject['initialism']
    }

    // move SDGs array of integers to array of objects
    for (let k=0; k<jsonObject['SDGs'].length; k++) {
      if(typeof(jsonObject['SDGs'][k]) == 'number') {
        jsonObject['SDGs'][k] = [jsonObject['SDGs'][k], sdg[jsonObject['SDGs'][k]]]
      }
    }

    // add empty sectors if not already present
    if(!jsonObject.hasOwnProperty('sectors')){
      jsonObject['sectors'] = []
    }

    // migrate supported_by to organizations
    if(jsonObject.hasOwnProperty('supported_by')) {
      jsonObject['organizations'] = []
      jsonObject['organizations'][0] = {
        'name': jsonObject['supported_by'][0]['org_name'], 
        'org_type': 'funder', 
        'website': 'https://unicefinnovationfund.org/'
      }
      delete jsonObject['supported_by']
    }

    // Write the JSON object back to the file
    fs.writeFile(files[i], JSON.stringify(jsonObject, null, 4) + "\n", 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object from file: "+files[i]);
          return console.log(err);
      }
    });

  }
  console.log(records + ' file(s) updated.');
});

