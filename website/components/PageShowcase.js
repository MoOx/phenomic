// @flow

import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";

import Page from "./Page";

export default withPhenomicApi(Page, props => ({
  page: query({
    path: "content/showcase",
    id: props.params.splat,
  }),
}));
