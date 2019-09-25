# Candidates for Digital Public Goods

This repository is used to manage the process of adding candidates for consideration as [Digital Global Public Goods](https://digitalpublicgoods.net/public-goods/). This is one of four interconnected repositories; refer to the [publicgoods-website](https://github.com/unicef/publicgoods-website) for an overview.

## How to submit a new candidate for a Digital Public Good

1. Go to the [candidates](https://github.com/unicef/publicgoods-candidates/tree/master/candidates) folder, and click on `Create new file`
2. Name the new file with the name of the digital public good (or its initalism if the name is too long), and `.json` as the extension. For example: [wikipedia.json](https://github.com/unicef/publicgoods-candidates/blob/master/candidates/wikipedia.json) or [dhis2.json](https://github.com/unicef/publicgoods-candidates/blob/master/candidates/dhis2.json)
3. Use the [template](https://github.com/unicef/publicgoods-candidates#template) from the section below to include the requested information. Be sure to include the fields marked `REQUIRED` with the corresponding information, as well as any `OPTIONAL` fields. Delete any lines marked `OPTIONAL` that you don't want to submit.
4. Scroll down and accept the suggested field for the commit message `Create <filename>`, and choose `Create a new branch for this commit and start a pull request`. Click on `Propose new file`
5. You are taken to a new page where you can leave a comment about the file you are about to propose to add, and finally click on `Create Pull Request`
6. Wait for the green checkmark to say `All checks have passed` to have confirmation that the file complies with the expected format, and is ready to merge pending a review.

## Template

```
{
        "name": "REQUIRED",
        "initialism": "OPTIONAL",
        "description": "REQUIRED",
        "license": "REQUIRED",
        "license_link": "OPTIONAL",
        "website": "REQUIRED",
        "SDGs": [REQUIRED, list SDGs by number],
        "type": [REQUIRED, multiple choice from "software", "data", "standards"],
        "repo_main": "OPTIONAL: Link to main Github repository"
}
```

## Requirements and Considerations

For those projects that match [the initial set of requirements](https://digitalpublicgoods.net/public-goods/), anyone can open a [Pull Request](https://github.com/unicef/publicgoods-candidates/pulls) on this repository as a submission following these guidelines:
- Data for each candidate is stored as a JSON file. JSON ([JavaScript Object Notation](https://www.json.org)) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.
- Each candidate json file is kept under the `candidates/` folder, add yours there. Use any other of the existing candidates as a reference for what fields to include, and how to enter the required information.
- Each candidate json file is validated using the [JSON-schema](https://json-schema.org) found at the root of this repository: [candidate-schema.json](candidate-schema.json). Each submission needs to pass the automated validation (`continuous-integration/travis-ci`) before being merged into the existing repository.

From the set of candidate json files, [this list](https://digitalpublicgoods.net/candidate/) of Digital Global Public Goods is automatically generated and kept in sync with the contents of this repo.
