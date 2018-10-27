// @flow

/* eslint-disable import/first */
jest.mock("@phenomic/api-client/lib/fetch", () => () =>
  Promise.resolve({
    list: [{ id: "test-1" }, { id: "test-2" }],
  }),
);

import query from "@phenomic/api-client/lib/query";

import resolve from "../resolveURLs.js";

it("should be able to resolve dynamic urls", async () => {
  expect(
    await resolve({
      routes: [
        {
          path: "/test/*",
          component: {
            getQueries: (/*params: PhenomicQueryConfig*/) => ({
              test: query({
                // id: "one"
                // path?: string,
                // after?: string,
                // by?: string,
                // value?: string,
                // order?: string,
                // limit?: number
              }),
            }),
          },
        },
      ],
    }),
  ).toMatchSnapshot();
});
