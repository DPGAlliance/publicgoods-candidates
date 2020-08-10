const fs = require('fs');
const path = require('path');
const btoa = require('btoa');
const request = require('request');

const githubUser = 'publicgoods';
const githubRepo = 'products';
const baseURL = 'https://api.github.com/repos/' + githubUser + '/' + githubRepo + '/';

const branchName = 'unicef/publicgoods-candidates-'+process.env.GITHUB_SHA.substring(0, 8);

options = {
  auth: {
    'user': 'lacabra',
    'pass': process.env.GITHUBTOKEN
  },
  headers: {
    'User-Agent': 'request',
    'Accept': 'application/vnd.github.v3+json'
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
function createBranch(head) {
  my_options = options;
  my_options['url'] = baseURL + 'git/refs';
  my_options['body'] = JSON.stringify({
    "ref": "refs/heads/" + branchName,
    "sha": head
  });

  request.post(my_options, function (error, response, body) {
    if(error) {
      console.error('error:', error); // Print the error if one occurred
    } else {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the body
      commitFiles();
    }
  });
}

/** Commits the files that have changed
 */
async function commitFiles(){
  const files = getChangedFiles();
  console.log('These are the files that have changed:')
  console.log(files);
  let commitFiles = []
  for (file of files) { 
    if (file.match(/nominees\/.*\.json/)) {

      commitFiles.push(file);

      let my_options = options;
      my_options['url'] = baseURL + 'contents/' + file;

      let promise = new Promise((resolve, reject) => {
        request.get(my_options, function(error, response, body) {
          if(error){
            reject(error);
          }else{
            if(response.statusCode==200){
              resolve(JSON.parse(body));
            } else {
              resolve(null);
            }
          }
        });
      });

      const responseIfFileExists = await promise;
      const fileContents = fs.readFileSync(file, 'utf8');
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

      my_options['url'] = baseURL + 'contents/'+file;
      my_options['body'] = JSON.stringify(body);

      promise = new Promise((resolve, reject) => {
        request.put(my_options, function(error, response, body) {
          if(error){
            reject(error);
          }else{
            resolve(body);
          }
        });
      });
      response = await promise;
      console.log('Received response: ' + response)
    }
  }
  createPR(commitFiles);
}

/** Creates a new PR using global branchName variable
 * @param {Array} List of files that have changed in this PR
 */
function createPR(files){
  my_options = options;
  my_options['url'] = baseURL + 'pulls';
  my_options['body'] = JSON.stringify({
    'title': 'Add new nominee(s): ' + files.toString(),
    'head': branchName,
    'base': 'master',
    'body': 'Add new nominees from [unicef/publicgoods-candidates](https://github.com/unicef/publicgoods/candidates)'
  })

  request.post(options, function (error, response, body) {
    if(error) {
      console.error('error:', error); // Print the error if one occurred
    } else {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the body

      response = JSON.parse(body);
      numPR = response['number'];

      //assignPR(numPR);
    }
  });
}

/** Assigns a PR to a list of GitHub users
 * @param {number} PR number to assign
 */
function assignPR(numPR) {
  my_options = options;
  my_options['url'] = baseURL + 'issues/' + numPR;
  my_options['body'] = JSON.stringify({
    'assignees': [
      'ericboucher',
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