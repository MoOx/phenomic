// @flow
import * as React from "react";
import PropTypes from "prop-types";
import withContext from "recompose/withContext";
import compose from "recompose/compose";
import { HashLink } from "react-router-hash-link";

function Link(props, context) {
  const { to, href } = props;
  let url = to || href || "";

  if (url.indexOf("#") === 0) {
    url = window.location.pathname + url;
  }
  const LinkComponent = compose(
    withContext(
      {
        router: PropTypes.object.isRequired
      },
      () => ({
        router: { history: context.router }
      })
    )
  )(HashLink);
  LinkComponent.displayName = "LinkComponent";

  return <LinkComponent {...props} to={url} />;
}

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

Link.displayName = "Link";

export default Link;
