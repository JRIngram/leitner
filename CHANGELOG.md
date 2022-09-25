[1.0.0]: https://github.com/JRIngram/leitner/releases/tag/v1.0.0
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
* Debounce to buttons so button actions can't be triggered for 400ms after their initial triggering.
* Donation link
### Changed
* Change items in NavBar from `<p>` to `<button>` to improve accessibility.
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