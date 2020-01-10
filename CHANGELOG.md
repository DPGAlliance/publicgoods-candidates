# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[0.2.0]: https://github.com/unicef/publicgoods-candidates/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/unicef/publicgoods-candidates/releases/tag/v0.1.0
