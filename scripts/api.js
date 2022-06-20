/*
 * This script is meant to be run from the rootfolder with the following command:
 * node scripts/api.js 
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const git = require('isomorphic-git');
const del = require('del');
const http = require('isomorphic-git/http/node')

require('dotenv').config();

const nomineeFolder = './nominees';
const DPGFolder = './digitalpublicgoods';
const apiRepoURL = 'https://github.com/DPGAlliance/publicgoods-api';
const pathToApiRepo = path.resolve('../publicgoods-api');
const pathToApiFolder = path.join(pathToApiRepo, 'docs');
const pathsAdd = [
  'docs/dpg',
  'docs/dpgs',
  'docs/nominees',
  'docs/nominee']

const author = {
  name: "DPGA bot",
  email: "96251909+dpgabot@users.noreply.github.com"
}


/* The following DPGs were assessed differently and there is no DPG data,
/* so we exclude them from the regular flow 
*/
const earlyGradeReading = [
  'african-storybook',
  'antura-and-the-letters',
  'book-dash',
  'feed-the-monster',
  'gdl-radio',
  'global-digital-library',
  'h5p',
  'storyweaver']


/** 
 * Returns a Javascript object (array) of the files that have changed
 * @return {Array} List of changed files
 */
function getChangedFiles(){
  try {
    var obj = JSON.parse(fs.readFileSync(path.join(process.env.HOME, 'files.json'), 'utf8'));
    return obj;
  } catch(err) {
    return null;
  }
}

/** 
/* Checks if any of the changed files are of our interest to run this script
 */
function startCheck(){
  const files = getChangedFiles();
  if (files) {
    let found = false;
    for(file of files) {
      if (file.match(/nominees\/.*\.json/)) {
        found = true;
        break
      } else if (file.match(/digitalpublicgoods\/.*\.json/)) {
        found = true;
        break
      }
    }
    if(found){
      start()
    } else {
      console.log('No nominee or DPG files have changed or been added. Not running script.')
    }
  } else {
    console.log('files.json not found.')
  }
}

/* 
/* Wrapper function to fs.writeFile() to make sure that path exists first
/* fs.mkdir() is thus called first to create the path recursively
*/
function writeFile(folder, filename, content){
  fs.mkdir(folder, { recursive: true }, (err) => {
    if(err){
      console.log("An error occured while creating folder:" + folder);
      return console.log(err);
    } else {
      const pathFilename = path.join(folder, filename);
      fs.writeFile(pathFilename, content, 'utf8', function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object from file: " + pathFilename);
          return console.log(err);
        }
      });
    }
  });
}

/*
/* Appends data from DPG to the existing object
*/
function addDPG(jsonObject, name){
  if (!earlyGradeReading.includes(name)) {
    const DPGFile = path.join(DPGFolder, `${name}.json`);
    let DPGData = fs.readFileSync(
      DPGFile,
      'utf8',
      function (err) {
        if (err) {
          console.log("An error occured while reading JSON Object from file: " + DPGFile);
          return console.log(err);
        }
    });

    // Parse JSON object from data
    var DPGObject = JSON.parse(DPGData);

    for(const key in DPGObject){
      if(key != 'name'){
        jsonObject[key] = DPGObject[key]
      }
    }
  }
  return jsonObject;
}

/**
/* Clones repository
*/
async function cloneRepo() {
  await git.clone({
    fs,
    http,
    dir: pathToApiRepo,
    url: apiRepoURL,
    singleBranch: true,
    depth: 1
  })
  openRepo();
}

/**
/* Opens repository
*/
async function openRepo() {
  await git.fetch({
    fs,
    http,
    dir: pathToApiRepo,
    url: apiRepoURL,
    singleBranch: true,
    remote: 'origin',
    ref: 'main',
    depth: 1,
    tags: false
  });
  await git.checkout({
    fs,
    dir: pathToApiRepo,
    ref: 'main',
    noCheckout: true
  });

  // Removes all files we may change. They will be added later.
  // The difference will be any files that need to be deleted.
  // We delete them first from the filesystem and remove them from the index afterwards.
  pathsAdd.forEach(async (p) => { del(path.join(pathToApiRepo, p), {force: true}); })
  await git.statusMatrix({ fs, dir: pathToApiRepo, filepaths: pathsAdd  }).then((status) =>
    Promise.all(
       status.map(([filepath, , worktreeStatus]) =>
           worktreeStatus ? git.add({ fs, dir: pathToApiRepo, filepath: filepath }) : git.remove({ fs, dir: pathToApiRepo, filepath: filepath })
              )
        )
  );

  run();
}

/**
/* Commit changes
*/
async function commit() {
  for (const p of pathsAdd) {
    await git.add({
      fs,
      dir: pathToApiRepo,
      filepath: p
    });
  }

  // Check if there are changes to commit
  const FILE = 0, HEAD = 1, WORKDIR = 2
  const filenames = (await git.statusMatrix({ fs, dir: pathToApiRepo }))
    .filter(row => row[HEAD] !== row[WORKDIR])

  if(filenames.length) {
    await git.commit({
      fs,
      dir: pathToApiRepo,
      author: author,
      message: 'Automatic update API from ' + process.env.GITHUB_SHA.substring(0, 7)
    });
    await git.push({
      http,
      fs,
      dir: pathToApiRepo,
      onAuth: () => ({
          username: process.env.GITHUBTOKEN,
      }),
    })
    console.log('Commit pushed to remote repo.')
  } else {
    console.log('Nothing to commit.')
  }
}

/**
/* Ensures repo is cloned in the specified path
*/
function start() {
  fs.access(pathToApiRepo, function(err) {
    if (err) {
      cloneRepo()
    } else {
      openRepo()
    }
  })
}

/**
/* Main function to generate all API JSON files.
*/
function run() {
  // scan for all json files in path
  glob(path.join(nomineeFolder,'*.json'), {}, async (err, files) => {

    let c = 0;
    let n = 0;
    let dpgs = [];
    let nominees = [];

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

      let newObj = { id: path.basename(files[i], '.json') };
      for(const key in jsonObject){
        newObj[key] = jsonObject[key]
      }

      if(jsonObject['stage'] == 'DPG') {
        c++;

        // Push a deep copy of the object at this point in time, 
        // as we do not want to include the additional DPG data below
        dpgs.push(JSON.parse(JSON.stringify(newObj)));

        newObj = addDPG(newObj, path.basename(files[i], '.json'))

        // Write the JSON object to file
        writeFile(
          path.join(pathToApiFolder, 'dpg', path.basename(files[i], '.json')), 
          'index.json',
          JSON.stringify(newObj, null, 2) + "\n");
      } else {
        n++;
        nominees.push(newObj);

        // Write the JSON object to file
        writeFile(
          path.join(pathToApiFolder, 'nominee', path.basename(files[i], '.json')), 
          'index.json',
          JSON.stringify(newObj, null, 2) + "\n");
      }
    }

    // Write the JSON array of DPGs
    writeFile(
      path.join(pathToApiFolder, 'dpgs'),
      'index.json',
      JSON.stringify(dpgs, null, 2) + "\n");

    // Write the JSON array of nominees
    writeFile(
      path.join(pathToApiFolder, 'nominees'),
      'index.json',
      JSON.stringify(nominees, null, 2) + "\n");

    console.log(`${c} DPGs found, ${n} nominees found.`);
    commit();
  });
}

// Let's do it!
startCheck();
