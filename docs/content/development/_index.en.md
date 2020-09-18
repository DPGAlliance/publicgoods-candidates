---
title: Development

---

This document contains additional information related to the development of this repo.

## Overview

This repository is mostly an open data repository, one that holds primarily an open data set of potential Digital Public Goods and documents their progression through a vetting process. Open source code is used to enforce and guarantee data quality and consistency and is all contained within the `scripts/` folder. Scripts are written mostly in Javascript and one in Bash. Here are the various checks that are performed on the data:

* `npm test` validates the JSON schema for all data files, which means that it ensures that all JSON files have the required fields, and each of these fields has the expected data type.
*  `npm run lint` runs a JSON linter on the data files, which expects a 2-space identation and a predefined separation of fields line by line.
* `./scripts/check-filenames.bash` checks that all data files are named consistely, that is by using the `field` name in *kebab-case*, in which punctuation is removed and spaces are replaced by single hyphens.
* `npm run order` checks that the data fields in all JSON files are in a predefined order, again to ensure consistency.

All the above checks are run as a precommit git hook and in the CI, and any failure results in a rejection of the proposed changes until all checks pass.

## Installation

1. Clone this repository to your computer:
    - Using HTTPS:
    ```bash
    git clone https://github.com/unicef/publicgoods-candidates.git
    ```
    - Using SSH:
    ```bash
    git clone git@github.com:unicef/publicgoods-candidates.git
    ```
    
2. Install the project dependencies:
    ```bash
    cd publicgoods-candidates
    npm install
    ```

You are now ready to create new files for new nominees of Digital Public Goods or suggest changes to the existing ones. All of them can be found inside the `nominees/` folder. Refer to the [contributing guidelines](/CONTRIBUTING.md).

## Git Hooks

[Husky](https://github.com/typicode/husky) is used to implement the above checks in a git precommit hook, and configured in the `husky` section in the [../package.json](../package.json). You can manually run them by executing the above commands, or simply try to commit your changes, and the git hook will automatically invoke them before the commit runs.

## CI - Continous Integration

This repository relies on **GitHub Actions** for its Continuous Integration. The CI configuration can be found in [.github/workflows/main.yml](../.github/workflows/main.yml) and is composed of the following three stages:

* **build** This is where the CI validates the data that is to be committed to the repository in a multistep process, as described in the overview section above.
    1. `npm install` installs the project dependencies required to run the subsequent steps
    2. `npm test` validates the JSON schema for all data files, which means that it ensures that all JSON files have the required fields, and each of these fields has the expected data type
    3. `npm run lint` runs a JSON linter on the data files, which expects a 2-space identation and a predefined separation of fields line by line
    4. `./scripts/check-filenames.bash` checks that all data files are named consistely, that is by using the `field` name in *kebab-case*, in which punctuation is removed and spaces are replaced by single hyphens.
    5. `npm run order` checks that the data fields in all JSON files are in a predefined order, again to ensure consistency.

* **deploy** The data from this repo is used to populate the list displayed on the following public website https://digitalpublicgoods.net/explore. Thus, when new data is added to this repo, a new website build is generated and pushed live to reflect these changes. Refer to the [unicef/publicgoods-website](https://github.com/unicef/publicgoods-website) README for an overview on how the various repositories come together.

* **open_pr** The data from this repo is synced with [publicgoods/products](https://github.org/publicgoods/products) as a collaborative and joint effort between multiple organizations to maintain a broader list of open source projects in the social impact sector. This stage checks for any changes on the data files, and if any are found, a PR is automatically opened against [publicgoods/products](https://github.org/publicgoods/products) to keep both repos in sync.

✅ ProTip: Include either `[skip pr]` or `[pr skip]` in either the commit message, the pull request title, or the pull request body to prevent this last action from happening automatically.
