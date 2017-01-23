/**
 * This React component doesn't make anything other than rendering its children.
 *
 * It's just a way for us to make sure we can read the top-level
 * route configuration.
 */
const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

const PhenomicRenderer = {
  createApp: function(routes, config = {}) {
    return {
      routes,
      render() {
        if (canUseDOM) {
          const renderer = config.render || require("../render/client")
          return renderer(routes)
        }
      },
      renderServer: config.renderServer || require("../render/server"),
      renderToString: config.renderToString || require("../render/server").renderToString,
    }
  },
}

export default PhenomicRenderer
