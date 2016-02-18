// all md files as JSON + generate collections
require.context("../content", true, /\.md$/)

// ---

import "whatwg-fetch"
import statinamicClient from "statinamic/lib/client"

import { client as exports } from "../web_modules/app/exports"
import store from "app/store"

statinamicClient({
  exports,
  store,
})
