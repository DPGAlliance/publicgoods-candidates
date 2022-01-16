const fs = require('fs');
const path = require('path');
const btoa = require('btoa');
const request = require('request');

const githubUser = 'publicgoods';
const githubRepo = 'products';
const baseURL = 'https://api.github.com/repos/' + githubUser + '/' + githubRepo + '/';

const branchName = 'DPGAlliance/publicgoods-candidates-'+process.env.GITHUB_SHA.substring(0, 8);

options = {
  auth: {
    'user': 'dpgabot',
    'pass': process.env.GITHUBTOKEN
  },
  headers: {
    'User-Agent': 'request',
    'Accept': 'application/vnd.github.v3+json'
  }
}

/**
 * 
 * @param {Object} my_options request parameters
 * @param {String} MODE request method GET | POST | DELETE
 */

function apiCall(my_options, MODE = 'GET') {

  if (MODE === 'GET') {
    const promise = new Promise((resolve, reject) => {
      request.get(my_options, function(error, response, body) {
        if(error){
          reject(error);
        }else{
          if(response.statusCode==200 || response.statusCode == 201){
            resolve(JSON.parse(body));
          } else {
            resolve(null);
          }
        }
      });
    })
      .then(data => data)
      .catch(err => console.err(err.message));

    return promise;

  } else if (MODE === 'POST') {
    const promise = new Promise((resolve, reject) => {
      request.post(my_options, function(error, response, body) {
        if(error){
          reject(error);
        }else{
          if(response.statusCode === 201 || response.statusCode == 200) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            resolve(JSON.parse(body));
          }else {
            resolve(null);
          }
        }
      });
    })
      .then(data => data)
      .catch(err => console.error(err.message));

    return promise;

  } else if(MODE === 'PUT') {
    const promise = new Promise((resolve, reject) => {
      request.put(my_options, function(error, response, body) {
        if(error){
          reject(error);
        }else{
          if(response.statusCode >= 200 && response.statusCode <= 300) {
            resolve(JSON.parse(body));
          }else{
            resolve(null);
          }
        }
      });
    })
      .then(data => data)
      .catch(err => console.error(err.message));
    return promise;
  } else if (MODE === 'DELETE') {
    const promise = new Promise((resolve, reject) => {
      request.delete(my_options, function(error, response, body) {
        if(error){
          reject(error);
        }else{
          if(response.statusCode >= 200 && response.statusCode < 300) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            resolve(JSON.parse(body));
          }else {
            resolve(JSON.parse(body));
          }
        }
      });
    }).then(data => data)
    .catch(err => console.error(err.message));
    return promise;
  }
}

/** 
 * Returns a Javascript object (array) of the files that have changed
 * @return {Array} List of changed files
 */
function getChangedFiles(){
  var obj = JSON.parse(fs.readFileSync(path.join(process.env.HOME,'files.json'), 'utf8'));
  return obj;
}

/** Checks if any of the changed files are of our interest to run this script
 */
function run(){
  const files = getChangedFiles();
  let found = false;
  for(file of files) {
    if (file.match(/nominees\/.*\.json/)) {
      found = true;
      break
    }
  }
  if(found){
    getHead()
  } else {
    console.log('No nominee files have changed or been added. Not running script.')
  }
}

/** Gets a pointer to the latest commit of master branch
 * @return {string} SHA of latest commit
 */
function getHead() {
  my_options = options;
  my_options['url'] = baseURL + 'git/ref/heads/master'
  request(my_options, function (error, response, body) {
    if(error) { 
      console.error('error:', error); // Print the error if one occurred
    } else {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the body
      response = JSON.parse(body);
      head = response['object']['sha'];
      createBranch(head);
    }
  });
}

/** Creates a new branch using a global branchName variable
 * @param {string} SHA of where to create a branch in the tree
 */
async function createBranch(head) {
  my_options = options;
  my_options['url'] = baseURL + 'git/refs';
  my_options['body'] = JSON.stringify({
    "ref": "refs/heads/" + branchName,
    "sha": head
  });
  try{
    const branchCreated = await apiCall(my_options, 'POST');
    if ( branchCreated ){
      commitFiles(head);
    }
  } catch(error){
    console.error(error);
  }
}
/** Commits the files that have changed
 */
async function commitFiles(head){
  const files = getChangedFiles();
  console.log('These are the files that have changed:')
  console.log(files);
  let commitFiles = []
  for (file of files) { 
    if (file.match(/nominees\/.*\.json/)) {

      let commitFile = file.replace(/^nominees/,'products');

      commitFiles.push(commitFile);

      let my_options = options;
      my_options['url'] = baseURL + 'contents/' + commitFile;

      
      let responseIfFileExists;
      let fileContents;

      try{
        responseIfFileExists = await apiCall(my_options);
        if (!fs.existsSync(file)) {

          my_options['url'] = baseURL + 'git/trees/' + head;
          let base_tree = await apiCall(my_options);

          const productTree = base_tree.tree.filter(item => item.path === 'products');
          my_options['url'] = productTree[0].url;

          const productTreeList = await apiCall(my_options);

          const deletedFile = productTreeList.tree.filter(item => item.path === file.split('/')[1]);

          my_options['url'] = baseURL + 'contents/' + commitFile;
          my_options['body'] = JSON.stringify({
            'message': 'BLD: Delete file ' + file,
            'sha': deletedFile[0].sha,
            'branch': branchName,
          });
          const deletedCommit = await apiCall(my_options, 'DELETE');
        }
        else {
          fileContents = fs.readFileSync(file, 'utf8')
          var body = {
            'content': btoa(fileContents),
            'branch': branchName
          }
          if(responseIfFileExists){
            body['message'] = 'BLD: edit file ' + file;
            body['sha'] = responseIfFileExists['sha'];
          }else{
            body['message'] = 'BLD: add file ' + file;
          }
          my_options['body'] = JSON.stringify(body);
    
          response = await apiCall(my_options, 'PUT');
          console.log('Received response: ' + response)
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }
  createPR(commitFiles);
}

/** Creates a new PR using global branchName variable
 * @param {Array} List of files that have changed in this PR
 */
async function createPR(files){
  my_options = options;
  my_options['url'] = baseURL + 'pulls';
  my_options['body'] = JSON.stringify({
    'title': 'Add/Delete new product(s): ' + files.toString(),
    'head': branchName,
    'base': 'master',
    'body': 'Add/Delete new product(s) from [DPGAlliance/publicgoods-candidates](https://github.com/DPGAlliance/publicgoods-candidates)'
  })
  try{
    const createPrData = await apiCall(my_options, 'POST');
    const numPR = createPrData['number'];
    assignPR(numPR);
  }catch(error){
    console.error(error);
  }
}

/** Assigns a PR to a list of GitHub users
 * @param {number} PR number to assign
 */
function assignPR(numPR) {
  my_options = options;
  my_options['url'] = baseURL + 'issues/' + numPR;
  my_options['body'] = JSON.stringify({
    'assignees': [
      'nathanbaleeta',
      'conradsp'
    ]
  })

  request.patch(options, function (error, response, body) {
    if(error) {
      console.error('error:', error); // Print the error if one occurred
    } else {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the body
    }
  });
}

run();