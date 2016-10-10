// eslint-disable-next-line import/no-namespace
import * as pageActions from "../redux/modules/pages"

export default (mdContext, collection, store) => (file) => {
  const item = collection.find(
    (item) => item.__filename === file.slice("./".length)
  )
  const dataUrl = mdContext(file)
  if (dataUrl !== item.__dataUrl) {
    item.__dataUrl = dataUrl
    console.log(file, " hot update")
    store.dispatch(pageActions.refresh(item.__url, item.__dataUrl))
  }
}
