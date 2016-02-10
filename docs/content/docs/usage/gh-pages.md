---
title: Automatic deployment on GitHub Pages
---

**Be sure that you use the ``statinamic.CNAME`` option in your
``package.json`. See [Configuration](./configuration/)**

You will have multiples possibilities to deploy your `dist` folder on the
`gh-pages` branch.
You can use your own method, using something like
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- [buildbranch](https://www.npmjs.com/package/buildbranch)
- [git-directory-deploy](https://github.com/X1011/git-directory-deploy)

---

The following instructions show you how to do it with `gh-pages`,
but it should not be very different other solutions.

This package works on Travis-CI.

### Get the dependency

```console
$ npm i -D gh-pages
```

To learn a thing or two, try

```console
$ ./node_modules/.bin/gh-pages --help
```

### Add a command to deploy

In your `package.json`, add the following items under the `scripts` section

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages"
  }
}
```

Now run

```console
$ npm run deploy
```

It should be good!

#### Automatically with Travis-CI

Here is one quick and easy way to setup automatic deployment on each commit
pushed to master that should take a couple of minutes to setup:

##### Enable Travis-CI for your repository

- https://travis-ci.org/profile

You may need to hit the `Sync` button to see your repository if it's need.

##### Create a `.travis.yml`

```yml
language: node_js
node_js:
  - '5'
  - '4'

# (by default, Travis will run "npm test" script when language is node_js)

# deploy is run after "npm test"
deploy:
  # keep build we just made with "npm test" (dist/)
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

```console
$ npm i -g travis-encrypt
$ travis-encrypt --add --repo {YOU/YOUR_REPO} GITHUB_TOKEN={YOUR_TOKEN}
```

## Create a script

Here is an example of a small script that will use gh-pages.
You can place it in ``./scripts/deploy.sh``.
Please read and adjust it carefully.

```sh
#!/usr/bin/env bash

if [ "$TRAVIS" = "true" ]
then
  # git need this, on Travis-CI nobody is defined
  git config --global user.email "gh-pages@localhost"
  git config --global user.name "npm gh-pages"
fi

./node_modules/.bin/gh-pages \
  # ADJUST YOUR REMOTE HERE
  --repo https://$GITHUB_TOKEN@github.com/{YOU/YOUR_REPO}.git \
  # TO HIDE YOUR $GITHUB_TOKEN!
  # this is really important
  --silent
```

##### Add a `test` script in your `package.json` `scripts` section

```json
{
  "scripts": {
    "test": "npm run build",
  }
}
```

Now, commit and push to master, wait a couple of minute and it should be good.

**If you plan to rely on Travis only, you can probably remove `predeploy` and
`deploy` script we defined earlier.**
