#!/bin/bash
git clone https://github.com/unicef/publicgoods-website.git ../publicgoods-website
git clone https://github.com/unicef/publicgoods-scripts.git ../publicgoods-scripts
pushd ../publicgoods-scripts && ./static.bash && npm install && node index.js && popd
git config --global user.email "lacabra@users.noreply.github.com"
git config --global user.name "Victor Grau Serrat"
pushd ../publicgoods-website
git remote set-url origin https://${GITHUB_TOKEN}@github.com/unicef/publicgoods-website.git
git commit -am "BLD: $TRAVIS_COMMIT" || true
git push --set-upstream origin master
