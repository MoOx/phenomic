/**
 * This React component doesn't make anything other than rendering its children.
 *
 * It's just a way for us to make sure we can read the top-level
 * route configuration.
 */
import defaultRender from "../render/client"
import defaultRenderServer from "../render/server"

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
          const renderer = config.render || defaultRender
          return renderer(routes)
        }
      },
      renderServer: config.renderServer || defaultRenderServer,
      renderToString: config.renderToString || defaultRenderServer.renderToString,
    }
  },
}

export default PhenomicRenderer
