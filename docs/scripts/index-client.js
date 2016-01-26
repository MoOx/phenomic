import "whatwg-fetch"
import statinamicClient from "statinamic/lib/client"

import pkg from "../package.json"
import routes from "app/routes"
import store from "app/store"

statinamicClient({
  metadata: {
    pkg,
  },
  routes,
  store,
})
