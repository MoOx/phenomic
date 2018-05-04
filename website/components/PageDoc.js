// @flow

import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";

import Page from "./Page";

export default withPhenomicApi(Page, props => {
  // doc for presets are in packages/*/docs/*
  // and our routes are docs/*/*
  // (special part for preset/plugin that are docs/(preset|plugin)/*/*)
  const pieces = props.params.splat ? props.params.splat.split("/") : [];
  let pkg = pieces.shift() || "core";
  if (pkg === "preset" || pkg === "plugin") {
    pkg += "-" + pieces.shift();
  }
  const id = pieces.length > 0 ? pieces.join("/") : "";

  return {
    page: query({
      path: `packages/${pkg}`,
      id: `docs${id ? "/" + id : ""}`
    }),
    pages: query({
      path: `packages/${pkg}`
    })
  };
});
