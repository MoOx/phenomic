import { Component, PropTypes, Children } from "react"

export default class ContextProvider extends Component {
  static propTypes = {
    pkg: PropTypes.object.isRequired,
    children: PropTypes.element,
  }

  static childContextTypes = {
    pkg: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { pkg: this.props.pkg }
  }

  render() {
    return Children.only(this.props.children)
  }
}
