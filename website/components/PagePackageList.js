// @flow

import * as React from "react";
import { View, StyleSheet } from "react-native-web";
import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";

import Flex from "./Flex";
import Spacer from "./Spacer";
import ActivityIndicator from "./ActivityIndicator";
import PageError from "./PageError";
import Header from "./Header";
import Footer from "./Footer";
import BodyContainer from "./BodyContainer";
import PackageListItem from "./PackageListItem";

const PagePackageList = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.packages.error} />;
  }

  return (
    <Flex>
      <Header title={"Packages"} />
      <BodyContainer style={styles.container}>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading && (
          <React.Fragment>
            <View style={styles.list}>
              {props.packages.node.list
                // only released pkg
                .filter(pkg => !pkg.private)
                .map(item => (
                  <PackageListItem key={item.id} package={item} />
                ))}
            </View>
            <Spacer />
          </React.Fragment>
        )}
      </BodyContainer>
      <Spacer large={true} />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});

export default withPhenomicApi(PagePackageList, () => ({
  packages: query({
    path: "packages",
    by: "keywords",
    value: "phenomic-package",
    sort: "name",
    order: "asc"
  })
}));
