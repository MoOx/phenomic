import { createStore } from "redux"

export default createStore(
  (state) => (state),
  {
    pages: {
      "/": {
        home: "page",
      },
    },
  }
)
