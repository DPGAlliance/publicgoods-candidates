#!/bin/bash
git clone https://github.com/unicef/publicgoods-website.git ../publicgoods-website && \
    git clone https://github.com/unicef/publicgoods-scripts.git ../publicgoods-scripts && \
    pushd ../publicgoods-scripts && \
        npm install && \
        ./static.bash && \
        node generate_dpgs.js && \
        node index.js && \
        node generate_nominees.js && \
        npm run build && \
        ./moveFiles.bash && \
    popd && \
    git config --global user.email "lacabra@users.noreply.github.com" && \
    git config --global user.name "Victor Grau Serrat" && \
    pushd ../publicgoods-website && \
    git remote set-url origin https://${GITHUB_TOKEN}@github.com/unicef/publicgoods-website.git && \
    git add author blog category registry tag && \
    git stash && git pull --rebase && git stash pop && \
    git commit -am "BLD: $GITHUB_SHA" || true && \
    git push --set-upstream origin master
