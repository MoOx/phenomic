// @flow

import * as React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native-web";

import { version } from "../../lerna.json";
import PhenomicLogoWhite from "../svgs/PhenomicLogoWhite";
import PhenomicText from "../svgs/PhenomicText";

import Link from "./Link";
import Spacer from "./Spacer";

class PhenomicLogo extends React.PureComponent<void, void> {
  componentDidMount() {
    if (typeof window !== undefined) {
      window.addEventListener("resize", this.handleLayout);
    }
  }

  componentWillUnmount() {
    if (typeof window !== undefined) {
      window.removeEventListener("resize", this.handleLayout);
    }
  }

  handleLayout = () => {
    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.forceUpdate();
      }, 500);
    }
  };

  render() {
    const { width } = Dimensions.get("window");

    return (
      <Spacer style={styles.container}>
        <Link.Touchable href="/">
          <Spacer small={true} style={{ flex: 0 }}>
            <PhenomicLogoWhite height="42" />
          </Spacer>
        </Link.Touchable>
        {width > 500 && (
          <View style={{ flexShrink: 1 }}>
            <Link.Touchable href="/">
              <Spacer small={true}>
                <PhenomicText height="18" />
              </Spacer>
            </Link.Touchable>
            <Link.Touchable
              href="https://github.com/phenomic/phenomic/releases"
              style={styles.version}
            >
              <Spacer small={true}>
                <Text style={styles.versionText}>{"v" + version}</Text>
              </Spacer>
            </Link.Touchable>
          </View>
        )}
      </Spacer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 64,
    flexDirection: "row",
    alignItems: "center",
  },
  version: {
    position: "absolute",
    bottom: -Spacer.normal,
    textDecorationLine: "none",
    color: "#fff",
    opacity: 0.2,
    fontSize: 12,
  },
  versionText: {
    wordBreak: "keep-all",
  },
});

export default PhenomicLogo;
