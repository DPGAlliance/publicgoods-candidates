# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## Added
- Added `oppia.json` and `rasa.json` (#62)

## Changed
- Attempted to standardize website and URL fields from 30+ nominees (#62)

## [0.5.0] - 2020-09-11

### Added
- Added `antura-and-the-letters.json`
- Added [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/), and corresponding badge in README
- Added `marytts.json`, `octopus-microfinance.json`, `odoo.json`, `open-bank-project.json`, `opencbs.json`, `openrefine.json`, `reconcile.cvs`, `safe-open-source-microfinance-suite.json`, `x-road.json` (#31)
- Added `recordtrac.json` (#34)
- Added `smart-kyc.json` (#35)
- Added `openhie.json` (#36)
- Added `dspace.json` (#37)
- Added `hapi-fhir.json` (#38)
- Added `project-catalog-management-tool.json` (#39)
- Added `openach.json` (#40)
- Added `sempo.json` (#42)
- Added `openmined.json` (#43)
- Added `mit-climate-primer.json` (#44)
- Added `lockdown-learning-repository.json` (#45)
- Added CI badge
- Added a newline at the end of each JSON nominee file, and adjusted the CI accordingly (#48)
- Added `meilisearch.json` (#50)
- Added `code.etalab.gouv.fr.json` (#52)
- Added `oer-plan-ceibal-uruguay.json` (#53)
- Added `typescript.json` and `webpack.json` (#55)
- Added `tagcoding.json` (#60)

### Changed
- Updated the license requirements for content, data and software nominees. Documented explicitly which licenses are approved and why, and updated the `nominee-schema.json` accordingly (#56)

### Removed 
- Removed `eduapp4syria.json`
- Removed 5 prior nominees as a result of updating the license requirements above" `acceda.json`, `archive.json`, `energyplus.json`, `pulseox.json`, `stethoscope.json`


## [0.4.0] - 2020-04-15
### Changed
- Modified `nominee-schema.json` to split the `data` type into `data` and `content`. Re-classified all nominees originally tagged as data accordingly.
- Added `H5P` and `WHO-app` as new nominees.
- Switched CI from Travis to GitHub Actions.
- Excluded nominees with `ND` licenses and moved them out from `nominees/` into `excluded-nd`.

## [0.3.0] - 2020-03-05
### Added
- Added `scripts/migrate-v0.3.0.js` to automatically migrate to the new version of the JSON schema.
- Imported more than 200 new nominees from [publicgoods/products](https://github.com/publicgoods/products).
- Added `scripts/check-filenames.bash` to automatically check the proper naming of nominees.
- Added `scripts/order-fields.js` to automatically check the proper ordering of properties in each nominee file.

### Changed
- Modified 'nominee-schema.json' to match the product-schema.json available at https://github.com/publicgoods/data-schema.

## [0.2.1] - 2020-10-15
### Added
- Added 32 more nominees supported by UNICEF Venture Fund.
- Added `scripts/csvToJson.js` to automatically parse a spreadsheet containing a list of nominees and their attributes and generate json files for each nominee.

### Changed
- Modified `nominee-schema.json` to add a new attribute `supported_by`, which is an array of objects initially containing one property `org_name`.

## [0.2.0] - 2020-01-10
### Added
- Added 4 more nominees from the energy sector: caltrack, greenbutton, openeemeter, seed
- Added 'scripts/migrate-v0.2.0.js' that was run once to automate the change in the license field described below

### Changed
- The 'license' field has been migrated from a simple array to an array of objects where each object has the property 'spdx' and the 'link' for that license. The 'license_link' property has thus been removed.

## [0.1.0] - 2019-12-16
### Added
- Added this changelog. All previous changes were not tracked.
- Added (UN)LICENSE dedicating this software to the public domain.

### Changed
- Changed language from `candidates` to `nominees` to match the recent changes in [digitalpublicgoods.net](https://digitalpublicgoods.net)
- Renamed folder from `candidates/` to `nominees/`, as well as `candidate-schema.json` to `nominee-schema.json`

[0.5.0]: https://github.com/unicef/publicgoods-candidates/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/unicef/publicgoods-candidates/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/unicef/publicgoods-candidates/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/unicef/publicgoods-candidates/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/unicef/publicgoods-candidates/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/unicef/publicgoods-candidates/releases/tag/v0.1.0
