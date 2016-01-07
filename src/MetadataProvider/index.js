import { Component, PropTypes, Children } from "react"

export default class MetadataProvider extends Component {

  static propTypes = {
    metadata: PropTypes.object,
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static childContextTypes = {
    metadata: PropTypes.object,
  };

  getChildContext() {
    return { metadata: this.props.metadata }
  }

  render() {
    return Children.only(this.props.children)
  }
}
