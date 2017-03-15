/**
 * This React component doesn't make anything other than rendering its children.
 *
 * It's just a way for us to make sure we can read the top-level
 * route configuration.
 */
import render from "../render/client"
import renderServer, { renderToString } from "../render/server"

const PhenomicRenderer = {
  createApp: function(routes) {
    return {
      routes,
      render() {
        return render(routes)
      },
      renderServer,
      renderToString,
    }
  },
}

export default PhenomicRenderer
