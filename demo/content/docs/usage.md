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
Here is one quick and easy way to setup automatic deployment on each commit
pushed to master that should take a couple of minutes to setup:

- Get [gh-pages-deploy-sh](https://github.com/azu/gh-pages-deploy-sh) from npm
  ```console
  $ npm i -D gh-pages-deploy-sh
  ```
- [Enable Travis-CI for your repository](https://travis-ci.org/profile)
  (you may need to hit the `Sync` button to see your repository if it's need)
- Create a `.travis.yml` file with this
  ```yml
  language: node_js
  ```
- [Generate a new token](https://github.com/settings/tokens/new) with only
  `repo` or `public_repo` scopes.
- Copy and encrypt this new token
  ```console
  $ sudo gem install travis
  $ travis encrypt --add --repo YOU/YOUR_REPO GH_TOKEN=the_token_here
  ```
- Add this in your `package.json` `scripts` section
  ```json
  "ci-deploy": "if [ \"$TRAVIS_PULL_REQUEST\" = \"false\" ] && [ \"$TRAVIS_BRANCH\" = \"master\" ]; then gh-pages-deploy-sh 'dist/**/*'; fi;",
  "test": "npm run ci-deploy"
  ```
