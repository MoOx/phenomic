---
title: Automatic deployment on GitHub Pages
---

**Be sure that you use the ``phenomic.CNAME`` option in your
[configuration](./configuration/)**

You will have multiple possibilities to deploy your `dist` folder on the
`gh-pages` branch.

You can define your own method by using something like
- a very simple script (see below)
- [buildbranch](https://www.npmjs.com/package/buildbranch)
- [git-directory-deploy](https://github.com/X1011/git-directory-deploy)
- [gh-pages](https://www.npmjs.com/package/gh-pages)

---

The following instructions show you how to do it by force pushing your build to
the ``gh-pages`` branch,
but it should not be very different from other solutions.

## Why force pushing?

Why do you want to keep track of the builded website when you can just rebuild
it any time?  
**Keep in mind that the branch can become huge since builded website is mainly
single line HTML and JSON file (diff is expensive).**  
By just keeping a single builded version, you avoid your repo to unnecessarily grow in size.

## Create the script

The script below will get a ``GIT_DEPLOY_REPO`` repo to deploy (or by default
the ``repository`` url of your ``package.json``).

You can paste it under ``./scripts/deploy.sh``.

### macOS / Linux

```sh
#!/usr/bin/env bash
GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -e 'process.stdout.write(require("./package.json").repository)')}

cd dist && \
$(npm bin)/rimraf .git
git init && \
git add . && \
git commit -m "Deploy to GitHub Pages" && \
git push --force "${GIT_DEPLOY_REPO}" master:gh-pages
```

⚠️ **If you want to use this script for a ``*.github.io`` repo, please adjust the
last line argument to ``src:master`` (if you source branch is `src`) in order
to deploy your source branch to ``master`` (which is the ``gh-pages`` branch for
github.io repos).**

### Windows

@todo (should not be hard to adapt the shell script above into a bat script,
please make a PR if you do it).

### Add a command to deploy

In your `package.json`, add the following items under the `scripts` section:

```js
{
  "scripts": {
    // ...
    "predeploy": "npm run build",
    "deploy": "./scripts/deploy.sh"
  }
}
```

Now run:

```sh
$ npm run deploy
```

It should be good!

#### Automatically with Travis-CI

Here is one quick and easy way to setup automatic deployment on each commit
pushed to master that should take a couple of minutes to setup:

##### Enable Travis-CI for your repository

- https://travis-ci.org/profile

You may need to hit the `Sync` button to see your repository if it's not there.

##### Create a `.travis.yml`

```yml
language: node_js
node_js:
  - '5'
  - '4'

# (by default, Travis will run "npm test" script when the language is node_js)

# deploy is run after "npm test"
deploy:
  # keep the build we just made with "npm test" (dist/)
  skip_cleanup: true

  # define the script to use for deployment
  provider: script
  script: ./scripts/deploy.sh

  # only run on one version of node (v5 here)
  on:
    branch: master
    node: '5'
```

##### Generate a new token

- https://github.com/settings/tokens/new

With only `repo` or `public_repo` scopes.

##### Copy and encrypt this new token

*Note: replace `{YOU/YOUR_REPO}` and `{YOUR_TOKEN}`.*

```sh
$ npm i -g travis-encrypt
$ travis-encrypt --add --repo {YOU/YOUR_REPO} GITHUB_TOKEN={YOUR_TOKEN}
```

## Adjust the deploy script

__You need to add a git user email and name:__

```sh
#!/usr/bin/env bash
GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -e 'process.stdout.write(require("./package.json").repository)')}

if [ "$TRAVIS" = "true" ]
then
  # git need this, on Travis-CI nobody is defined
  git config --global user.name "Travis CI" && \
  git config --global user.email "travis@travis-ci.org"
fi

cd dist && \
$(npm bin)/rimraf .git && \
git init && \
git add . && \
git commit -m "Deploy to GitHub Pages" && \
git push --force "${GIT_DEPLOY_REPO}" master:gh-pages
```

##### Ensure that the build is done on the CI

If not already made, add a `test` script in your `package.json` `scripts`
section.

```js
{
  "scripts": {
    "test": "npm run build",
    // ...
    "predeploy": "npm run build",
    "deploy": "./scripts/deploy.sh"
  }
}
```

Now, commit and push to master, wait a couple of minutes and it should be good.

_If you plan to rely on Travis only, you can remove the `predeploy` and
`deploy` scripts that we defined earlier._
Or you can keep it, just in case.
