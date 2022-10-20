# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2022-10-20
**breaking change** Code base structure is now changed. Server and Client require different instructions to run and use different `package.json` files. See the `README.md` file.
### Added
* Debounce to buttons so button actions can't be triggered for 400ms after their initial triggering.
* Donation link
### Changed
* Change items in NavBar from `<p>` to `<button>` to improve accessibility.
* Code base structure is now changed. Server and Client require different instructions to run and use different `package.json` files.
* End-to-end tests now use Cypress rather than TestCafe.
### Deprecated
### Removed
### Fixed
* Fixed eslint config and now is able to perform lint.
* Fixed linting errors associated with the above.
### Security
* Bumps axios from 0.21.1 to 0.21.2.


## [1.0.0] - 2021-08-30
### Added
* Ability to create cards, quizzes and study them.
* Card "boxes".
* Cards get moved into different boxes depending on if the student got them correct or not when studying a quiz.
* Creation of CHANGELOG, LICENCE, README and Contributing
* Unit and E2E tests

[1.0.0]: https://github.com/jringram/leitner/releases/tag/v1.0.0
[2.0.0]: https://github.com/jringram/leitner/releases/tag/v2.0.0