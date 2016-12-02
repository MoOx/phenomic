---
title: Use Netlify CMS to manage your content of a Phenomic project
---

Once you configured [automatic deployment with Netlify](../../deploy/netlify/),
you may want to get a CMS to manage Phenomic content.

You are lucky, [Netlify](https://www.netlify.com/) is working on [netlify-cms](https://github.com/netlify/netlify-cms).

_Netlify CMS_ is a Content Management System for static site generators,
so we can use it with Phenomic.

---

⚠️ Netlify-cms is in active development and there is not a stable version for now

---

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
      <link rel="stylesheet" href="https://unpkg.com/netlify-cms/dist/cms.css" />
    </head>
    <body>
      <script src="https://unpkg.com/netlify-cms/dist/cms.js"></script>
    </body>
  </html>
  ```

2. `package.json`

  You need to configure the `source` and `assets` folders.

  ```json
  "phenomic": {
     "source": "content",
     "assets": "content/assets",
  }
  ```

3. `config.yml`:

  _Note: Be sure your source and assets folders are the same in you `package.json` and your `config.yml`._

  ```yml
  backend:
    name: github
    repo: owner/repo # replace by your repo
    branch: master # replace if you want netlify-cms publish on a different branch

  public_folder: "content" # the same as your phenomic.source in your package.json
  media_folder: "content/assets" # the same as your phenomic.assets in your package.json

  collections:
    - name: "post"
      label: "Post"
      folder: "content/posts" # a subfolder of your public_folder
      create: true
      card: {type: "alltype", text: "title"}
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

Next import it in your `webpack.config.js`

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
wait until your project is deployed on Netlify,
and you will be able to access to administration panel with this path : `{YOUR_NETLIFY_PROJECT}.netlify.com/admin`

## Netlify configuration

One more step. We need to specify an authentification provider on `Netlify`.

- Go on your `Github` settings and create a new developer application.
The only important field is `Authorization callback URL`.
**Make sure to set `https://api.netlify.com/auth/done`**.

- Go to the `Access` tab on your `Netlify` administration and configure your
Github provider with the `Client ID` and `Client Secret` generated on the
previous step.

You are done. You can now access to your admin panel via your `Github` account.

_Note: It's also possible to use Bitbucket as a provider._
