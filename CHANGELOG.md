
- Fixed: collection is not limited to 8~10 items anymore
- Fixed: `peerDependencies` have been adjusted to minimal requirements
- Fixed: fetched `collection.json` now rely on the base url path
- Removed: useless whitespace in `collection.json`
- Changed: path(name) of the base url now have a trailing slash
- Changed: some changes in the files related to redux
  - lib/createStore -> lib/redux/createStore
  - lib/ducks/* -> lib/redux/modules
- Added: `setup` command to setup the project (for now only install required
appropriate peerDeps)
- Added: `MetadataProvider` to send the data you want to the React context
in a `metadata` attribute.
- Added: `__BASE_URL__` is now send as constantes.
- Added: `statinamic/lib/prepare-defined-values` helper to easily use JS
object with `webpack.DefinePlugin`
- Added: `defaultHead` option to `markdown-as-json-loader` loader to provide
default values

# 0.1.0 - 2015-10-21

💥
