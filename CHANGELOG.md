# HEAD

- Changed: ``phenomic/lib/content-loader`` reference is deprecated in favor of
  ``import { phenomicLoader } from "phenomic"``.
  You can use ``phenomicLoader`` variable in webpack configuration to reference
  Phenomic loader. This change allows us more flexibility for the location of
  the code.
  (@MoOx)
- Changed: loader will now read loader configuration directly from ``phenomic``
  section, not in `phenomic.loader` or `phenomic.contentLoader`
- Removed: `renderer` option from `content-loader` (now `phenomicLoader`).
  See the new `plugins` option below for more information.
  If you want to do the same effect, you can use the following plugins
  ```js
  import { phenomicLoader, phenomicLoaderPlugins } from "phenomic"

  // ...
    phenomic: {
      // ...
      plugins: [
        // this 3 default plugin can be replaced by the a preset. More info below
        phenomicLoaderPlugins.initHeadPropertyFromConfig
        phenomicLoaderPlugins.initHeadPropertyFromContent
        phenomicLoaderPlugins.initBodyPropertyFromContent

        phenomicLoaderPlugins.markdownInitHeadDescriptionPropertyFromContent // optional, now you can replace this if you don't use markdown!
        // phenomicLoaderPlugins.markdownTransformBodyPropertyToHtml
        // the commented plugin above is the default renderer
        // here is an example that can be used like the old renderer
        // method
        ({ result }) => {
          // the difference here, is you need to return the entire new
          // (modified) result.
          // The `body` part is what your are looking for
          return {
            ...result,
            body: doYourThing(result.body),
          }
        }
      ]
    }
  ```
- Removed: `raw` and `rawBody` properties from page data.
  If you want those back, there are plugins ready for you:
  ```js
  import {
    phenomicLoader,
    phenomicLoaderPlugins,
    phenomicLoaderPresets,
  } from "phenomic"

  // ...then in the webpack config

    phenomic: {
      plugins: [
        ...phenomicLoaderPresets.default,
        ...phenomicLoaderPresets.markdown,
        phenomicLoaderPlugins.initRawPropertyFromContent,
        phenomicLoaderPlugins.initRawBodyPropertyFromContent,
      ]
    }
  ```
  See the new `plugins` option below for more information.
  ([#547](https://github.com/MoOx/phenomic/issues/547) - @MoOx)
- Added: `plugins` option for the phenomic loader.
  This option allow more flexibility on how to handle and transform
  input passed to it.
  By default, almost the same behavior as before is executed via the following plugins:

  ```js
    plugins: [
      phenomicLoaderPlugins.initHeadPropertyFromConfig,
      phenomicLoaderPlugins.initHeadPropertyFromContent,
      phenomicLoaderPlugins.initBodyPropertyFromContent,
      phenomicLoaderPlugins.markdownInitHeadDescriptionPropertyFromContent,
      phenomicLoaderPlugins.markdownTransformBodyPropertyToHtml,
    ]
  ```
  See the configuration section in the documentation to know more how to customize this.
  If you want just add more plugins for specific behavior (and so keep
  the default plugins), you can spread some plugins/presets.
  (see documentation for more informations).
  ([#260](https://github.com/MoOx/phenomic/issues/260) - @MoOx)
- Added: ``"phenomic"`` package now exposes new values
  - ``phenomicLoader`` (ex "phenomic/lib/content-loader")
  - ``phenomicLoaderPlugins``, the list of all available plugins
  - ``phenomicLoaderPresets``, that contains ``default`` and ``markdown`` presets
  (see documentation for more informations).
  (@MoOx)
- Added: More routes can be pre-rendered! Previously, only files consumed
  via ``phenomic-loader`` (former ``content-loader``) where generated as HTML.
  Now your routes are consumed and pre-rendered when possible!
  **This is super convenient to define pages that will list content by tags,
  categories, authors etc!**
  Here is a simple example to add pages for each tags by editing
  ``web_modules/app/routes.js`` (if you still use default location):

  ```js
  export default (
    <Route component={ LayoutContainer }>
      <Route path="tag/:tag" component={ ContainerThatWillListPostByTag } />
      <Route path="*" component={ PageContainer } />
    </Route>
  )
  ```

  Obviously, you will need to define ``ContainerThatWillListPostByTag``
  (and find a better name for it).
  Here is an example on a website that implemented this:
  → [Example of implementation of some tags and authors pages](https://github.com/putaindecode/putaindecode.io/commit/092a040).
  Please check out "Routing" section in the docs for more details.
  **Good news: pagination is on the roadmap!**
  (@MoOx)

## Boilerplate

- Fixed: (boilerplate) ``postcss-browser-reporter`` was added on production
  only when it should have been the opposite!
  (@MoOx)
- Changed: (boilerplate) LayoutContainer now import global CSS first
  ([#571](https://github.com/MoOx/phenomic/pull/571) - @AdamQuadmon)
- Changed: (boilerplate) ``content-loader`` reference is now in a variable
  that can be imported (``import { phenomicLoader } from "phenomic"``)
  (@MoOx)

# 0.15.0 - 2016-07-13

## tl;dr;

- ``offline`` option has been rewritten. If you were using `offline: true`, you
  don't need to change anything, you will just have few bug fixes and a change
  to "network" first approach.
  Otherwise, please check details below and/or the online documentation.
  We hope you will enjoy this nice API!
- default port is now 3333 in development
- remark has been updated to 5.x version
- boilerplate got some updates, mainly for stylelint

## Details

- Removed: ``appcache`` option has now completely being removed in favor of
  ``offline`` (after being deprecated in 0.11.0). See new API below.
- Changed: Offline option has been completely rewritten.
  Service Worker now uses a network first approach.
  This is to prevent having an outdated collection that will lead to request
  outdated entries urls that might not exist anymore (and that have not been
  cached yet, see [#451](https://github.com/MoOx/phenomic/issues/451)).
  This is for the better.
  By the way, we now rely on
  [offline-plugin](https://github.com/NekR/offline-plugin)
  to generate Service Worker and Appcache files.
  The part that registers the Service Worker is now included in the client
  bundle.
  **Note that for a better caching, the default boilerplate now use ``[hash]``
  in the filenames loaded via ``file-loader``.**
  We encourage you to do the same by using a parameter like
  ``loader: "file-loader?name=[path][name].[hash].[ext] // ...``.
  Offline API is now much more flexible and clear to setup thanks to the new
  ``cachePatterns``.
  Here is an example of the new ``offline`` option:

  ```js
  {
    serviceWorker: true,
    appcache: {
      // fallback for SW, will cache onInstall and afterInstall pattern.
      // onDemand cannot be cache with appcache.
      onInstall: true,
      afterInstall: true,
    },
    cachePatterns: {
      onInstall: [ "/", "phenomic.*" ], // cache App Shell on SW install

      afterInstall: [ "**", ":assets:" ], // cache all content

      onDemand: [ ], // since everything is cached by default (if offline: true)
      // you don't need to cache anything on demand.
      // but this option offers you a lot of flexibility, see documentation
      // for more examples

      excludes: [ "**/.*", "**/*.map", "**/*.html" ], // excludes useless files
    },
  }
  ```

  Using ``offline: true`` will use the configuration above. To know more about
  this option and all the possibility you have, please read the documentation.
  ([#485](https://github.com/MoOx/phenomic/issues/485) - @MoOx)
- Changed: ``remark`` has been updated to ``^5.0.0``.
  This is a breaking change and since (for now) remark
  [is still a dependency](https://github.com/MoOx/phenomic/issues/251),
  you should be careful when upgrading if you are using a custom render method
  based on remark.
  Some plugins have also been updated to work with remark 5.x
  - ``remark-highlight.js`` has been updated to ``^3.1.1``
  - ``remark-html`` has been updated to ``^5.0.0``
- Changed: default port is now ``3333``.
  This is to prevent weird behavior if you use ``offline`` option.
  Since ``3000`` is pretty common, not using it will avoid having your website
  Service Worker to be used for others projects.
  That said we advise you to choose your own port if you use ``offline`` option.
  (@MoOx)

## Boilerplate

- Changed: ``postcss-browser-reporter`` is now disabled in production.
  Just in case you still have some PostCSS messages not handled yet.
  Here is the change you can do in your PostCSS config section in your
  ``webpack.config`` to do the same on your existing project:
  ```diff
    postcss: () => [
      require("stylelint")(),
      require("postcss-cssnext")({ browsers: "last 2 versions" }),
  -    require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
  +    ...config.production ? [
  +      require("postcss-browser-reporter")(),
  +    ] : [],
    ],
  ```
  (@MoOx)
- Changed: ``stylelint`` has been updated to ``^6.8.0``
  (@MoOx)
- Changed: ``stylelint-config-standard`` has been updated to ``^10.0.0``
  (@MoOx)
- Changed: making date structure obvious in examples posts frontmatter.
  ([#559](https://github.com/MoOx/phenomic/issues/559) - @MoOx)

# 0.14.2 - 2016-06-12

- Fixed: Security exception when accessing "/" via a
  (``react-router``) ``<Link to="/"">`` is now avoided.
  ([#521](https://github.com/MoOx/phenomic/issues/521) - @MoOx)

# 0.14.1 - 2016-06-12

- Fixed: explicit update of ``react-router@^2.3.0`` peer dependency
  (@MoOx)

# 0.14.0 - 2016-06-12

Finally, the navigation has now a proper scroll behavior

- new page: scroll to top
- back button: scroll position restored

**For those which implemented a fix for this scrolling issue:
you can just remove your workaround !**

_You will need at least ``react-router@^2.3.0``._

## Details

- Fixed: navigation now offers a proper scroll behavior.
  Not more weird page updates.
  ([#285](https://github.com/MoOx/phenomic/issues/285) - @MoOx)

## Boilerplate

- Added: ``PageLoading`` now use "Loading..." has a ``<title>``
  (@MoOx)

# 0.13.0 - 2016-06-07

## tl;dr;

**No breaking changes!**

- You can just remove stuff from your ``.gitignore`` file since now static
  builded files are hidden
  - ``scripts/_``
  - ``*.bundle.js``
- If you want global (normal) CSS (no CSS Modules), you can just update your
  ``webpack.config.js`` (if not done already) to add support for
  global CSS via ``*.global.css`` files.  
  See [the corresponding changes](https://github.com/MoOx/phenomic/blob/91fc2875233b8f2f695fc385f1d09aa1d73d534c/boilerplate/webpack.config.babel.js#L56-L110).
  Note that the scope has be restricted to ``web_modules``.
  Feel free to adjust to your need.

## Details

- Changed: node (static) bundle (``phenomic.node.bundle.js``) is now hidden
  (in ``node_modules/.cache/phenomic``,
  thanks to [find-cache-dir](https://www.npmjs.com/package/find-cache-dir))
  ([#439](https://github.com/MoOx/phenomic/issues/439) - @MoOx)
- Fixed: files should not be created anymore near your phenomic.node script
  ([#439](https://github.com/MoOx/phenomic/issues/439) - @MoOx)

## Boilerplate

- Changed: (boilerplate) loader for CSS is only applied to local
  ``web_modules``.
  If you want to consume CSS from ``node_modules`` you will need to define your
  own section and adjust the scope accordingly (depending on wether it's global
  CSS or CSS Modules...)
  ([#516](https://github.com/MoOx/phenomic/issues/516) - @MoOx)
- Added: (boilerplate) ``*.global.css`` can be just normal CSS (not CSS Modules)
  ([#443](https://github.com/MoOx/phenomic/issues/443) and
  [#95](https://github.com/MoOx/phenomic/issues/95) - @MoOx)
- Added: (boilerplate) add a default meta viewport tag
  (@MoOx)

# 0.12.4 - 2016-05-27

- Fixed: regression with path-to-uri introduced in 0.12.3
  (``path.posix is undefined``)
  [#503](https://github.com/MoOx/phenomic/pull/503)

# 0.12.3 - 2016-05-27

- Fixed: public `joinUri` function now correctly join uri with protocol
  [#500](https://github.com/MoOx/phenomic/pull/500)

# 0.12.2 - 2016-05-20

- Added: ``BodyContainer`` component.  
  This component is now recommended to used wrap pages `body`, in replacement of
  previous usage of ``dangerouslySetInnerHTML``.  
  _Previous method still works but have
  [a known issue](https://github.com/MoOx/phenomic/issues/469)._  
  To use this component, you can simply replace in your layouts the following
  code

  ```js
  {
    body &&
    <div
      dangerouslySetInnerHTML={ { __html: html } }
    />
  }
  ```

  By the following code

  ```js
  <BodyContainer>{ body }</BodyContainer>
  ```

  Note that you will need to import ``BodyContainer`` like this

  ```js
  import { BodyContainer } from "phenomic"
  ```

  Example of full diff

  ```diff
  import Helmet from "react-helmet"
  import invariant from "invariant"
  -import { joinUri } from "phenomic"
  +import { BodyContainer, joinUri } from "phenomic"

  class Page extends Component {

  //...

          {
            head.title &&
            <h1>{ head.title }</h1>
          }
          { header }
  -        {
  -          body &&
  -          <div
  -            dangerouslySetInnerHTML={ { __html: html } }
  -          />
  -        }
  +        <BodyContainer>{ body }</BodyContainer>
          { props.children }
          { footer }
  ```

  ([#469](https://github.com/MoOx/phenomic/issues/469))

# 0.12.1 - 2016-05-09

- Added: setup now show examples for values to enter.
- Fixed: twitter and repo url in setup accept empty values
  ([#445](https://github.com/MoOx/phenomic/issues/445))
- Fixed: Should not show "Offline support is disabled in development mode"
  when offline isn't enabled
  ([#448](https://github.com/MoOx/phenomic/issues/448))

## Boilerplate

- Updated: ``stylelint`` has been updated to ``^6.0.0``
- Updated: ``stylelint-config-standard`` has been updated to ``^7.0.0``

# 0.12.0 - 2016-05-05

## tl;dr;

**Don't be afraid by the length of this release notes. It's for the better.**

Most noticeable change occurs in the ``scripts`` folder.
It might be a good idea is to take a look to the new folder of the default
boilerplate:

- There is now just 2 files: ``phenomic.browser.js`` (client runtime) and
``phenomic.node.js`` (for static build).
- webpack configs can be moved at the root of you project and merged into a
  single one ``webpack.config.babel.js``. Phenomic specific configuration can be
  removed (eg: ``entry``) and is now injected via Phenomic itself.

→ [Example of update from phenomic 0.10 to 0.12](https://github.com/putaindecode/putaindecode.io/commit/6c830193a4f873790df3d10df9ef3e2e89bbd36b)


## Details

- Fixed: Meta description should not contains new lines
  ([#414](https://github.com/MoOx/phenomic/issues/414))
- Removed: layouts now must be passed via props to ``PageContainer`` component.
  This change has been introduced in ``0.10.0`` but old way (via a
  parameter in the former ``scripts/build.js`` and ``scripts/index-client.js``)
  was still accepted.
  _If you do not have a warning in ``0.10.0`` or newer, you won‘t be affected by
  this change._
- Removed: dev server does not pre-render anymore. During development, only
  client side version is used. This is to avoid huge performance issue
  introduced in ``statinamic@0.7.0``. We might re-enable pre-rendering in a near
  future.
  See change below for more information
  ([#301](https://github.com/MoOx/phenomic/issues/301))
- Changed: dates of the front matter are now always strings,
  [for now](https://github.com/MoOx/phenomic/issues/397#issuecomment-215628881),
  until [we serve pages as JavaScript (and not JSON)](https://github.com/MoOx/phenomic/issues/434).
  By default the front-matter parsing method recognize dates as JavaScript dates
  but when converted to JSON we end up with string.
  The problem is that during the static build, we use date in memory
  (real dates) and on the client, strings are used.
  So, to ensure consistency, between static build and client build we are now
  forcing string
  ([#397](https://github.com/MoOx/phenomic/issues/397))
- Changed: **major refactoring** to fix huge performance issue introduced in
  ``statinamic@0.7.0``
  ([#301](https://github.com/MoOx/phenomic/issues/301)).
  At the same time we introduced some internal changes, we have reduced the
  required boilerplate and make some changes in order to simplify everything:

    - Removed: ``scripts/config.js``. Configuration is now builded from a
      "classic" webpack config. See change related to the webpack config below.
    - Removed: ``scripts/webpack.config.client.js`` content should be merged
      with your ``webpack.config.babel.js`` (please read the change below).
    - Changed: ``scripts/webpack.config.babel.js`` is now expected by default
      to be found at the root of your project, like a classic webpack config.
      Webpack configuration parts specific to Phenomic are now injected by
      Phenomic itself.
      **Note that your config must ``export`` a ``makeConfig`` function**.
      This is required so Phenomic can easily create dynamic configurations.
      This also prepare the upgrade to ``webpack@2.0.0``
      ([which is in beta for a while, but starts to be
      mature](https://github.com/MoOx/phenomic/issues/421)) that natively
      allow webpack config to be exported as a function.
      _The path can be specified via an option (via CLI or config)._
    - Removed: ``scripts/build.js`` in favor of ``scripts/phenomic.node.js``.
      _The path can be specified via an option (via CLI or config)._
      Note that this file will be builded as
      ``scripts/phenomic.node.bundle.js`` for performance.
      (New boilerplate (git)ignores ``*.bundle.js`` files).
    - Changed: ``scripts/index-client.js`` is now
      ``scripts/phenomic.browser.js``.
      _The path can be specified via an option (via CLI or config)._


- Changed: ``react-helmet@^3.0.0`` is now required.
  This brings us the ability to use all latest ``react-helmet``'s methods,
  including: ``base``, ``link``, ``meta``, ``script`` and ``htmlAttributes``.
  Check out [react-helmet‘s documentation](https://github.com/nfl/react-helmet)
  for more information.
  Except new features, no real breaking changes (except that ``react-helmet``
  don‘t includes some (may be) required polyfills by default).
  You can upgrade by doing ``npm install react-helmet@^3.0.0 --save``
  ([#348](https://github.com/MoOx/phenomic/pull/348))
- Changed: ``PHENOMIC_PATHNAME`` is now ``PHENOMIC_USER_PATHNAME``.
  But no need to update that in your configuration as it's injected
  automatically. See changes in the boilerplate.
  ([#412](https://github.com/MoOx/phenomic/issues/412))
- Changed: ``devPort`` option must be a integer.
- Changed: ``content-loader`` options that are defined in the ``phenomic``
  section of the webpack configuration should be defined under
  ``contentLoader``, not ``loader`` (even if this one is still supported for
  now).
- Changed: ``content-loader`` options are now taken from ``query`` AND
  ``phenomic.contentLoader`` section (both are merged).
- Added: unknown CLI args now throw errors
  ([#363](https://github.com/MoOx/phenomic/pull/363))
- Added: new injected constants in ``process.env``:
  - ``process.env.PHENOMIC_USER_URL``: your website homepage url
    (`package.json/homepage` field)
  - ``process.env.PHENOMIC_USER_PATHNAME``: the base path of your website/app
  - ``process.env.PHENOMIC_NAME``: Phenomic pretty name
  - ``process.env.PHENOMIC_VERSION``: Phenomic version
  - ``process.env.PHENOMIC_HOMEPAGE``: Phenomic homepage url
  - ``process.env.PHENOMIC_REPOSITORY``: Phenomic repository url
  ([#412](https://github.com/MoOx/phenomic/issues/412) &
  [#361](https://github.com/MoOx/phenomic/issues/361))
- Added: Warning for Service Worker when not using HTTPS
  ([#406](https://github.com/MoOx/phenomic/issues/406))

## Boilerplate

- Fixed: Meta og:url must be a full url
  ([#432](https://github.com/MoOx/phenomic/pull/432)
- Removed: ``NODE_ENV`` and ``PHENOMIC_PATHNAME`` have been removed from the
  boilerplate. These are now automatically defined.
  ([#412](https://github.com/MoOx/phenomic/issues/412))
- Changed: big changes in the ``scripts`` folder. Read note above.
- Changed: lint command now ignore gitignored files in to be sure you don‘t
  lint some builded files.
  Note the  ``--ignore-path .gitignore`` part:
  ``"lint:js": "eslint --ignore-path .gitignore --fix ."``
- Changed: ``content-loader`` options are defined in the
  ``phenomic.contentLoader`` section of the webpack configuration so you can use
  functions (eg: custom renderer).
- Added: [Polyfill CDN](https://cdn.polyfill.io/v2/docs/)
  to make sure your website work with old browsers as well.
  ([#348](https://github.com/MoOx/phenomic/pull/348))
- Added: (boilerplate) meta generator tag
  ([#361](https://github.com/MoOx/phenomic/pull/361))
- Added: Improve React's performance in production build by using
  [babel-preset-react-optimize](https://github.com/thejameskyle/babel-react-optimize)
  ([#377](https://github.com/MoOx/phenomic/issues/377))
- Added: Use dynamic values for GitHub and Twitter.
  ([#419](https://github.com/MoOx/phenomic/pull/419))

# 0.11.0 - 2016-04-19

- Changed: `appcache` option has been deprecated and has been replaced by
  the ``offline`` option. You should update your configuration accordingly.
  Please refer https://phenomic.io/docs/advanced/offline-browsing/.
  ([#343](https://github.com/MoOx/phenomic/pull/343))
- Added: Initial support for Service Worker via ``offline`` option.
  ([#343](https://github.com/MoOx/phenomic/pull/343),
  [#405](https://github.com/MoOx/phenomic/pull/405))

## Boilerplate

- Removed: (boilerplate) ``layouts/index.js``. It is not used since 0.10.0.
  ([#401](https://github.com/MoOx/phenomic/pull/401))
- Added: Run lint process in parallel with [npm-run-all](https://www.npmjs.com/package/npm-run-all)
  ([#402](https://github.com/MoOx/phenomic/pull/343))
- Added: (boilerplate) more layouts and components so new users have more
  example to show list of entries:

  - ``Homepage`` layout that include a list of posts
  - ``Post`` layout
  - ``PagesList`` component to easily show page preview
  - ``PagePreview`` to display page meta

  ([#71](https://github.com/MoOx/statinamic/issues/71))

# 0.10.2 - 2016-04-14

- Fixed: replacement of some references that have been missed during the rename:
  - STATINAMIC (in .js)
  - statinamic (in .css).
  To be sure, run the following commands.

  ```sh
  npm remove --save-dev statinamic
  npm install --save-dev phenomic@^0.10.2
  find . -type f \( -iname \*.css -o -iname \*.js -o -iname \*.json \) -not \( -path './.git/*' -o -path './node_modules/*' \) \
    -exec sed -i '' 's|Statinamic|Phenomic|g' {} \;
  find . -type f \( -iname \*.css -o -iname \*.js -o -iname \*.json \) -not \( -path './.git/*' -o -path './node_modules/*' \) \
    -exec sed -i '' 's|statinamic|phenomic|g' {} \;
  find . -type f \( -iname \*.css -o -iname \*.js -o -iname \*.json \) -not \( -path './.git/*' -o -path './node_modules/*' \) \
    -exec sed -i '' 's|STATINAMIC|PHENOMIC|g' {} \;
  ```

- Fixed: boilerplate now ship latest version of react-router, since
  react-router@2.2.2 fixes the issue that create homepage to be not rendered.
  ([#393](https://github.com/MoOx/phenomic/issues/393))

# 0.10.1 - 2016-04-14

- Fixed: boilerplate comes with react-router@2.1.1 until
  [react-router#3307](https://github.com/reactjs/react-router/issues/3307)
  is fixed
  ([#393](https://github.com/MoOx/phenomic/issue/393))
- Fixed: dev server show wrong log message about used port
  ``Port 3000 is not available. Using port 3000 instead``.
  ([#392](https://github.com/MoOx/phenomic/pull/392))

# 0.10.0 - 2016-04-13

## tl;dr;

- You can safely update from statinamic to phenomic without any changes in your
  code except renaming the "S|statinamic" references (see instructions below).
- Only one major breaking change, but previous method will probably still be
  supported until 1.0
- More stuff in the default boilerplate (404, loading...)

→ [Example of update from statinamic 0.9 to phenomic 0.10](https://github.com/putaindecode/putaindecode.io/commit/8d63776cf8fe0cb30672646d656c93ee0c803802)

## Details

- Changed: project has been renamed due to a possible confusion with a PHP CMS
  called statamic.
  [Read more](https://github.com/MoOx/statinamic/issues/306).
  For an easy migration, you can simply run the following commands

  _EDIT: the commands below are not enough, see release **0.10.2**._

  ```sh
  npm remove --save-dev statinamic
  npm install --save-dev phenomic
  find . -type f \( -iname \*.js -o -iname \*.json \) -not \( -path './.git/*' -o -path './node_modules/*' \) \
    -exec sed -i '' 's|Statinamic|Phenomic|g' {} \;
  find . -type f \( -iname \*.js -o -iname \*.json \) -not \( -path './.git/*' -o -path './node_modules/*' \) \
    -exec sed -i '' 's|statinamic|phenomic|g' {} \;
  ```

  If you want to double check what files will be changed, just run

  ```sh
  find . -type f \( -iname \*.js -o -iname \*.json \) -not \( -path './.git/*' -o -path './node_modules/*' \)
  ```

  _This will look for S|statinamic occurence and will replace it by P|phenomic in
  all .js and .json files that are not in .git or in node_modules._

- Changed: ``layouts`` should not be defined in build and client scripts
  anymore. This method will be deprecated in a future version.
  Instead please directly pass ``layouts`` in the ``routes`` definitions with a
  HoC.  
  What are HoC? Higher order Component, more about this:

  - https://medium.com/@bloodyowl/the-provider-and-higher-order-component-patterns-with-react-d16ab2d1636
  - http://jamesknelson.com/structuring-react-applications-higher-order-components/
  - http://natpryce.com/articles/000814.html

  Here is an example (based on the default boilerplate):

  ```js
  import React, { Component } from "react"
  import { Route } from "react-router"

  import LayoutContainer from "../LayoutContainer"
  import PhenomicPageContainer from "phenomic/lib/PageContainer"

  import Page from "../layouts/Page"
  import PageError from "../layouts/PageError"
  import PageLoading from "../layouts/PageLoading"
  import Homepage from "../layouts/Homepage"

  class PageContainer extends Component {
    render() {
      const { props } = this
      return (
        <PhenomicPageContainer
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
  ([#320](https://github.com/MoOx/phenomic/issues/320))

## Boilerplate

- Fixed: ``PageError`` warning about missing PropTypes
  ([#357](https://github.com/MoOx/phenomic/issues/357)).

- Changed: Bump css-loader to ^0.23.0. This may improve performance a little bit
  ([#374](https://github.com/MoOx/phenomic/issues/374))

- Changed: ``PageError`` is nicer and now looks like documentation 404.

- Changed: Production build now produces short CSS classnames. You should apply this
  change for a smaller HTML file.
  ([#385](https://github.com/MoOx/phenomic/pull/385))

- Changed: upgrade of ``stylelint`` and ``stylelint-config-standard``
  to latest 5.x versions

- Added: a ``PageLoading`` component is now provided and include 2 indicators:
  - A [topbar](https://github.com/buunguyen/topbar) via
    [react-topbar-progress-indicator](https://github.com/MoOx/react-topbar-progress-indicator).
  - A simple CSS loading spinner.

  ([#182](https://github.com/MoOx/phenomic/issues/182)).

- Added: link to 404 and loading page in the footer, so new users can see and
  try those easily.

---

# Statinamic

Before 0.10,
[project was named Statinamic](https://github.com/MoOx/statinamic/issues/306).

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
