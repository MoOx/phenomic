# Contributing to Phenomic 

> ⚠️ wip

From opening a bug report to creating a pull request: every contribution is
appreciated and welcome.
This document is here to answer most questions when it comes to contribute to this project.

If you have any questions not answered by this document,
[contact us on our chat](https://gitter.im/MoOx/phenomic)
or [open an issue](https://github.com/phenomic/phenomic/issues/new)

---

## [Code of Conduct](CODE_OF_CONDUCT.md)

Phenomic has adopted a Code of Conduct that we expect project participants to adhere to.
Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

---

## Support Phenomic

One way to help us to move forward with Phenomic is to ensure we have time to work on it. To help us, you can back us via our OpenCollective page.

➡️ [opencollective.com/phenomic](https://opencollective.com/phenomic)

All donations are huge for us. Even 1$ is enough to make the entire team & community happy.

--- 

### Workflow and Pull Requests

The core team will be monitoring for pull requests and reviewing changes.

*Before* submitting a pull request, please make sure the following is done…

1. Fork the repo and create your branch from `master`.
   A guide on how to fork a repository: https://help.github.com/articles/fork-a-repo/
   
   Open your terminal (e.g. Terminal, Git Bash or Git Shell) and type:
   ```sh
   git clone https://github.com/<your_username>/phenomic
   cd phenomic
   git checkout -b my_branch
   ```
   Note:
   Replace `<your_username>` with your GitHub username

2. Phenomic uses [Yarn](https://yarnpkg.com/)
   for running development scripts. If you haven't already done so,
   please [install yarn](https://yarnpkg.com/en/docs/install).
   
   To check your version of Yarn and ensure it's installed you can type:
   ```sh
   yarn --version
   ```
   ⚠️ **We currently require yarn >= v1.0.0**

3. Run `yarn`.
    This will install all dependencies and prepare the repository to be ready for serious shit.
    ```sh
    yarn
    ```

4. If you've added code that should be tested, add tests.

5. If you've added/changed APIs, update the documentation accordingly.

6. Ensure the entire test suite passes via `yarn test`.

#### Additional Workflow for any changes made to website or docs

If you are making changes to the website or documentation, test the ``docs`` folder
and run the server to check if your changes are being displayed accurately. 

You can run a development server to check if the changes you made are being
displayed accurately by running `yarn run docs:start`.

You can modify ``docs/*`` code and get real times update in your browser.

**Keep in mind that whenever you modify Phenomic core/plugins you might need to restart the dev server.**
If you are doing change to Phenomic using the docs as a playground, you may need to transpile sources. See below for more informations.

## How to try a development build of Phenomic in another project

### Transpiling sources

Phenomic is written with ES2015+ and is using [babel](http://babeljs.io) for transpilation.
In order to have up to date code for real world usage, you need to start a watcher from the root of the project

```console
yarn run watch
```

This will update transpilated files as soon as you modify one.

### Use a local Phenomic version your own project

From Phenomic git repo

```console
yarn run links
```

This should create local links for each packages.

Then, in your project:

```console
yarn link @phenomic/core @phenomic/preset-react-app ...
```

**You should probably add all others direct `@phenomic/*` deps from your ``package.json`` if necessary.**

Then run your project via ``yarn start``, and don't forget to restart dev server if necessary (if you change the code of Phenomic itself).

---

## Bugs

### Where to Find Known Issues

We are using [GitHub Issues]((https://github.com/phenomic/phenomic/issues) for our public bugs.
We will keep a close eye on this and try to make it clear when we have a work in progress.
**Before filing a new issue, try to make sure your problem doesn't already exist.**

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. Please provide a public repository with a runnable example.
Then feel free to [open an issue](https://github.com/phenomic/phenomic/issues/new).

#### Security Bugs

If you find a security issue, please first contact us directly before opening a public issue.

---

## How to Get in Touch

* Chat - [#phenomic](https://gitter.im/MoOx/phenomic) on Gitter.
* Email - contact (at) phenomic (dot) io

## Code Conventions

* [Prettier](https://prettier.io) is used t avoid bikeshedding on quotes or semicolons.
* [Eslint](http://eslint.org) is used to help to keep the codebase clean, with a [strong config](https://github.com/MoOx/eslint-config-i-am-meticulous).
* Prefer ES6 syntax when possible.
* Use [Flow types](http://flowtype.org/).

## License

By contributing to Phenomic, you agree that your contributions will be licensed under its MIT license.
