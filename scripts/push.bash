#!/bin/bash
git clone https://github.com/DPGAlliance/publicgoods-website.git ../publicgoods-website && \
    git clone https://github.com/DPGAlliance/publicgoods-scripts.git ../publicgoods-scripts && \
    pushd ../publicgoods-scripts && \
        npm install && \
        ./scripts/static.bash && \
        pushd packages/automation && \
        node consolidate_data.js && \
        popd && \
        pushd packages/automation && \
        node index.js && \
        popd && \
        pushd packages/registry && \
            npm run build && \
        popd && \
        pushd packages/eligibility && \
            npm run build && \
        popd && \
        pushd packages/map && \
            npm run build && \
        popd && \
        pushd packages/roadmap && \
            npm run build && \
        popd && \
        ./scripts/moveFiles.bash && \
    popd && \
    git config --global user.email "96251909+dpgabot@users.noreply.github.com" && \
    git config --global user.name "dpgabot" && \
    pushd ../publicgoods-website && \
        git remote set-url origin https://${GITHUB_TOKEN}@github.com/DPGAlliance/publicgoods-website.git && \
        git add . && \
        git stash && git pull --rebase && git stash pop && \
        git commit -am "BLD: $GITHUB_SHA" || true && \
        git push --set-upstream origin main
