import { createContainer, query } from "@phenomic/preset-react-app/lib/client";

import Page from "../Page";

export default createContainer(Page, props => ({
  page: query({
    collection: "docs",
    id: props.params.splat
  })
}));
