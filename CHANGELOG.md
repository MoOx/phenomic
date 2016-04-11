- Changed: ``layouts`` should not be defined in build and client scripts
  anymore. This method will be deprecated in a future version.
  Instead please directly pass ``layouts`` in the ``routes`` definitions with a
  HoC.
  Here is an example:

  ```js
  import React, { Component } from "react"
  import { Route } from "react-router"

  import LayoutContainer from "../LayoutContainer"
  import StatinamicPageContainer from "statinamic/lib/PageContainer"

  import Page from "../layouts/Page"
  import PageError from "../layouts/PageError"
  import PageLoading from "../layouts/PageLoading"
  import Homepage from "../layouts/Homepage"

  class PageContainer extends Component {
    render() {
      const { props } = this
      return (
        <StatinamicPageContainer
          { ...props }
          layouts={ {
            Page,
            PageError,
            PageLoading,
            Homepage,
          } }
        />
      )
    }
  }

  export default (
    <Route component={ LayoutContainer }>
      <Route path="*" component={ PageContainer } />
    </Route>
  )
  ```

  You should take a new look to the [default boilerplate](boilerplate).

- Added: Use node-portfinder to avoid error when port is used
  ([#320](https://github.com/MoOx/statinamic/issues/320))

## Boilerplate

- Fixed: ``PageError`` warning about missing PropTypes
  ([#357](https://github.com/MoOx/statinamic/issues/357)).

- Changed: ``PageError`` is nicer and now looks like documentation 404.

- Added: a ``PageLoading`` component is now provided and include 2 indicators:
  - A [topbar](https://github.com/buunguyen/topbar) via
    [react-topbar-progress-indicator](https://github.com/MoOx/react-topbar-progress-indicator).
  - A simple CSS loading spinner.

  ([#182](https://github.com/MoOx/statinamic/issues/182)).

- Added: link to 404 and loading page in the footer, so new users can see and
  try those easily.

# 0.9.3 - 2016-04-04

## Boilerplate

- Removed: Remove unused define environment variables in webpack client config
  ([#315](https://github.com/MoOx/statinamic/pull/351))

# 0.9.2 - 2016-03-22

- Fixed: Missing babel-register package.
  ([#335](https://github.com/MoOx/statinamic/issues/335))

# 0.9.1 - 2016-03-21

- Fixed: default boilerplate have a correct .gitignore file (not .npmignore)
  ([#323](https://github.com/MoOx/statinamic/issues/323))

# 0.9.0 - 2016-03-21

→ [Example of update from 0.8 to 0.9](https://github.com/putaindecode/putaindecode.io/commit/4eea549?w=1)

## tl;dr;

### Breaking changes

- ``md-collection-loader`` has been renamed to ``content-loader``.
- Default markdown parser is now remark _but you can use anything you want, even
  a non markdown parser (eg: latex, asciidocs...)._
  **``markdownIt`` configuration is not supported any more but you can still use
  the same engine, see details below.**
- ``scripts/webpack.config.*.js`` now needs to export function that accept
  config as the first parameter.
- ``scripts/config.js`` is now responsible for exporting webpack configurations.
- (minor) ``redux-devtools`` and ``redux-thunk`` have been removed
  (``redux`` will become private soon anyway, or might even be dropped).

### Minor changes

- Less boilerplate for commands to start/build.

### Patches

- No more duplicates in collection.
- No more `main.*.css` files in `dist`.
- Anchors in url are not being removed when clicking a link with an anchor.
- Network errors are not reported as 404 anymore, but as network errors.

## Details

- Changed: simplified boilerplate and "start" and "build" commands !
  **Be sure to checkout new (smaller) boilerplate**.
  - ``scripts/webpack.config.*.js`` now needs to export function that accept
    config as the first parameter.
  - ``scripts/config.js`` is now responsible for exporting webpack configurations.
  - You can replace ``start`` and ``build`` npm scripts by
    ``statinamic start/build``
  - ``scripts/build.js`` do not need to expose webpack configuration anymore
    (since it's included in ``config`` object).
  - You can now remove awkward babel env configuration from your babel
    configuration. _It's now handled secretly by default_.
    (that's why ``config`` must expose your webpack configurations)
  - You webpack configuration can now skip some tiny weird part specific to
    statinamic.
- Changed: Use localhost as default address to open new browser tab (for Windows
  compatibility since Windows doesn't resolve 0.0.0.0 as localhost/127.0.0.1)
  ([#257](https://github.com/MoOx/statinamic/issues/257))
- Changed: **``md-collection-loader`` has been renamed to ``content-loader``.**
- Changed: ``content-loader`` now use [remark](https://github.com/wooorm/remark)
  as the default markdown engine.
  - If you want to use the new engine, just remove your ``markdownIt`` section
    in your ``scripts/webpack.config.babel.js`` configuration.
    You will also probably need to update in your CSS references to
    ``.markdownIt-Anchor`` to ``.statinamic-HeadingAnchor``.
  - If you want to keep your current engine, just take the content of your
    ``markdownIt`` section, wrap it in a function and return ``.render()``
    method.

    - Remove this of your ``scripts/webpack.config.babel.js``

      ```js
      // ...
      markdownIt: (
        require("markdown-it")({
          html: true,
          // ...
        })
          .use(/* ... */)
      )
      ```

    - Add in the configuration of ``content-loader``
      (former ``md-collection-loader``)

      ```js
      // ...
      { // statinamic requirement
        test: /\.md$/,
        loader: "statinamic/lib/content-loader",
        query: {
          context: path.join(config.cwd, config.source),
          // WRAP HERE
          renderer: (text) => (
            require("markdown-it")({
              html: true,
              // ...
            })
              .use(/* ... */)
              .render(text) // ADD THIS
          )
          // ...
        }
      )
      ```

- Changed: Remove redux devtools and `process.env.CLIENT` environment variables.
  Redux will probably become part of the private API, which will reduce
  the boilerplate. In order to do that, we will gradually remove Redux from all
  public interface ([#40](https://github.com/MoOx/statinamic/issues/40)).
  Here is the instruction to pull this change:

  - Remove `redux-devtools`, `redux-devtools-log-monitor` and
  `redux-devtools-dock-monitor` from your dependencies list.
  - Remove these variables in webpack.config.client.js, DefinePlugin section:

    - ``process.env.REDUX_DEVTOOLS``
    - ``process.env.CLIENT`` : This is totally up you.
      You can keep it if you use it.
      We recommended you to use a more portable way to do this:

    ```diff
    ---if (process.env.CLIENT) {
    +++if (typeof window !== "undefined") {
      // client-side specific code
    }
    ```

  See ([#261](https://github.com/MoOx/statinamic/pull/261)) for details.
- Removed: unused ``redux-thunk`` middleware.
  ([#279](https://github.com/MoOx/statinamic/pull/279))
- Added: ``content-loader`` now accept any renderer.
  You can provide your own callback to transform the text content into html
  via the `renderer` option.
  See _Configuration_ section of the documentation.
- Added: Support React to 15.x
- Fixed: ``statinamic/lib/enhance-collection`` do not create duplicates anymore
  ([#200](https://github.com/MoOx/statinamic/pull/200))
- Fixed: network errors will not appear as 404 error anymore
- Fixed: `main.*.css` files are not produced anymore by the default boilerplate
  ([#214](https://github.com/MoOx/statinamic/pull/214))
- Fixed: url with anchors are NOT being replaced with url without anchors
  anymore
  ([#284](https://github.com/MoOx/statinamic/pull/284))
- Added: ``statinamic/lib/enhance-collection`` will warn if filter callback
  don’t return a boolean

## Boilerplate (minor changes/improvements)

- Changed: Use ``include`` instead ``exclude`` to catch files to transform.
  See changes in ``boilerplate/scripts/webpack.config.babel.js``
- Changed: syntax change for css loaders section.
  See changes in ``boilerplate/scripts/webpack.config.babel.js``
- Changed: ``content-loader`` (former ``md-collection-loader``) now
  don't use ``JSON.stringify`` anymore.
  See changes in ``boilerplate/scripts/webpack.config.babel.js``
  ([#209](https://github.com/MoOx/statinamic/pull/209))
- Changed: upgrade to eslint@2 and friends.
- Fixed: assets loader use the right context
  (no big deal with default paths, but still).
  See changes in ``boilerplate/scripts/webpack.config.babel.js``

# 0.8.2 - 2016-02-27

- Fixed: 404 page overide webpack hmr route
  ([#204](https://github.com/MoOx/statinamic/pull/204))
- Added: Offline support via APPCACHE
  ([#153](https://github.com/MoOx/statinamic/issues/153))
- Added: dev server now show stack strace for errors via react-redbox
  ([#199](https://github.com/MoOx/statinamic/pull/199))

# 0.8.1 - 2016-02-25

- Fixed: URLs which does not have the required trailing slash are now adjusted.
  **This prevent relative links in loaded page content to be wrong.**
- Fixed: infinite loop for page not found
  ([#186](https://github.com/MoOx/statinamic/pull/186))
- Fixed: dev server redirection if trailing slash is missing works again.
- Added: dev server now send 404.html if there is any in collection when
  url is not in collection
  ([#181](https://github.com/MoOx/statinamic/pull/181))

## Boilerplate

- Fixed: Avoid warning of ``babel-plugin-webpack-loader`` in boilerplate
  ([#185](https://github.com/MoOx/statinamic/issues/185))

# 0.8.0 - 2016-02-24

→ [Example of update from 0.7 to 0.8](https://github.com/thangngoc89/blog/pull/58/files)

- Changed: use ``react-router`` basename feature.
  All urls in collection do not contain base pathname anymore and
  **all url in markdown or component should not have it anymore**
  ([#165](https://github.com/MoOx/statinamic/pull/165))
- Changed: build script now require an ``exports`` value
  that must contains path to ``layouts``, ``metadata`` and ``routes``.
  This values should be strings.
  See changes in ``boilerplate/scripts/build.js``
  ([#145](https://github.com/MoOx/statinamic/pull/145))
- Fixed: Redux devtools don't cause invalid checksum anymore
  ([#152](https://github.com/MoOx/statinamic/issues/152))
- Fixed: Homepage url is not prerendered as ``//`` if you don't have a pathname
  in your base url (``package.json/homepage``)
  ([#104](https://github.com/MoOx/statinamic/pull/104))
- Fixed: ability to pass custom webpack devServer config
  ([#157](https://github.com/MoOx/statinamic/issues/157))
- Added: Intercept clicks on markdown links so they will not trigger
  full page reload
  ([#67](https://github.com/MoOx/statinamic/issues/67))
- Added: Generate meta description and bundle it to collection
  See ``boilerplate/web_modules/layouts/Page/index.js`` for an example.
  ([#79](https://github.com/MoOx/statinamic/issues/79))
- Added: cli option to server static dist build `npm run build -- --server`
  ([#163](https://github.com/MoOx/statinamic/pull/163))
- Added: during development for pre-rendering, dev server will refresh
  all files for each render
  ([#145](https://github.com/MoOx/statinamic/pull/145))
- Added: custom routes are supported if you use a ``route`` field in your
  markdown front matter.
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
