import { Component, PropTypes, Children } from "react"

export default class PhenomicContext extends Component {
  props: {
    collection: PhenomicCollection,
    metadata: Object,
    children?: any,
  };

  static propTypes = {
    collection: PropTypes.array,
    metadata: PropTypes.object,
    children: PropTypes.node,
  };

  static childContextTypes = {
    collection: PropTypes.array,
    metadata: PropTypes.object,
  };

  getChildContext(): Object {
    return {
      collection: this.props.collection,
      metadata: this.props.metadata,
    }
  }

  render(): React$Element<any> {
    return Children.only(this.props.children)
  }
}
