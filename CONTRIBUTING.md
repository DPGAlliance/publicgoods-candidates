# Contributing to Digital Public Goods

Looking to contribute something to Digital Public Goods? **Here's how you can help.**

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved. 
Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open 
source project. In return, they will reciprocate that respect in addressing your issue or assessing patches and features.

## Nominating Digital Public Goods

We are constantly accepting new nominations for Digital Public Goods. Follow the steps below, for a smooth and streamlined process.

### 1. Check that the project has not already been nominated

There are two ways to search the list of existing nominees:

* On the navigation bar (navbar) at the very top of this page (or any page within this repo), type the name of the project you wish
  to nominate and click `In this repository`. If the search returns any results, double check that are coming from the `nominees/` 
  folder. Follow the link from the results of the search to validate that they indeed refer to the same project that you had in mind.
  While you are at it, review that all the information is correct, and please make any changes if that is not the case.
  
* Visit https://digitalpublicgoods.net/explore to browse a list of all the projects already nominated, and within that page look for
  (`Ctr + F` or `command + F`) using your browser search functionality for any potential matches.

### 2. Nominate a new project

The easiest and most convenient way is to use our [online webform](https://docs.google.com/forms/d/e/1FAIpQLSdGzlBiecPBlVvJXmcMKXF3zdxASY8vGnrdnNNwp7fVKb169A/viewform?usp=sf_link). 
Upon submission of the form, a pull request will be created automatically with your answers.

Caveat: If you want your contribution to be counted towards [Hacktoberfest](https://hacktoberfest.digitalocean.com/), the webform will 
not work for you (as the PR will not be opened under your GitHub account). If you want your contribution to be counted, use the instructions below.

---

## Requirements and Considerations

For those projects that match [the initial set of requirements](https://digitalpublicgoods.net/nominate/), anyone can open a [Pull Request](https://github.com/unicef/publicgoods-candidates/pulls) on this repository as a submission following these guidelines:
- The `license` field is standardized using [SPDX identifiers](https://spdx.github.io/spdx-spec/appendix-I-SPDX-license-list/#i1-licenses-with-short-identifiers).

From the set of nominee json files, [this list](https://digitalpublicgoods.net/explore/) of Digital Global Public Goods is automatically generated and kept in sync with the contents of this repo.

### 2a. Alternate method: Add a new file

Data for each nominee is stored as a JSON file, which is essentially a text file that follows the JavaScript Object Notation (JSON), 
a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

Again you have two options:

* You can choose to make your contribution entirely through your browser. Navigate to the 
  [nominees folder](https://github.com/unicef/publicgoods-candidates/tree/master/nominees) of this repository, click on the `Add file` 
  button towards the top right of the page, and select `Create new file`. 
  
* Alternatively, you can create and edit a new file in your computer, after cloning this repository:
    - Using HTTPS:
    ```bash
    git clone https://github.com/enigmampc/covid-self-reporting.git
    ```
    - Using SSH:
    ```bash
    git clone git@github.com:enigmampc/covid-self-reporting.git
    ```
    Change to the `nominees/` folder, and create the new file there.
 
The filename must match the `name` field (see below) in [kebab-case](https://wiki.c2.com/?KebabCase), and `.json` as the extension. 
For example: [wikipedia.json](nominees/wikipedia.json) or [inlcusion-ukr.json](nominees/inclusion-ukr.json)

### 3a. Provide the required information

Use the [template](#template) below to include the requested information. Be sure to include the fields marked `REQUIRED` with the 
corresponding information, as well as any `OPTIONAL` fields. Delete any lines marked `OPTIONAL` that you don't want to include. 
For the `license` field, refer to the [Specifying Licenses](#specifying-licenses) section for the list of approved licenses.

### 4a. Submit

Scroll down and accept the suggested field for the commit message `Create <filename>`, and choose `Create a new branch for this commit and start a pull request`. Click on `Propose new file`
You are taken to a new page where you can leave a comment about the file you are about to propose to add, and finally click on `Create Pull Request`

### 5a. Validate your submission

Wait for the green checkmark to say `All checks have passed` to have confirmation that the file complies with the expected format, and is ready to merge pending a review. 
The automated tests that are run for all nominee files include: [JSON schema validation](/nominee-schema.json), linting (2-space indentation), 
ensuring consistent file naming, and ensuring a consistent order in the fields of the JSON files. Refer to the [development overview](/docs/development.md#overview)
for additional information.

If you see that the some tests fail, follow the link to the Continous Integration (CI) build, which will provide with the cause of the error. 
Please correct any errors until you see that all checks pass

## Template

```
{
        "name": "REQUIRED",
        "aliases": "[OPTIONAL: Array of strings - Abbreviations, initialisms, or alternate names, where relevant]",
        "description": "REQUIRED",
        "website": "REQUIRED",
        "license": [REQUIRED, Array of objects (at least one object is required):
                {
                        "spdx": "SDPX identifier for this license",
                        "licenseURL": "Link to the license under which this nominee is released"
                }
        ],
        "SDGs": [REQUIRED, Array of objects listing SDGs by number and name that this project is relevant to],
        "SDGevidence": [REQUIRED, provide links or information to support this relevance as a text field]
        "sectors": [OPTIONAL: Array of strings - List of sectors that this nominee addresses.]
        "type": [REQUIRED, Array of strings, multiple choice from "software", "data", "standards"],
        "repositoryURL": "OPTIONAL: Link to main repository",
        "organizations": [REQUIRED, Array of objects (at least one object is required):
                {
                        "name": "REQUIRED - Name of the organization",
                        "website": "OPTIONAL - Website of the organization",
                        "org_type": "REQUIRED - One of 'owner, 'maintainer', 'funder' or 'implementer',
                        "contact_name": "OPTIONAL - Name of contact individual in the organization",
                        "contact_email": "OPTIONAL - Email for contact individual in the organization"
                }
        ]
}
```

### Specifying Licenses

Licenses for open source software, open content and open data are vetted and approved by third party organizations, and we rely on their criteria in order to include them in our list of approved licenses. On top of it, we use [SPDX identifiers](https://spdx.org/licenses/) to easily, efficiently and uniquely refer to each license.

* **Open Content**: you are encouraged to use one of the Creative Commons licenses which allow for both derivatives and commercial reuse: [CC BY](https://creativecommons.org/licenses/by/4.0/) or [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), or dedicate content to the public domain ([CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)). We also accept the following licenses which do not allow for commercial reuse: [CC-BY-NC](https://creativecommons.org/licenses/by-nc/4.0/) and [CC-BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/).
* **Open Data**: only accepting [conformant licenses](https://opendefinition.org/licenses/) to the Open Definition from the Open Data Commons.
* **Open Source Software**: only accepting [approved licenses](https://opensource.org/licenses) from the Open Source Initiative.

Refer to the [current list of approved licenses](/docs/licenses.md) for additional information.

### Specifying SDGs

In order to make it easy for downstream projects to process data from the SDGs field, data must comply to the following format (you must select one or more elements of the following array, where an element is defined by a `number` and `string` pair):
```json
[
  [
    1,
    "No Poverty"
  ],
  [
    2,
    "Zero Hunger"
  ],
  [
    3,
    "Good Health and Well-Being"
  ],
  [
    4,
    "Quality Education"
  ],
  [
    5,
    "Gender Equality"
  ],
  [
    6,
    "Clean Water and Sanitation"
  ],
  [
    7,
    "Affordable and Clean Energy"
  ],
  [
    8,
    "Decent Work and Economic Growth"
  ],
  [
    9,
    "Industry, Innovation and Infrastructure"
  ],
  [
    10,
    "Reduced Inequalities"
  ],
  [
    11,
    "Sustainable Cities and Communities"
  ],
  [
    12,
    "Responsible Consumption and Production"
  ],
  [
    13,
    "Climate Action"
  ],
  [
    14,
    "Life Below Water"
  ],
  [
    15,
    "Life On Land"
  ],
  [
    16,
    "Peace, Justice and Strong Institutions"
  ],
  [
    17,
    "Partnerships for the Goals"
  ]
]
```

### Specifying Sectors

Similarly to the SDGs field above, the data in the `sectors` must be from the predefined list below (you should select one or more elements of the following array, where an element is a `string`):

```json
[
  "Advocacy",
  "Agriculture",
  "Anti-corruption",
  "Big Data",
  "Business Advocacy",
  "Capacity Development",
  "Centers of Excellence",
  "Civil society",
  "Climate",
  "Communication",
  "Conflict Resolution",
  "Consulting",
  "Corporate Partnerships",
  "Corporation and Business Management",
  "Data Collection",
  "Data Management & Policy",
  "Data Security",
  "Demobilization & Reintegration",
  "Democracy",
  "Development Impact",
  "Digital Development",
  "Digital/Data/Tech",
  "Disarmament",
  "Economics/Finance",
  "Education",
  "Emergency Response",
  "Employment",
  "Energy",
  "Engineering",
  "Enterprise Ecosystems",
  "Entertainment",
  "Environment",
  "Fair & Responsible Media",
  "Female Genital Mutilation",
  "Food",
  "Fragile States",
  "Gender and Minority Groups",
  "Governance",
  "Health",
  "Humanitarian",
  "Hunger",
  "Infrastructure",
  "Justice",
  "Livelihoods",
  "Logistics",
  "Management",
  "Media",
  "Membership Associations",
  "Midwifery",
  "Natural Resource Conflicts",
  "NGO",
  "Nutrition",
  "Peace",
  "Platform creation",
  "Religious Engagement",
  "Research",
  "Resource Management",
  "Security",
  "Stability",
  "Supply Chain Solutions",
  "Sustainability",
  "Sustainable Cities",
  "Training & Employment",
  "Transition",
  "Transparency & Accountability",
  "Travel and Hospitality",
  "Violent Extremism",
  "Water and Sanitation",
  "Workforce",
  "World Population",
  "Youth"
]
```

## License

By contributing content or code, you agree to dedicate your works to the public domain under the terms of [The Unlicense](LICENSE).
