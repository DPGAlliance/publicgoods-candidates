# Candidates for Digital Public Goods

This repository is used to manage the process of adding candidates for consideration as [Digital Global Public Goods](https://digitalpublicgoods.net/public-goods/). 

For those projects that match [the initial set of requirements](https://digitalpublicgoods.net/public-goods/), anyone can open a [Pull Request](https://github.com/unicef/publicgoods-candidates/pulls) on this repository as a submission following these guidelines:
- Data for each candidate is stored as a JSON file. JSON ([JavaScript Object Notation](https://www.json.org)) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.
- Each candidate json file is kept under the `candidates/` folder, add yours there. Use any other of the existing candidates as a reference for what fields to include, and how to enter the required information.
- Each candidate json file is validated using the [JSON-schema](https://json-schema.org) found at the root of this repository: [candidate-schema.json](candidate-schema.json). Each submission needs to pass the automated validation (`continuous-integration/travis-ci`) before being merged into the existing repository.

From the set of candidate json files, [this list](https://digitalpublicgoods.net/candidate/) of Digital Global Public Goods is automatically generated and kept in sync with the contents of this repo.
