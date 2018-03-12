import query from "@phenomic/api-client/lib/query";

import resolve from "../resolveURLs.js";

const NoopComponent = {
  fakeComponent: true // to pass test on component being valid
};

const noopFetch = async (/*config: PhenomicQueryConfig*/) =>
  await Promise.resolve({
    list: []
  });

it("should be able to generate a single url", async () => {
  expect(
    await resolve(
      [
        {
          path: "/",
          component: NoopComponent
        }
      ],
      noopFetch
    )
  ).toMatchSnapshot();
});

it("should be able to generate a multiple static url", async () => {
  expect(
    await resolve(
      [
        {
          path: "/",
          component: NoopComponent
        },
        {
          path: "/test",
          component: NoopComponent
        }
      ],
      noopFetch
    )
  ).toMatchSnapshot();
});

it("should be able to resolve dynamic urls", async () => {
  expect(
    await resolve(
      [
        {
          path: "/test/*",
          component: {
            getQueries: (/*params: PhenomicQueryConfig*/) => ({
              test: query({
                id: "one"
                // path?: string,
                // after?: string,
                // by?: string,
                // value?: string,
                // order?: string,
                // limit?: number
              })
            })
          }
        }
      ],
      async () =>
        await Promise.resolve({
          list: [{ id: "test-1" }, { id: "test-2" }]
        })
    )
  ).toMatchSnapshot();
});
