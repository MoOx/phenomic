// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Header from "./Header";
import Footer from "./Footer";
import BodyContainer from "./BodyContainer";
import Flex from "./Flex";
import Spacer from "./Spacer";

const Plugins = () => {
  return (
    <Flex>
      <Header
        title={"Plugins"}
        subtitle={"Discover existing Phenomic plugins"}
      />
      <BodyContainer>
        <View style={styles.row}>
          <Spacer large={true}>
            <Text
              style={{
                color: "#32325d",
                fontSize: 24,
                fontWeight: "800",
                textAlign: "center"
              }}
            >
              {"WIP"}
            </Text>
          </Spacer>
        </View>
      </BodyContainer>
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Plugins;
