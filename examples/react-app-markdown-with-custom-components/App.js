// @noflow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import {
  createApp,
  withPhenomicApi,
  query,
  BodyRenderer
} from "@phenomic/preset-react-app/lib/client";

const componentsMap = {
  uppercase: props => props.children.map(child => child.toUpperCase()),
  expand: class Expand extends React.Component<
    { children: React.Node },
    { isExpanded: boolean }
  > {
    state = {
      isExpanded: false
    };
    filterChild = child =>
      typeof child !== "string" || child.replace(/\s/g, "") !== "";
    filterChildren = (children: React.Node) =>
      Array.isArray(children)
        ? children.filter(this.filterChild)
        : this.filterChild(children) ? [children] : [];

    handleClick = () => {
      this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
    };
    render() {
      const children = this.filterChildren(this.props.children);
      return (
        <div>
          <div onClick={this.handleClick}>{children[0]}</div>
          {this.state.isExpanded && <div>{children.slice(1)}</div>}
        </div>
      );
    }
  },
  title: props => (
    <div style={{ border: "1px solid blue", padding: "10px " }}>
      {props.children}
    </div>
  ),
  content: props => (
    <div style={{ border: "1px solid red", padding: "10px" }}>
      {props.children}
    </div>
  ),
  draft: props =>
    process.env.NODE_ENV !== "production" && (
      <div style={{ opacity: 0.5 }}>{props.children}</div>
    )
};

const Content = ({ hasError, isLoading, page }) => {
  if (hasError) {
    return "Error!";
  }

  return (
    <div>
      {isLoading && "Loading..."}
      {!isLoading &&
        page.node && (
          <div>
            <h1>{page.node.title}</h1>
            <BodyRenderer components={componentsMap}>
              {page.node.body}
            </BodyRenderer>
          </div>
        )}
    </div>
  );
};

const ContentContainer = withPhenomicApi(Content, () => ({
  page: query({ id: "index" })
}));

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={ContentContainer} />
  </Router>
));
