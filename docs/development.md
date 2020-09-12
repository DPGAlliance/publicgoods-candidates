# Development

This document contains additional information related to the development of this repo.

## CI - Continous Integration

This repository relies on **GitHub Actions** for its Continuous Integration. The CI configuration can be found in [.github/workflows/main.yml](../.github/workflows/main.yml) and is composed of the following three stages:

* **build** This is where the CI validates the data that is to be committed to the repository in a multistep process:
    1. `npm install` installs the project dependencies required to run the subsequent steps
    2. `npm test` validates the JSON schema for all data files, which means that it ensures that all JSON files have the required fields, and each of these fields has the expected data type
    3. `npm run lint` runs a JSON linter on the data files, which expects a 2-space identation and a predefined separation of fields line by line
    4. `./scripts/check-filenames.bash` checks that all data files are named consistely, that is by using the `field` name in *kebab-case*, in which punctuation is removed and spaces are replaced by single hyphens.
    5. `npm run order` checks that the data fields in all JSON files are in a predefined order, again to ensure consistency.

* **deploy** The data from this repo is used to populate the list displayed on the following public website https://digitalpublicgoods.net/explore. Thus, when new data is added to this repo, a new website build is generated and pushed live to reflect these changes. Refer to the [unicef/publicgoods-website](https://github.com/unicef/publicgoods-website) README for an overview on how the various repositories come together.

* **open_pr** The data from this repo is synced with [publicgoods/products](https://github.org/publicgoods/products) as a collaborative and joint effort between multiple organizations to maintain a broader list of open source projects in the social impact sector. This stage checks for any changes on the data files, and if any are found, a PR is automatically opened against [publicgoods/products](https://github.org/publicgoods/products) to keep both repos in sync.

✅ ProTip: Include either `[skip pr]` or `[pr skip]` in either the commit message, the pull request title, or the pull request body to prevent this last action from happening automatically.
