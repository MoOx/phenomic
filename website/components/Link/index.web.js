import * as React from "react";
import { Text, TouchableOpacity } from "react-native-web";
// eslint-disable-next-line
import PropTypes from "prop-types";
// eslint-disable-next-line
import {
  isActive,
  handleEvent
} from "@phenomic/plugin-renderer-react/lib/components/Link.js";

const BASENAME = process.env.PHENOMIC_APP_BASENAME || "/";

type PropsType = {
  style?: any,
  activeStyle?: any,
  href: string
};

const Link = (
  { style, activeStyle, href, ...props }: PropsType,
  context: Object
) => {
  return (
    <Text
      {...props}
      accessibilityRole="link"
      style={[style, isActive(href, context) && activeStyle]}
      href={href.indexOf("://") > -1 ? href : BASENAME + href.slice(1)}
      onPress={handleEvent(props, context.router)}
    />
  );
};

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

// @todo using TouchableOpacity make the external links unusable with keyboard
// https://github.com/necolas/react-native-web/issues/643

/* eslint-disable */
Link.Block = ({ BlockComponent, blockProps, ...props }: PropsType) => (
  <BlockComponent
    {...blockProps}
    style={[blockProps.style, { flexGrow: 1 }]}
    accessible={false}
  >
    <Link {...props} style={[props.style, { display: "flex" }]} />
  </BlockComponent>
);
Link.Block.defaultProps = {
  BlockComponent: TouchableOpacity
};

Link.TouchableOpacity = (props: PropsType) => (
  <TouchableOpacity accessible={false}>
    <Link {...props} />
  </TouchableOpacity>
);
/* eslint-enable */

export default Link;
