---
title: Internationalize your content
---

You have multiple solutions available to help you translate your user interface
and handle multiple locales.

Here we will explain the solution based on
[react-intl](https://github.com/yahoo/react-intl).

First you need to install `react-intl`.

```console
npm install --save react-intl
```

## Translating your content

We will use a `YAML` file to translate our content since this file format is
easier to update than JSON (assuming your projects have simple needs).

Obviously you can adjust this to a more complicated format if needed.

You will need to get `yaml-loader` and `json-loader`.

```console
npm install --save-dev yaml-loader json-loader
```

We will also need to add a webpack configuration loader section

```js
{
  test: /\.yml$/,
  loaders: [ "json-loader", "yaml-loader" ],
},
```

Now create differents `.yml` files in a `translations` folder.
If you want handle two languages, you have to create two files,
with language key as filename.

`src/translation/en.yml`:

```yml
header:
  title: "Phenomic"
  posts: "Posts"
  fr: "French"
  en: "English"

content:
  phenomic-is-awesome: "Phenomic is awesome !"
```

`src/translation/fr.yml`:

```yml
header:
  title: "Phenomic"
  posts: "Articles"
  fr: "Français"
  en: "Anglais"

content:
  phenomic-is-awesome: "Phenomic est génial !"
```

## Initialize react-intl

We will need the `flat` lib to transform our translations files into flatten objects.
The `flat` lib will take our nested translations objects and flatten then.

So instead of have:

```javascript
{
  header: {
    title: "Phenomic",
    posts: "Posts",
  }
}
```

We will have:

```javascript
{
  "header.title": "Phenomic",
  "header.posts": "Posts",
}
```

```console
npm i --save flat
```

We will assume all your urls will contain the locale key as the first part

```
http://domain.tld/en
http://domain.tld/fr
```

If it's not the case, add the `route` metadata to your markdown files :

Add a metadata `locale` to your `.md` files

```markdown
---
title: Your title
route: en/your-title
---
Your content
```

So let's initialize `react-intl` by creating an `src/utils/intl.js` file.

```js
import {addLocaleData} from "react-intl"
import __intlEN from "react-intl/locale-data/en"
import __intlFR from "react-intl/locale-data/fr"
import flatten from "flat"

// Get our translations files
import localeEN from "translations/en.yml"
import localeFR from "translations/fr.yml"

// Load "en" and "fr" utils
addLocaleData(__intlEN)
addLocaleData(__intlFR)

const locales = ["fr", "en"]
const defaultLocale = "en"
const messages = {
  en: flatten(localeEN),
  fr: flatten(localeFR),
}

export function getLocale(url) {
  // Get the "en" from the url "http://domain.tld/en"
  const firstURIlevel = url.replace(/^\//, "").split("/")[0]

  // If there is not the locale in the url, we take the default locale
  return firstURIlevel && locales.indexOf(firstURIlevel) > -1
    ? firstURIlevel
    : defaultLocale
}

export function getIntl(locale) {
  // We will inject this into IntlProvider
  return {
    locale: locale,
    messages: messages[locale],
    defaultLocale: defaultLocale,
  }
}
```

Now we need to inject props to the [``IntlProvider``](https://github.com/yahoo/react-intl/wiki/Components#intlprovider).
We will use our just created function `getIntl`.

```js
import {IntlProvider} from "react-intl"
import {getIntl, getLocale} from "utils/intl"
// ...
const AppContainer = (props) => {
  const {location} = this.context
  const {children} = this.props
  const locale = getLocale(location.pathname)
  const intl = getIntl(locale)
  return (
    <IntlProvider {...intl}>
      <Container>
        <DefaultHeadMeta />
        <Header />
        <Content>
          {props.children}
        </Content>
        <Footer />
      </Container>
    </IntlProvider>
  )
}

AppContainer.contextTypes = {
  location: PropTypes.object.isRequired,
}
```

## Get your translated content

Use the `filter` option from `enhanceCollection` in your layouts to get your translated content :

```js
import {injectIntl, intlShape} from "react-intl"
import {getLocale} from "utils/intl"
// ...
class Homepage extends Component {
  render() {
    const {collection} = this.context
    const {intl} = this.props
    const data = enhanceCollection(collection, {
      // Filter the data by the "locale" front-matter metadata
      filter: (c) => c.layout === "Post"
        && getLocale(c.__url) === intl.locale,
    })

    return (
      <Page>
        // Render your data here
      </Page>
    )
  }
}

Homepage.contextTypes = {
  collection: PropTypes.array.isRequired,
}

Homepage.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(Homepage)
```

## Update your header

Once you can have your translated content, we have to add links in the header to change our locale and naviguate bewteen pages :

```js
// ...
import {Link} from "react-router"
import {FormattedMessage, injectIntl, intlShape} from "react-intl"
import {getLocale} from "utils/intl"
// ...
class Header extends Component {
  // ...
  render() {
    // We get all pages that list posts (using Posts layout) and the url which match the language
    const postsPages = enhanceCollection(collection, {
      filter: (c) => (c.layout === "Posts" && getLocale(c.__url) === intl.locale),
    })

    // Usually, we have only one page with the layout "Posts", so we get the first one
    const postsPage = postsPages.shift()

    return (
      <header>
        <nav>
          // If "postsPage" is defined, the link will redirect to "__url" front-matter data
          <Link className={styles.item} to={postsPage && postsPage.__url}>
            // Translate the key "header.posts"
            <FormattedMessage id="header.posts" />
          </Link>
          <Link to="/en">
            <FormattedMessage id="header.en" />
          </div>
          <Link to="/fr">
            <FormattedMessage id="header.fr" />
          </div>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(Header)
```
