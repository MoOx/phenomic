import * as React from "react";

import { getDisplayName } from "./utils";
import withPhenomicApi from "./withPhenomicApi";

export default function deprecatedCreateContainer<P>(
  ComposedComponent: React.ComponentType<P>,
  getQueries: (props: Object) => Object = () => ({})
) {
  const displayName = getDisplayName(ComposedComponent);
  console.warn(
    "`createContainer` has been renamed to `withPhenomicApi`. You can just replace this and this warning will go away (you can import the new name from the same place as before), in " +
      displayName
  );
  return withPhenomicApi(ComposedComponent, getQueries);
}
