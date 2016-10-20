---
title: Automatic deployment of your Phenomic project with Netlify
---

[Netlify](https://www.netlify.com/) is a service that offers
CDN, Continuous deployment, 1 click HTTPS, and all the services you need
to easily publish your website.

## Tell Netlify which node version to use

First, you need to tell to Netlify to use `node` 5 or later.
Netlify use `nvm`, a _Node Version Manager_, to manage `node` versions.

To specify `node` version to Netlify, you have to create an `.nvmrc` file, to the root of your project directory, with the content :

```
6.*
```

## Connect your repository to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Create a new Netlify site : [app.netlify.com/sites](https://app.netlify.com/sites)
3. Link your site to your `Github` or `Bitbucket` repository
4. Authorize Netlify application on your `Github` account
5. Configure deploys on Netlify
  - **Repository**: `YOUR_REPO_URL`
  - **Branch**: `YOUR_BRANCH` (master by default)
  - **Build command**: `npm run build`
  - **Public folder**: `/dist`

Now, when you will push a commit to your `YOUR_BRANCH` branch
