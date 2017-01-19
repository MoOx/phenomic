const renderHTML = require("./server/renderHTML")
// const render = require("./server/render")
const getRoutes = require("./server/getRoutes")

module.exports = function() {
  return {
    renderHTML,
    // render,
    getRoutes,
  }
}
