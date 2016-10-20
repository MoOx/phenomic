---
title: Use Netlify CMS to manage your content of a Phenomic project
---

Once you configured [automatic deployment on Netlify Pages](netlify-pages/), you may want to add the CMS feature to Phenomic ?
You are lucky, [Netlify](https://www.netlify.com/) is working on [netlify-cms](https://github.com/netlify/netlify-cms).

⚠️ Netlify-cms is in active development and there is not a stable version for now

_Netlify CMS_ is a Content Management System for static site generators,
so we can use it with Phenomic.

Let's see how to configure it

## Install

The installation is pretty simple.

You need to create an `/admin` folder to the root of your project directory
with 2 files :

1. `index.html`:

  ```html
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Content Manager</title>
      <link rel="stylesheet" href="//cms.netlify.com/assets/cms.css" />
    </head>
    <body>
      <script src="//cms.netlify.com/assets/vendor.js"></script>
      <script src="//cms.netlify.com/assets/cms.js"></script>
    </body>
  </html>
  ```

2. `config.yml`:
  _Note: PHENOMIC_SOURCE & ASSETS_FOLDER are configurable in your `package.json`.
  Replace those in the section below_

  ```yml
  backend:
    name: github-api
    repo: {YOUR_GIT_REPO} # owner/repo
    branch: {YOUR_BRANCH} # master

  public_folder: "{PHENOMIC_SOURCE}"
  media_folder: "{PHENOMIC_SOURCE}/{ASSETS_FOLDER}"

  collections:
    - name: "post"
      label: "Post"
      folder: "{PHENOMIC_SOURCE}/posts"
      create: true
      fields:
        - {label: "Title", name: "title", widget: "string"}
        - {label: "Body", name: "body", widget: "markdown"}
      meta:
        - {label: "Publish Date", name: "date", widget: "datetime"}
  ```  

  For more informations about the `config.yml`, checkout the [official documentation](https://github.com/netlify/netlify-cms#installing)

## Webpack configuration

We need to install the `Copy Webpack Plugin` :

```console
npm install -D copy-webpack-plugin
```

Next import it in your `webpack.config.babel.js`

```js
import CopyWebpackPlugin from "copy-webpack-plugin"

```

Now, we have to tell to `Webpack` to copy our `/admin` folder :

```js
  plugins: [
    new CopyWebpackPlugin([
      {from: 'admin', to: 'admin'},
    ]),
  ]
```

At this step, you can push modifications to your repository,
wait until your project is deployed on `Netlify pages`,
and you will be able to access to administration panel with this path : `{YOUR_NETLIFY_PROJECT}.netlify.com/admin`

## Netlify configuration

One more step. We need to specify an authentification provider on `Netlify`.

- Go in your account `Github` settings and create a new developer application.
The only important field is `Authorization callback URL`. Make sure to set `https://api.netlify.com/auth/done`.

- Go to the `Access` tab on your `Netlify` administration and configure your
`Github` provider with the `Client ID` and `Client Secret` generated on the
previous step

You are done. You can now access to your admin panel via your `Github` account.

_Note: It's possible to use Bitbucket as a provider_
