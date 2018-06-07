// @flow

import "isomorphic-fetch";
import jsonFetch from "simple-json-fetch";

import createURL from "./url";

export default (config: PhenomicQueryConfig) => {
  return jsonFetch(
    createURL({
      ...config,
      // @todo find a way to avoid bundling the line with localhost in production
      root:
        (typeof window === "undefined"
          ? // $FlowFixMe yeah yeah
            `http://localhost:${process.env.PHENOMIC_RESTAPI_PORT}`
          : ``) + `${process.env.PHENOMIC_APP_BASENAME || "/"}phenomic`
    })
  ).then(res => res.json);
};
