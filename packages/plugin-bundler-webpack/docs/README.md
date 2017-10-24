# @phenomic/plugin-bundler-webpack

## Custom webpack config

This plugin provides a [minimal webpack config](../src/webpack.config.js) (to
make it easy for newbies), but it should auto read your custom
`webpack.config.js` at the root of you project.

Providing your own webpack config should help you if you want custom loaders.

Phenomic requirements should be automatically injected (eg:
`process.env.NODE_ENV`).

⚠️ _Note that your webpack config won't be merged with the default of this
plugin. It's up to you to start from this one if you want to keep it and only
add some loaders._
