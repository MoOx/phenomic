# Contributing to Phenomic

> ⚠️ wip

From opening a bug report to creating a pull request: every contribution is
appreciated and welcome. This document is here to answer most questions when it
comes to contribute to this project.

If you have any questions not answered by this document,
[contact us on our chat](https://gitter.im/MoOx/phenomic) or
[open an issue](https://github.com/phenomic/phenomic/issues/new)

---

## [Code of Conduct](CODE_OF_CONDUCT.md)

Phenomic has adopted a Code of Conduct that we expect project participants to
adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can
understand what actions will and will not be tolerated.

---

## Financial contributions

We also welcome financial contributions in full transparency on our
[open collective](https://opencollective.com/phenomic). Anyone can file an
expense. If the expense makes sense for the development of the community, it
will be "merged" in the ledger of our open collective by the core contributors
and the person who filed the expense will be reimbursed.

➡️ [opencollective.com/phenomic](https://opencollective.com/phenomic)

### Credits

#### Contributors

Thank you to all the people who have already contributed to phenomic!
<a href="graphs/contributors"><img src="https://opencollective.com/phenomic/contributors.svg?width=890" /></a>

#### Backers

Thank you to all our backers!
[[Become a backer](https://opencollective.com/phenomic#backer)]

<a href="https://opencollective.com/phenomic#backers" target="_blank"><img src="https://opencollective.com/phenomic/backers.svg?width=890"></a>

#### Sponsors

Thank you to all our sponsors! (please ask your company to also support this
open source project by
[becoming a sponsor](https://opencollective.com/phenomic#sponsor))

<a href="https://opencollective.com/phenomic/sponsor/0/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/1/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/2/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/3/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/4/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/5/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/6/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/7/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/8/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/phenomic/sponsor/9/website" target="_blank"><img src="https://opencollective.com/phenomic/sponsor/9/avatar.svg"></a>

---

### Workflow and Pull Requests

The core team will be monitoring for pull requests and reviewing changes.

_Before_ submitting a pull request, please make sure the following is done…

1. Fork the repo and create your branch from `master`. A guide on how to fork a
   repository: https://help.github.com/articles/fork-a-repo/

   Open your terminal (e.g. Terminal, Git Bash or Git Shell) and type:

   ```sh
   git clone https://github.com/<your_username>/phenomic
   cd phenomic
   git checkout -b my_branch
   ```

   Note: Replace `<your_username>` with your GitHub username

2. Phenomic uses [Yarn](https://yarnpkg.com/) for running development scripts.
   If you haven't already done so, please
   [install yarn](https://yarnpkg.com/en/docs/install).

   To check your version of Yarn and ensure it's installed you can type:

   ```sh
   yarn --version
   ```

   ⚠️ **We currently require yarn >= v1.0.0**

3. Run `yarn`. This will install all dependencies and prepare the repository to
   be ready for serious shit.

   ```sh
   yarn
   ```

4. If you've added code that should be tested, add tests.

5. If you've added/changed APIs, update the documentation accordingly.

6. Ensure the entire test suite passes via `yarn test`.

#### Additional Workflow for any changes made to website or docs

If you are making changes to the website or documentation, test the `docs`
folder and run the server to check if your changes are being displayed
accurately.

You can run a development server to check if the changes you made are being
displayed accurately by running `yarn run docs:start`.

You can modify `docs/*` code and get real times update in your browser.

**Keep in mind that whenever you modify Phenomic core/plugins you might need to
restart the dev server.** If you are doing change to Phenomic using the docs as
a playground, you may need to transpile sources. See below for more
informations.

## How to try a development build of Phenomic in another project

### Transpiling sources

Phenomic is written with ES2015+ and is using [babel](http://babeljs.io) for
transpilation. In order to have up to date code for real world usage, you need
to start a watcher from the root of the project

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

**You should probably add all others direct `@phenomic/*` deps from your
`package.json` if necessary.**

Then run your project via `yarn start`, and don't forget to restart dev server
if necessary (if you change the code of Phenomic itself).

---

## Bugs

### Where to Find Known Issues

We are using [GitHub Issues](https://github.com/phenomic/phenomic/issues) for
our public bugs. We will keep a close eye on this and try to make it clear when
we have a work in progress. **Before filing a new issue, try to make sure your
problem doesn't already exist.**

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. Please
provide a public repository with a runnable example. Then feel free to
[open an issue](https://github.com/phenomic/phenomic/issues/new).

#### Security Bugs

If you find a security issue, please first contact us directly before opening a
public issue.

---

## Releasing

Update necessary `bsconfig.json` (eg: `packages/reason/bsconfig.json`) version
number and stage the file in git (so release script gets it).

```
yarn release
```

The command will guide you.

Once it's done, go to https://github.com/phenomic/phenomic/releases. Click on
the new created tag and `Edit tag` to create release notes.

The way to create notes is easy. Just go to
https://github.com/phenomic/phenomic/commits/master and sort interesting commits
(since last release) in the template below that you will use as notes:

```
# 🎉 No breaking changes 🎉
or
# 💥 Includes _Breaking changes_

Blah blah

## 💥 Breaking changes

* [``@phenomic/PLUGIN_NAMEEEE``: AWESOME_MESSAGE](https://github.com/phenomic/phenomic/commit/HASSSSHHHHHHHHHHH),
  by @DOERRRRR, reported|requested by @REPORTERRRRR (in [#XXXXXXX](https://github.com/phenomic/phenomic/issues/XXXXXXX))


## 🐛 Bugfixes

...

##  👍 Improvements

...

## 🔥 New plugins

...

## ✨ New features

...

## 🌟 New Examples

...
```

---

## How to Get in Touch

* Chat - [#phenomic](https://gitter.im/phenomic/phenomic) on Gitter.
* Email - contact (at) phenomic (dot) io

## Code Conventions

* [Prettier](https://prettier.io) is used to avoid bikeshedding on quotes or
  semicolons.
* [Eslint](http://eslint.org) is used to help to keep the codebase clean, with a
  [strong config](https://github.com/MoOx/eslint-config-i-am-meticulous).
* Prefer ES6 syntax when possible.
* Use [Flow types](http://flowtype.org/).

## License

By contributing to Phenomic, you agree that your contributions will be licensed
under its MIT license.
