---
title: Automatic deployment on GitHub Pages
---

You will have multiples possibilities to deploy your `dist` folder on the
`gh-pages` branch.
You can use your own method, using something like
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- [buildbranch](https://www.npmjs.com/package/buildbranch)
- [git-directory-deploy](https://github.com/X1011/git-directory-deploy)

---

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

By default, this script will deploy the `dist/` folder on your `gh-pages`
branch.

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

env:
  global:
    # for ./scripts/deploy.sh
    # AJUST THE REPO URL HERE
    # BECAREUL, KEEP .git AT THE END
    - GIT_DEPLOY_REPO=https://$GH_TOKEN@github.com/YOU/YOUR_REPO.git
    - GIT_DEPLOY_DIR=dist
    # GH_TOKEN
    # now we will have to add a github token, see doc below
```

##### Generate a new token

- https://github.com/settings/tokens/new

With only `repo` or `public_repo` scopes.

##### Copy and encrypt this new token

*Note: replace `you/your_repo` and `your_token`.*

```console
$ sudo gem install travis
$ travis encrypt --add --repo you/your_repo GH_TOKEN=your_token
```

##### Add a `test` script in your `package.json` `scripts` section

*Note: adjust the `YOURDOMAIN.EXT` by your hostname (eg: `johndoe.com`).*

```json
{
  "scripts": {
    "test": "npm run static",
    "posttest": "echo 'YOURDOMAIN.EXT' > dist/CNAME && touch dist/.nojekyll"
  }
}
```

*Note: ``.nojekyll`` file avoid GitHub to waste time on their deployment with
their default Jekyll engine and allow you to have file and assets that are
prefixed by ``_`` (per Jekyll convention, they reserved to private files, not deployed by default).*

Now, commit and push to master, wait a couple of minute and it should be good.

**If you plan to rely on Travis only, you can probably remove `predeploy` and
`deploy` script we defined earlier.**
