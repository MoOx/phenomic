1.0.0

# requirements

you need (for now) [watchman](https://facebook.github.io/watchman/).

# setup

```
npm install
cd packages/docs
DEBUG=phenomic:* npm start
```

(`npm run build` for static build)

`npm install` will init [lerna](https://github.com/lerna/lerna) stuff (since we have a monorepo).

Each time you modify `packages/*/src/**/*.js` you will need to run

```console
npm run repo:transpile
```

For now no easy way to watch (passing --watch will block the first babel transpilation step, so only a single package, that's not what you want)

# use it locally

```console
npm run repo:link
```

This will run `npm link` for all packages so they are available locally :)

# what's todo

A fucking lot

- replace main npm scripts workflow for new implementation (break/disable all the things)
  - add stuff in checklist to not forget if necessary
- check what's missing from the checklist
  - do what's missing that we still want (check) + provide migration doc
    - implement missing thing
    - remove from old codebase the thing
  - or release notes for removed stuff (~~delete from list like that~~)
- review docs & homepage
- RELEASE!

## checklist

From https://github.com/MoOx/phenomic/issues/925#issuecomment-271502547

Note that stuff can be missing

- [ ] provide alternative to wathman [like jest](https://github.com/facebook/jest/blob/10e492754fd9f2f0280c625f15800fb8f3347558/packages/jest-haste-map/src/index.js#L536)
- [ ] markdown files can specify their own routes
- [ ] pages can be a react components
- [ ] internal links from markdown are not doing full page load, but caught and leveraging phenomic optimistic loading (note that “internal” but not unknown links (eg: /project/static-but-not-handled-by-phenomic.html) are not caught. (see `src/_utils/catch-links`)
- [ ] url + pathname for the website is defined once via the full website url (http://example.com/root/)
- [ ] some const PHENOMIC_* are injected during the build (src/builder/config.common.js)
- [ ] an “assets” folder can be copied from “content” folder
- [ ] phenomic open project in a tab when you “start” and reuse an existing chrome tab if already open (src/builder/openChrome)
- [ ] postbuild: automatic creation of a CNAME if CNAME option is true, from the config url
- [ ] postbuild: create a .nojekyll file if “nojekyll” is true (default) (src/builder/post-build
- [ ] dev server show a page saying that JS is required (see src/builder/server) NOSCRIPT
- [ ] hot loading for modules AND collection content
- [ ] webpack logs are limited by default to avoid noize
- [ ] “/stuff/index.html” works during development (https://github.com/MoOx/phenomic/issues/808)
- [ ] dev server default page show JS error if one occurs (see src/builder/server)
- [ ] dev server handle occupied ports - [ ] if default phenomic ports is not free, we should ask user to double check and offer to use another one (like CRA)
- [ ] react-router scroll mess is handled (see src/client/should-update-scroll.js)
- [ ] glamor & aphrodite should be handled or VERY easy to enable
- [ ] react-helmet should be handled (upgraded)
- [ ] Link handle / & /index.html as a same url for activeState
- [ ] Link should handle local and external link (so you can reference a dynamic value (eg from front-matter) using Link - [ ] see src/components/Link)
- [ ] optimistic loading/layout & shit (see src/components/PageContainer) - [ ] big deal here
- [ ] all the configurations is validated and you get proper warnings if incorrect (see src/configurator)
- [ ] all options! src/configurator/definitions.js
- [ ] easy rss & sitemap
- [ ] we should keep or base theme, people seems to like it
