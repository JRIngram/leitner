# Contributing
Hi there,

Thank you for taking interest in this project, and thank you for considering making a contribution to this project.

Contributions are certainly welcome here!

## Starting your contribution
When contributing to this repository, please either drop a comment on an open issue to say you want to work on that issue OR first discuss the change you wish to make by creating an issue on the GitHub page:
* For bug reports [use this template](https://github.com/JRIngram/leitner/issues/new?assignees=JRIngram&labels=bug&template=bug_report.md&title=).
* For feature requests [use this template](https://github.com/JRIngram/leitner/issues/new?assignees=JRIngram&labels=enhancement&template=feature_request.md&title=).
* For questions [no template is required](https://github.com/JRIngram/leitner/issues/new?assignees=JRIngram&labels=question), but please be as informative as possible.

## Pull Request Process
Once your contribution is ready to be added to the project, please do the following:
1. Ensure linting standards are conformed to.
2. If new code is written, ensure that unit tests have been writen to cover the new code.
3. Update the [changelog](https://github.com/JRIngram/leitner/blob/docs/doc-update-and-changelog/CHANGELOG.md). Add details of your update to the appropriate section beneath "Unreleased". Our changelogs are based on [KEEPACHANGELOG](https://keepachangelog.com/en/1.0.0/).
4. If required, update the [README](https://github.com/JRIngram/leitner/blob/docs/doc-update-and-changelog/README.md) or other related documentation with details of the change.
6. Follow the Pull Request template. It is in place to make pull requests easier to review.
7. Assign jringram as a reviewer.

## Running the tests
* `npm run tsc` to run [typescript compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html).
* `npm run test` to run [jest](https://jestjs.io/) tests.
* `npm run lint` to run linter.
* `test:e2e:firefox` and `test:e2e:chrome` to run end-to-end tests for the respective browsers.