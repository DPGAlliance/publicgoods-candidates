/* This script utility provides a consistent way of ordering the fields/
 * properties in the resulting JSON files.
 *
 * You can run it without parameters and will only check for consistency
 * in the order, erroring out if any file does not match.
 *
 * You can run it with '--fix' to automatically order all properties
 * for all files in the expected order.
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const productsPath = "./nominees/";

const propertiesOrder = [
  "name",
  "aliases",
  "description",
  "website",
  "license",
  "spdx",
  "licenseURL",
  "SDGs",
  "sectors",
  "type",
  "repositoryURL",
  "organizations",
  "name",
  "website",
  "org_type",
  "contact_name",
  "contact_email"
];

let fix = false;
if (process.argv.length == 3 && process.argv[2] == "--fix") {
  fix = true;
}

glob("*.json", { cwd: productsPath }, async (err, productFiles) => {
  // iterate over all product files
  for (let i = 0; i < productFiles.length; i++) {
    // read data from the file
    jsonData = fs.readFileSync(
      path.join(productsPath, productFiles[i]),
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
        product["website"] = product["website"].replace(/http:/g, "https:");
        if(product['website'] != '' && ! product['website'].match('https://')){
          product['website'] = 'https://' + product['website']
        }
      }
      if (product.hasOwnProperty("repositoryURL")) {
        product["repositoryURL"] = product["repositoryURL"].replace(
          /http:/g,
          "https:"
        );
      }
      for (let i = 0; i < product["license"].length; i++) {
        product["license"][i]["licenseURL"] = product["license"][i][
          "licenseURL"
        ].replace(/http:/g, "https:");
      }
      for (let i = 0; i < product["organizations"].length; i++) {
        if (product["organizations"][i].hasOwnProperty("website")) {
          product["organizations"][i]["website"] = product["organizations"][i][
            "website"
          ].replace(/http:/g, "https:");
        }
      }

      // rewrite the file with the desired order
      fs.writeFileSync(
        path.join(productsPath, productFiles[i]),
        JSON.stringify(product, propertiesOrder, 2),
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
      if (JSON.stringify(product, propertiesOrder, 2) != jsonData) {
        console.log(
          "JSON properties not in the expected order for " +
            productFiles[i] +
            ". Re-run with --fix to fix."
        );
        process.exit(1);
      }
    }
  }
});
