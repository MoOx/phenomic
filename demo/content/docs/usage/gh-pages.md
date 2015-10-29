---
title: Automatic deployment on GitHub Pages
---

You will have multiples possibilities to deploy your `dist` folder on the
`gh-pages` branch.
You can use your own method, using something like
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- [buildbranch](https://www.npmjs.com/package/buildbranch)
- [git-directory-deploy](https://github.com/X1011/git-directory-deploy)

The following instructions show you how to do it with `git-directory-deploy`,
but it should not be very different other solutions.

This script is pretty solid, works on Travis-CI, play well with unstashed
changes and handle errors pretty nicely.

### Get the dependency

The following instructions will get the `deploy.sh` script for you, at the right
place

```console
$ cd scripts
$ wget https://github.com/X1011/git-directory-deploy/raw/master/deploy.sh
$ chmod +x deploy.sh
$ cd ..
```

### Add a command to deploy

In your `package.json`, add the following items under the `scripts` section

```json
{
  "predeploy": "npm run static",
  "deploy": "./scripts/deploy.sh"
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
  - 4
```

##### Generate a new token

- https://github.com/settings/tokens/new

With only `repo` or `public_repo` scopes.

##### Copy and encrypt this new token

```console
$ sudo gem install travis
$ travis encrypt --add --repo YOU/YOUR_REPO GH_TOKEN=the_token_here
```

##### Add a `test` script in your `package.json` `scripts` section

**Note: adjust the USER/REPO part in the git repository address**

```json
{
  "predeploy": "npm run static",
  "deploy": "./scripts/deploy.sh",
  "_ci-deploy": "GIT_DEPLOY_REPO=https://$GH_TOKEN@github.com/USER/REPO.git ./scripts/deploy.sh",
  "ci-deploy": "if [ \"$TRAVIS_PULL_REQUEST\" = \"false\" ] && [ \"$TRAVIS_BRANCH\" = \"master\" ]; then npm run _ci-deploy; fi;",
  "test": "npm run ci-deploy"
}
```

Now, commit and push to master, wait a couple of minute and it should be good.
