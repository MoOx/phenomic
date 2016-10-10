// @flow

// Install ServiceWorker and AppCache in the end since it's not most important
// operation and if main code fails, we do not want it installed
import offlinePluginRuntime from "offline-plugin/runtime"

console.log("SW Event:", "Installing")
offlinePluginRuntime.install({
  // you can specify here some code to respond to events
  // see here for more informations
  // https://www.npmjs.com/package/offline-plugin#runtime
  onInstalled: () => {
    console.log("SW Event:", "onInstalled")
  },
  onUpdating: () => {
    console.log("SW Event:", "onUpdating")
  },
  onUpdateReady: () => {
    console.log("SW Event:", "onUpdateReady")
    offlinePluginRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.log("SW Event:", "onUpdated")
    window.location.reload()
  },
  onUninstalled: () => {
    console.log("SW Event:", "onUninstalled")
  },
})
// See webpack configuration file for more offline options
