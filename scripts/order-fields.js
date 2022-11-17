/* This script utility provides a consistent way of ordering the fields/
 * properties in the resulting JSON files.
 *
 * You can run it without parameters and will only check for consistency
 * in the order, erroring out if any file does not match.
 *
 * You can run it with '--fix' to automatically order all properties
 * for all files in the expected order.
 */

require('colors');
const Diff = require('diff');
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const sets = [
  {
    path: './nominees/',
    schema: 'nominee-schema.json'
  },
  {
    path: './digitalpublicgoods/',
    schema: 'screening-schema.json'
  },
]

const httpOnlyURLs = [
  'mary.dfki.de',
  'opencbs.com',
  'vaccineledger.com'
]

// Retrieves all object keys in order. Function gets recursively
// called for objects and arrays to include all keys of all children.
function getKeys(obj) {
  let keys = [];
  for(const key in obj){
    keys.push(key);
    if(obj[key].type == 'object'){
      keys = keys.concat(getKeys(obj[key].properties))
    }
    if(obj[key].type == 'array'){
      keys = keys.concat(getKeys(obj[key].items.properties))
    }
  }
  return keys
}

// Reads JSON schema and returns object
function readSchema(filename) {
  const data = fs.readFileSync(filename, "utf8", function(err) {
    if (err) {
      console.log(
        "An error occured while reading JSON Object from file: " +
          productFiles[i]
      );
      return console.log(err);
    }
  })
  return JSON.parse(data);
}

function checkOrder(productsPath, propertiesOrder) {

  glob("*.json", { cwd: productsPath }, async (err, productFiles) => {
    // iterate over all product files
    for (let i = 0; i < productFiles.length; i++) {

      const pathfilename = path.join(productsPath, productFiles[i])
      const stats = fs.lstatSync(pathfilename)

      if(stats.isSymbolicLink()) {
        console.log('Symbolic found for '+pathfilename+'. Skipping...')
      } else {
        // read data from the file
        jsonData = fs.readFileSync(
          pathfilename,
          "utf8",
          function(err) {
            if (err) {
              console.log(
                "An error occured while reading JSON Object from file: " +
                  productFiles[i]
              );
              return console.log(err);
            }
          }
        );

        // parse data from JSON into array of dictionaries
        product = JSON.parse(jsonData);

        if (fix) {
          // upgrade to HTTPS :)
          if (product.hasOwnProperty("website")) {
            if(! httpOnlyURLs.find( element => product["website"].match(new RegExp(element)))) {
              product["website"] = product["website"].replace(/http:/g, "https:");
              if(product['website'] != '' && ! product['website'].match('https://')) {
                product['website'] = 'https://' + product['website']
              }
            }
          }
          if (product.hasOwnProperty("repositoryURL")) {
            product["repositoryURL"] = product["repositoryURL"].replace(
              /http:/g,
              "https:"
            );
          }
          if(product.hasOwnProperty("license")) {
            for (let i = 0; i < product["license"].length; i++) {
              if(! httpOnlyURLs.find( element => product["license"][i]["licenseURL"].match(new RegExp(element)))) {
                product["license"][i]["licenseURL"] = product["license"][i][
                  "licenseURL"
                ].replace(/http:/g, "https:");
              }
            }
          }
          if(product.hasOwnProperty("organizations")) {
            for (let i = 0; i < product["organizations"].length; i++) {
              if (product["organizations"][i].hasOwnProperty("website")) {
                if(! httpOnlyURLs.find( element => product["organizations"][i]["website"].match(new RegExp(element)))) {
                  product["organizations"][i]["website"] = product["organizations"][i][
                    "website"
                  ].replace(/http:/g, "https:");
                }
              }
            }
          }

          JSON.stringify(product, propertiesOrder, 2)

          // rewrite the file with the desired order
          fs.writeFileSync(
            path.join(productsPath, productFiles[i]),
            JSON.stringify(product, propertiesOrder, 2) + "\n",
            "utf8",
            function(err) {
              if (err) {
                console.log(
                  "An error occured while writing JSON Object to file: " + fnames[e]
                );
                return console.log(err);
              }
            }
          );
        } else {
          if (JSON.stringify(product, propertiesOrder, 2) + "\n" != jsonData) {
            console.log(
              "JSON properties not in the expected order for " + productsPath +
                productFiles[i] +
                ". Re-run with --fix to fix."
            );
            const diff = Diff.diffChars(JSON.stringify(product, propertiesOrder, 2) + "\n", jsonData);
 
            diff.forEach((part) => {
              // green for additions, red for deletions
              // grey for common parts
              const color = part.added ? 'green' :
                part.removed ? 'red' : 'grey';
              process.stderr.write(part.value[color]);
            });
            process.exit(1);
          }
        }
      }
    }
  })
}

let fix = false;
if (process.argv.length == 3 && process.argv[2] == "--fix") {
  fix = true;
}

sets.forEach((item) => {
  let schema = readSchema(item.schema);
  let propertiesOrder = getKeys(schema.properties);
  checkOrder(item.path, propertiesOrder);
})
