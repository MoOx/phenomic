---
priority: 3
title: CLI commands
subtitle: "Detail about individual commands"
---

## CLI installation

⚠️ _We recommend you **not** to install Phenomic CLI as a global package on your
OS._

As shown in [tutorials](/en/tutorials), we recommend you to install this package
locally to your project and use aliases in your `package.json`.

```json
{
  "...": "...",
  "devDependencies": {
    "@phenomic/cli": "^1.0.0-beta.2",
    "@phenomic/core": "^1.0.0-beta.2",
    "@phenomic/...": "..."
  },
  "scripts": {
    "start": "phenomic start",
    "build": "phenomic build",
    "preview": "phenomic preview"
  }
}
```

## CLI commands

### `$ phenomic start`

This command starts the development server. It will show you the address you
should use to see your website and will show you additional informations like
bundler status, content api messages etc.

### `$ phenomic build`

This command starts the static build process and will render all possibles urls
(according to your routes and queries) in your
[`outdir`](./configuration.md#configuration-source) folder.

### `$ phenomic preview`

This command starts the static build process (exactly like `build` command) and
also directly serve the result. Address will be displayed to you. This is handy
to have a preview of what the result will looks like on your static server as
you may sometimes encounter minor differences between development server and
static build.
