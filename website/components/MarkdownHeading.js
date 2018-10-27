// @flow

import * as React from "react";
import { StyleSheet, createElement } from "react-native-web";

import IconLink from "../svgs/IconLink";

import Link from "./Link";
import Hoverable from "./react-stylable/hoverable";
import Focusable from "./react-stylable/focusable";

/* eslint-disable react/no-multi-comp */

const RNIconLink = p => createElement(IconLink, p);

const MarkdownHeading = (level: number) => {
  const Header = p => createElement("h" + level, p);
  return Hoverable(
    Focusable(({ hovered, focused, ...props }: Object) => {
      return (
        <Header {...props}>
          <Link
            href={"#" + props.id}
            style={[styles.link, (hovered || focused) && styles.linkVisible]}
          >
            <RNIconLink style={styles.icon} />
          </Link>
          {props.children.slice(1)}
        </Header>
      );
    }),
  );
};

const anchorSize = 22;
const anchorPadding = 6;
const styles = StyleSheet.create({
  link: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: -anchorSize - anchorPadding,
    transitionDuration: "0.2s",
    opacity: 0,
  },
  linkVisible: {
    opacity: 0.8,
  },
  icon: {
    height: anchorSize + anchorPadding,
    padding: anchorPadding,
  },
});

const headings = {
  H1: MarkdownHeading(1),
  H2: MarkdownHeading(2),
  H3: MarkdownHeading(3),
  H4: MarkdownHeading(4),
  H5: MarkdownHeading(5),
  H6: MarkdownHeading(6),
};

export default headings;
