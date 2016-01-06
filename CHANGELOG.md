- Changed: boilerplate is now non-transpiled and in `statinamic/boilerplate`
([#66](https://github.com/MoOx/statinamic/issues/66))
- Changed: switch to babel@^6.0.0

## Under the hood

- Changed: boilerplate to get hot loading and visual errors rely on
  [babel-preset-react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre)
- Changed: eslint config extends
  [eslint-config-i-am-meticulous](https://github.com/MoOx/eslint-config-i-am-meticulous)
- Changed: tests are now base on
  [ava](https://github.com/sindresorhus/ava/)
- Added: code coverage using
  [nyc](https://github.com/bcoe/nyc) &
  [coveralls](http://coveralls.io/)


# 0.5.1 - 2015-11-07

- Fixed: windows compatibility issues

# 0.5.0 - 2015-11-06

- Removed: `statinamic/lib/enhance-collection` do not add siblings by default.
You will need to pass `{ addSiblingReferences: true }` in the options to get
next and previous references to collection items.
- Added: `statinamic/lib/enhance-collection` can now filter keys using a RegExp.
- Added: when `--production` is used, `process.env.NODE_ENV` is automatically
set to `production`.

# 0.4.3 - 2015-11-04

- Fixed (in boilerplate): collection cache can now be used for static rendering
(ref [putaindecode#499](https://github.com/putaindecode/putaindecode.fr/issues/499))
- Fixed: escape end of script tags in JSON of `__INITIAL_STATE__`
(ref [putaindecode#501](https://github.com/putaindecode/putaindecode.fr/issues/501))

# 0.4.2 - 2015-11-03

- Fixed: feed should now contains all entries
(same bug as fixed in 0.4.1, but for rss feed instead of collection.json)

# 0.4.1 - 2015-11-03

- Fixed: `collection.json` should now contains all entries, even for the static
build (round 2)

# 0.4.0 - 2015-11-02

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
