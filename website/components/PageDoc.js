// @flow

import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";

import Page from "./Page";

export default withPhenomicApi(Page, props => {
  return {
    page: query({
      path: `packages`,
      id: props.params.splat
    }),
    pages: query({
      path: `packages`
    })
  };
});
