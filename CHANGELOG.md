- Changed: build and client scripts now require an exports value
  that must contains layouts, metadata and routes.
  This values should be strings.
  See changes in ``boilerplate/scripts/build.js``
  ([#145](https://github.com/MoOx/statinamic/pull/145))
- Fixed: Redux devtools cause invalid checksum
  ([#152](https://github.com/MoOx/statinamic/issues/152))
- Fixed: Homepage url is not prerendered as ``//`` if you don't have a pathname
  in your base url (``package.json/homepage``)
  ([#104](https://github.com/MoOx/statinamic/pull/104))
- Fixed: ability to pass custom webpack devServer config
  ([#157](https://github.com/MoOx/statinamic/issues/157))
- Added: during development for pre-rendering, dev server will refresh
  all files for each render
  ([#145](https://github.com/MoOx/statinamic/pull/145))
- Added: custom routes are supported if you use a `route` field in your markdown
  front matter.
  See example in ``boilerplate/content/404.md``
  ([#47](https://github.com/MoOx/statinamic/pull/47))
- Added: hot loading support for markdown content.
  See changes in ``boilerplate/scripts/index-client.js``
  ([#11](https://github.com/MoOx/statinamic/pull/11))
- Added: boilerplate now enable source maps by default during development.
  See changes in ``boilerplate/scripts/webpack.config.babel.js``
  ([#170](https://github.com/MoOx/statinamic/pull/170))

## Under the hood

- Changed: codecov is used for code coverage instead of coverall.

# 0.7.1 - 2016-02-12

_Minor release since the only change only affects new setup (so this is not
really a breaking change)._

- Changed: better init setup command
  ([#129](https://github.com/MoOx/statinamic/pull/129))
- Fixed: ``process.env.NODE_ENV`` is adjusted by ``--production`` CLI flag
  ([#133](https://github.com/MoOx/statinamic/issues/133))
- Fixed: during development (dev server), after a change and a page reload/new
  page, ``<script>`` tags are now correct
  ([#136](https://github.com/MoOx/statinamic/issues/136))
- Added: allow to disable automatically open new tab when start dev server
  ([#135](https://github.com/MoOx/statinamic/pull/135))

# 0.7.0 - 2016-02-12

Lot's of changes in the boilerplate (`scripts/*`).
You should better watch the default boilerplate and grab most of it, then add
back your original modifications.
This changes have been introduced for the better. Pages are now pre-rendered
during development and static build should be faster than before.

- Removed: ``collection.json`` file does not exist anymore. The collection is
  now inlined in generated html pages, even during development so we can use and
  access the collection directly and it avoid a server/client request.
- Removed: All injected constantes like ``__DEV__`` and ``__PROD__`` have been
  replaced by ``process.env.*`` call to make code more universal
  (eg: ``if (__DEV__)`` => ``if (process.env.NODE_ENV !== "production")``).
- Changed: remove mkdirp in favor of [fs-extra](https://www.npmjs.org/package/fs-extra)
  ([#126](https://github.com/MoOx/statinamic/issues/126))
- Changed: logs are now handled by [debug](https://www.npmjs.org/package/debug)
  ([#124](https://github.com/MoOx/statinamic/issues/124))
- Changed: Move opinionated deps to optionalPeerDependencies
  ([#99](https://github.com/MoOx/statinamic/issues/99))
- Changed: the static build does not require a 3 steps process anymore. No more
  ``statinamic-static.js`` script.
  Every webpack transformations are now handled via
  [babel-plugin-webpack-loaders](babel-plugin-webpack-loaders).
  to avoid the old painful/slow process.
  See boilerplate changes (look for ``BABEL_ENV=statinamic`` and babel
  configuration in ``package.json`` and in webpack client config).
- Changed: collection is now passed in the React
  [context](https://facebook.github.io/react/docs/context.html)],
  not in the store anymore.
- Changed: ``pageComponents`` are now called ``layouts``.
  All references should be renamed accordingly. See boilerplate changes.
- Changed: ``defaultComponent`` prop of ``PageContainer`` is now
  ``defaultLayout``
- Changed: layouts are now passed in the React context, not in the store
  anymore. So you need to pass them in the client script now (see boilerplate
  change).
- Changed: ``react-router`` has been upgraded to v2.0.0
  ([#95](https://github.com/MoOx/statinamic/pull/95))
- Changed: ``redux`` as been upgraded to v4.x
  ([#91](https://github.com/MoOx/statinamic/pull/91))
- Fixed: Dev server now redirects pages without trailing slash
  (eg: You call ``http://.../some/thing``; will redirect to
  ``http://.../some/thing/``)
  ([#22](https://github.com/MoOx/statinamic/issues/22))
- Added: the entire configuration is now inspected so you do not provide
  unexpected types or unrecognized configuration values
  ([#120](https://github.com/MoOx/statinamic/issues/120))
- Added: ``assets`` option to add static assets such as images, video
  ([#94](https://github.com/MoOx/statinamic/pull/94))
- Added: ``statinamic`` section in ``package.json`` can be used to define core
  options like ``CNAME``.
- Added: ``CNAME`` option to generate a ``CNAME`` file according to your
  homepage
  ([#24](https://github.com/MoOx/statinamic/issues/24))
- Added: ``nojekyll`` option to create `.nojekyll` file.
- Added: ``verbose`` option to create get more informations during development.
- Added: ``devHost`` and ``devPort`` options so you can choose your url during
  development.
- Added: Development server now generate pre-rendered pages on the fly.
- Added: Allow to pass extra middlewares and store enhancers to redux store
  ([#102](https://github.com/MoOx/statinamic/pull/102))

## Boilerplate

Lot's of change due to how static generation is handled without a 3 steps
process:

- Removed: boilerplate ``scripts/index-static.js`` (and so
  ``scripts/statinamic-static.js``)
- Changed: shorter start and build script
  ([#127](https://github.com/MoOx/statinamic/pull/127))
- Changed: ``web_modules/app/store.js`` don't have references to
  ``pageComponents`` nor ``collection``.
- Changed: boilerplate ``web_modules/app/layouts.js`` =>
  `web_modules/layouts/index.js`
- Changed: boilerplate ``web_modules/Page/`` => `web_modules/layouts/Page/`
- Changed: boilerplate ``web_modules/PageError/`` =>
  `web_modules/layouts/PageError/`
- Changed: boilerplate ``Layout`` wrapper is now called ``LayoutContainer``
- Changed: boilerplate ``static`` npm script has been renamed as ``build`` to
  make the build step easier to find.
- Changed: webpack entries now use hashed name by default
- Added: boilerplate includes [cssnext](http://cssnext.io/) instead 2 PostCSS
  plugins
  ([#87](https://github.com/MoOx/statinamic/issues/87))
- Added: boilerplate includes [stylelint](http://stylelint.io/) and
  lint CSS with a standard configuration
  ([#86](https://github.com/MoOx/statinamic/issues/86))
- Added: boilerplate now support a new field from markdown files to specify the
  ``<title>`` tag without affecting the body page title (``<h1>``)
  (See _Writing_ section of the documentation for more information)
  ([#76](https://github.com/MoOx/statinamic/issues/76))

# 0.6.1 - 2016-01-19

- Fixed: avoid rerendering on homepage without base url 
  ([#61](https://github.com/MoOx/statinamic/issues/61))
- Added: documentation is now included in the npm package in
  `statinamic/docs/content`

## Under the hood

- Changed: use babel-preset-stage-1 only (stage-0 is not really safe)
  ([#68](https://github.com/MoOx/statinamic/issues/68))
- Fixed: static class properties (semicolon required)
([babel/babel#3225](https://github.com/babel/babel/pull/3225))

# 0.6.0 - 2016-01-06

- Changed: boilerplate is now non-transpiled and in `statinamic/boilerplate`
  ([#66](https://github.com/MoOx/statinamic/issues/66))
- Changed: switch to babel@^6.0.0
  ([#42](https://github.com/MoOx/statinamic/issues/42))
- Changed: boilerplate now rely on
  [babel-preset-react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre)
  to get hot loading and visual errors
  ([#52](https://github.com/MoOx/statinamic/issues/52))
- Fixed: "statinamic setup" message say that dependencies are installed when
  they actually are
  ([#65](https://github.com/MoOx/statinamic/issues/65))
- Added: default Page component now warn about missing `title` with the filename
- Added: non-transpiled sources are added to npm package, just in case

## Under the hood

- Changed: eslint config extends
  [eslint-config-i-am-meticulous](https://github.com/MoOx/eslint-config-i-am-meticulous)
  ([#57](https://github.com/MoOx/statinamic/issues/57))
- Changed: tests are now base on
  [ava](https://github.com/sindresorhus/ava/)
  ([#59](https://github.com/MoOx/statinamic/issues/59))
- Added: code coverage using
  [nyc](https://github.com/bcoe/nyc) &
  [coveralls](http://coveralls.io/)
  ([#49](https://github.com/MoOx/statinamic/issues/49))


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
