import React, { Component, PropTypes } from "react"
import { createDevTools } from "redux-devtools"
import LogMonitor from "redux-devtools-log-monitor"
import DockMonitor from "redux-devtools-dock-monitor"

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <LogMonitor theme="twilight" />
  </DockMonitor>
)

export default DevTools

export class DevToolsComponent extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  constructor(props) {
    super(props)
    this.isComponentMounted = false
  }

  componentDidMount() {
    this.isComponentMounted = true
    this.forceUpdate()
  }

  render() {
    if (!this.isComponentMounted) {
      return null
    }
    return (
      <DevTools store={ this.props.store } />
    )
  }
}
