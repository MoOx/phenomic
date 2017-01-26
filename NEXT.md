1.0.0

# setup

```
lerna boostrap
npm run next:build
cd packages/docs
npm start
```

(`npm run build` for static build)

# what's todo

A fucking lot

- Finish & refacto current packages
  - phenomic-react & phenomic-webpack as plugins
  - allow preset (array of plugins)
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

- [ ] setup is simple
- [ ] you can specify your own base theme during the setup
- [ ] markdown files can specify their own layouts
- [ ] font matters data are accessible in react components
- [ ] markdown files can specify their own routes
- [ ] pages can be a react components
- [ ] user can provide their own webpack config
- [ ] webpack can be boosted with hard source plugin (cache)
- [ ] internal links from markdown are not doing full page load, but caught and leveraging phenomic optimistic loading (note that “internal” but not unknown links (eg: /project/static-but-not-handled-by-phenomic.html) are not caught. (see `src/_utils/catch-links`)
- [ ] `src/_utils/error-formatter` transform errors to make those more readable (adjust path + remove useless stuff)
- [ ] (terminal) logs are created using a single module for coherence (`src/_utils/log` + src/builder/log-formatter)
- [ ] url + pathname for the website is defined once via the full website url (http://example.com/root/)
- [ ] offline options to enable service worker (for now via offline-plugin) that auto-register content
- [ ] scripts in markdown (json) are correctly escaped (`src/_utils/serialize`) to avoid json parsing issues
- [ ] one util transform all the paths to uri and remove extension like .md/txt/asciidoc etc (`src/_utils/urlify`)
- [ ] webpack 1 and 2 are supported (but I guess webpack 2 can be the only one - [ ] not a lot of changes anyway)
- [ ] works on windows (it’s a feature yeah)
- [ ] src/bin/check-engine check that you use the correct node/npm/yarn version before executing phenomic job (to avoid issue on github etc)
- [ ] $ phenomic start
- [ ] $ phenomic build
- [ ] $ phenomic setup: ask questions to create your config and copy the base theme
- [ ] some const PHENOMIC_* are injected during the build (src/builder/config.common.js)
- [ ] sourcemap works out of the box during development, even for static build that use webpack build for node build (🙃)
- [ ] phenomic check webpack config to avoid error
- [ ] an “assets” folder can be copied from “content” folder - [ ] not sure this make sense with the new architecture - [ ] but people should be able to reference assets from markdown and that should work “as expected”
- [ ] phenomic open project in a tab when you “start” and reuse an existing chrome tab if already open (src/builder/openChrome)
- [ ] postbuild: automatic creation of a CNAME if CNAME option is true, from the config url
- [ ] postbuild: create a .nojekyll file if “nojekyll” is true (default) (src/builder/post-build
- [ ] logs show elapsed time by default
- [ ] dev server show a page saying that JS is required (see src/builder/server)
- [ ] hot loading for modules AND collection content
- [ ] webpack logs are limited by default to avoid noize
- [ ] “/stuff/index.html” works during development (https://github.com/MoOx/phenomic/issues/808)
- [ ] dev server default page show JS error if one occurs (see src/builder/server)
- [ ] dev server handle occupied ports - [ ] if default phenomic ports is not free, we should ask user to double check and offer to use another one (like CRA)
- [ ] react-router scroll mess is handled (see src/client/should-update-scroll.js)
- [ ] glamor & aphrodite should be handled or VERY easy to enable
- [ ] react-helmet should be handled (and/or see next.js head feature)
- [ ] Link handle / & /index.html as a same url for activeState
- [ ] Link should handle local and external link (so you can reference a dynamic value (eg from front-matter) using Link - [ ] see src/components/Link)
- [ ] optimistic loading/layout & shit (see src/components/PageContainer) - [ ] big deal here
- [ ] all the configurations is validated and you get proper warnings if incorrect (see src/configurator)
- [ ] all options! src/configurator/definitions.js
- [ ] offer helper to retrieve collections data (I guess it’s done already :) )
- [ ] base theme offer a package for a recommended eslint config, recommended stylelint config
- [ ] provide a good default for markdown transformation (see `src/loader-plugin-*`)
- [ ] easy rss & sitemap
- [ ] ability to define routes (eg: tags/:tag) with pagination
- [ ] we should keep or base theme, people seems to like it
- [ ] good docs!

“Developer features”
- [ ] npm or yarn can be used (even if npm is slower and less predictable)
- [ ] project is run on travis for yarn, circle ci for npm and appveyor for windows/npm
- [ ] project CI should run unit test + build docs + build a new project using the setup and run some end to end test (see e2e-tests)
