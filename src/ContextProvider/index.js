// @flow
/* eslint-disable react/sort-comp */
import { Component, PropTypes, Children } from "react"

export default class StatinamicContext extends Component {
  props: {
    collection: StatinamicCollection,
    layouts: Object,
    metadata: Object,
    children?: any,
  };

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

  getChildContext(): Object {
    return {
      collection: this.props.collection,
      layouts: this.props.layouts,
      metadata: this.props.metadata,
    }
  }

  render(): React$Element {
    return Children.only(this.props.children)
  }
}
