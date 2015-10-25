import { Component, PropTypes, Children } from "react"

export default class PkgProvider extends Component {
  static propTypes = {
    pkg: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  }

  static childContextTypes = {
    pkg: PropTypes.object.isRequired,
  }

  getChildContext() {
    console.log("pkg", this.props.pkg)
    return { pkg: this.props.pkg }
  }

  render() {
    return Children.only(this.props.children)
  }
}
