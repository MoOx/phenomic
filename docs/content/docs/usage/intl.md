---
title: Internationalize your content
---

You have multiple solutions available to help you translate your user interface
and handle multiple locales.

Here we will explain 2 solutions based on
[react-int](https://github.com/yahoo/react-intl).

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

`en.yml`:

```yml
locale: "en"

messages:
  phenomic-is-awesome: "Phenomic is awesome !"
```

`fr.yml`:

```yml
locale: "fr"

messages:
  phenomic-is-awesome: "Phenomic est génial !"
```

From now you have 2 variations: with or without redux.

Without redux the thing will be pretty simple:

We will assume all your urls will contain the locale key as the first part

```
http://domain.tld/en
http://domain.tld/fr
```

You can read the locale like this in your appContainer using ``location`` from
react-router context

```js
const locale = location.pathname.replace(/^\//, "").split("/")[0]
```

For you homepage, you can choose to rely on a default locale in your code.

This should be enough in most cases.

When you have the locale, you can rely on it in ``AppContainer`` to initialize
[``IntlProvider``](https://github.com/yahoo/react-intl/wiki/Components#intlprovider)

// @todo document more

That said, you might want something more complex, you can use the following
section.

---

## Using Redux

### Create redux action

We will define our `redux` actions constants.
Create an `actions.js` file under a `constants` folder.

```js
export const SET_LOCALE = "SET_LOCALE"
```

### Create intl actions

We need to implement the `setLocale` `redux` action.

We will need the `flat` lib to transform our translations files into flatten objects

```console
npm i -S flat
```

Create a `intl.js` file under an `actions` folder.

```js
import {addLocaleData} from "react-intl"
import flatten from "flat"

// Import locales you need to handle
import __intlEN from "react-intl/locale-data/en"
import __intlFR from "react-intl/locale-data/fr"

// Import your translations files
import localeEN from "translations/en.yml"
import localeFR from "translations/fr.yml"

import {SET_LOCALE} from "constants/actions"

addLocaleData(__intlEN)
addLocaleData(__intlFR)

function compileLocale(locale, {messages, formats = {}}) {
  return {locale, messages: flatten(messages), formats}
}

const LOCALES = {
  "en": compileLocale("en", localeEN),
  "fr": compileLocale("fr", localeFR),
}

export function setLocale(locale) {
  window.localStorage.setItem("locale", locale)
  return {type: SET_LOCALE, ...LOCALES[locale]}
}
```

### Create intl reducer

Create a `intl.js` file under a `reducers` folder

```js
import {SET_LOCALE} from "constants/actions"

const initialState = {
  locale: null,
  messages: null,
  formats: null,
}

export default function intlReducer(state = initialState, action) {
  if (action.type === SET_LOCALE) {
    return {
      locale: action.locale,
      messages: action.messages,
      formats: action.formats,
    }
  }

  return state
}
```

### Add intl reducer to your store

```js
import {combineReducers} from "redux"
...
import * as phenomicReducers from "phenomic/lib/redux/modules"
import intl from "reducers/intl"
const store = createStore(
  combineReducers({
    ...phenomicReducers,
    ...{
      intl
    },
  }),
  {...(typeof window !== "undefined") && window.__INITIAL_STATE__},
  [
    thunk,
    createLogger({collapsed: true}),
  ],
)
```

### Overide intl in context

The default `intl` in context can't change. We need to override the `intl` context by `intl` state from our `redux` store.
To do that, let's update the `AppContainer.js` :

```js
import {connect} from "react-redux"
...
const ReduxIntlProvider = connect(state => state.intl)(IntlProvider)
const AppContainer = (props) => (
  <ReduxIntlProvider>
    <Container>
      <DefaultHeadMeta />
      <Header />
      <Content>
        {props.children}
      </Content>
      <Footer />
    </Container>
  </ReduxIntlProvider>
)
```

### Get your translated content

Add a metadata `locale` to your `.md` files

```markdown
---
title: Your title
locale: en
---
Your content
```

Then, use the `filter` option from `enhanceCollection` in your layouts to get your translated content :

```js
...
class Homepage extends Component {
  render() {
    const {collection} = this.context
    const data = enhanceCollection(collection, {
      filter: {locale: this.props.currentLocale},
    })

    return (
      <Page>
        // Render your data here
      </Page>
    )
  }
}
...
export default connect(
  ({intl}) => ({currentLocale: intl.locale}),
)(Homepage)
```

### Update your header

Once you can have your translated content, we have to add two buttons in the header to change our locale.

```js
// ...
import {browserHistory} from "phenomic/lib/client"
import {setLocale} from "actions/intl"
// ...
class Header extends Component {
  ...
  render() {
    const {updateLocale} = this.props
    return (
      <header>
        <nav>
          ...
          <div onClick={() => updateLocale("en")}>{"en"}</div>
          <div onClick={() => updateLocale("fr")}>{"fr"}</div>
        </nav>
      </header>
    )
  }
}
// ...
export default connect(
  null,
  dispatch => ({
    ...
    updateLocale: (locale) => {
      dispatch(setLocale(locale))

      /*
        We recommend you to use different urls for each language and to redirect to your homepage.
        Have a uniq url for a specific language has advantages :
          - your SEO will be better
          - your users could share urls easier with the right locale
          - your UX will be better because you will avoid flash effect when the locale will change
      */
      browserHistory.push("/")
    },
  })
)(Header)
```

### Initialize with right locale

Now we need to initialize the site with the right locale.

To do this, open your `scripts/phenomic.browser.js` and add :

```js
import { setLocale } from "actions/intl"
const DEFAULT_LOCALE = "en"

// ...

store.dispatch(setLocale(window.localStorage.getItem("locale") || DEFAULT_LOCALE)
```
