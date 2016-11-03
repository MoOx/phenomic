---
title: Internationalize your content
---

You may need to add internationalization to your site to handle multiple locales.

## Get react-intl

First you need to add `react-intl` to your `package.json`

```console
npm i -S react-intl
```

## Translate your content

We will use a `YAML` file to translate our content.

Add `yaml-loader` and `json-loader` to your package.json.

```console
npm i -D yaml-loader json-loader
```

Add the `yaml-loader` to your `webpack` loaders config to handle `.yml` files.

```javascript
{
  test: /\.yml$/,
  loader: "json!yaml",
},
```

Now create differents `.yml` files under `translations` folder.
If you want handle two languages, you have to create two files, with language key as filename.

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

## Create redux action

We will define our `redux` actions constants.
Create an `actions.js` file under a `constants` folder.

```javascript
export const SET_LOCALE = "SET_LOCALE"
```

## Create intl actions

We need to implement the `setLocale` `redux` action.

We will need the `flat` lib to transform our translations files into flatten objects

```console
npm i -S flat
```

Create a `intl.js` file under an `actions` folder.

```javascript
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

## Create intl reducer

Create a `intl.js` file under a `reducers` folder

```
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

## Add intl reducer to your store

```
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

## Overide intl in context

The default `intl` in context can't change. We need to override the `intl` context by `intl` state from our `redux` store.
To do that, let's update the `AppContainer.js` :

```javascript
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

## Get your translated content

Add a metadata `locale` to your `.md` files

```markdown
---
title: Your title
locale: en
---
Your content
```

Then, use the `filter` option from `enhanceCollection` in your layouts to get your translated content :

```javascript
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

## Update your header

Once you can have your translated content, we have to add two buttons in the header to change our locale.

```javascript
...
import {browserHistory} from "phenomic/lib/client"
import {setLocale} from "actions/intl"
...
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
...
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

_Note:

## Initialize with right locale

Now we need to initialize the site with the right locale.

To do this, open your `scripts/phenomic.browser.js` and add :

```javascript
import {setLocale} from "actions/intl"
const DEFAULT_LOCALE = "en"
...
let locale = window.localStorage.getItem("locale")

if (locale !== null) {
  store.dispatch(setLocale(locale))
} else {
  store.dispatch(setLocale(DEFAULT_LOCALE))
}
```
