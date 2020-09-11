# Development

This document contains additional information related to the development of this repo.

## CI

This repository relies on **GitHub Actions** for its Continuous Integration. The CI configuration can be found in [.github/workflows/main.yml](../.github/workflows/main.yml)

When merging to master, the CI will automatically open a pull request (PR) against [publicgoods/products](https://github.com/publicgoods/products) to keep both repositories in sync if there are any changes to any of the JSON nominee files in `nominees/`. Include either `[skip pr]` or `[pr skip]` in either the commit message, the pull request title, or the pull request body to prevent this action from happening automatically.