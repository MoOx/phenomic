- Fixed: add missing `npm-install-package` dependency
([#44](https://github.com/MoOx/statinamic/issues/44))
- Removed: `NotFound` and `Loading` props of `PageContainer`
- Changed: Statinamic setup command now saves peer deps as dev deps
([#45](https://github.com/MoOx/statinamic/pull/45))
- Added: `PageError` component can be used in `PageContainer` when page have
errors.
- Added: `PageLoading` component can be used in `PageContainer` when page are
loading.

# 0.3.0 - 2015-10-30

- Changed: some peer deps versions updated
- Changed: `markdown-as-json-loader` is now `md-collection-loader`
- Added: ability to generate rss feeds using `md-collection-loader`

# 0.2.0 - 2015-10-29

- Removed: useless whitespace in `collection.json`
- Changed: path(name) of the base url now have a trailing slash
- Changed: some changes in the files related to redux
  - lib/createStore -> lib/redux/createStore
  - lib/ducks/* -> lib/redux/modules
- Fixed: collection is not limited to 8~10 items anymore
- Fixed: `peerDependencies` have been adjusted to minimal requirements
- Fixed: fetched `collection.json` now rely on the base url path
- Added: `setup` command to setup the project (for now only install required
appropriate peerDeps)
- Added: `MetadataProvider` to send the data you want to the React context
in a `metadata` attribute.
- Added: `__BASE_URL__` is now send as a constant.
- Added: `statinamic/lib/prepare-defined-values` helper to easily use JS
object with `webpack.DefinePlugin`
- Added: `defaultHead` option to `markdown-as-json-loader` loader to provide
default values
- Added: some documentation :)

# 0.1.0 - 2015-10-21

💥
