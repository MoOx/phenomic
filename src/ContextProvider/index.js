import { Component, PropTypes, Children } from "react"

export default class StatinamicContext extends Component {

  static propTypes = {
    collection: PropTypes.array,
    layouts: PropTypes.object,
    metadata: PropTypes.object,
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static childContextTypes = {
    collection: PropTypes.array,
    layouts: PropTypes.object,
    metadata: PropTypes.object,
  };

  getChildContext() {
    return {
      collection: this.props.collection,
      layouts: this.props.layouts,
      metadata: this.props.metadata,
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}
