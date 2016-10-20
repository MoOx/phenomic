---
title: Automatic deployment on Netlify Pages
---

# Tell Netlify which node version to use

First, you need to tell to `Netlify` to use `node` 5.
`Netlify` use `nvm`, a `Node Version Manager`, to manage `Node` versions.

To specify `node` version to `Netlify`, you have to create an `.nvmrc` file, to the root of your project directory, with the content :

`5.*`


# Connect your repository to Netlify

1. Log in to `Netlify`
2. Create a new `Netlify` site : https://app.netlify.com/sites
3. Link your site to your `Github` or `Bitbucket` repository
4. Authorize `Netlify` application on your `Github` account
5. Configure deploys on `Netlify`
  - **Repository**: `YOUR_REPO_URL`
  - **Branch**: `YOUR_BRANCH` (master by default)
  - **Build command**: `npm run build`
  - **Public folder**: `/dist`

Now, when you will push a commit to your `YOUR_BRANCH` branch
