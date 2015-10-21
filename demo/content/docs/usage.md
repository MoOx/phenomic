---
title: How to use statinamic
---

## Write

You can write your files using
[Markdown](https://en.wikipedia.org/wiki/Markdown).

Check out
[this documentation](https://github.com/MoOx/statinamic/tree/master/demo/content)
as an example.

_More to come._

## Automatic deployment on GitHub Pages

You will have multiples possibilities to deploy your `dist` folder on the
`gh-pages` branch.

### Get a package to automate deployment on a branch

- [gh-pages](https://www.npmjs.com/package/gh-pages)

```console
$ npm i -D gh-pages
```

### Add a script to deploy

#### Manually, on the gh-pages branch

In your `package.json`, add the following `scripts`

```json
{
  "predeploy": "npm run static",
  "deploy": "gh-pages -d dist"
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

##### Add `test` script in your `package.json`

```json
{
  "ci-deploy": "if [ \"$TRAVIS_PULL_REQUEST\" = \"false\" ] && [ \"$TRAVIS_BRANCH\" = \"master\" ]; then gh-pages -d dist; fi;",
  "test": "npm run ci-deploy"
}
```

Now, commit and push to master, wait a couple of minute and it should be good.

**Note: `gh-pages` package doesn't seems to work well on Travis, please track this
issue https://github.com/MoOx/statinamic/issues/27**
