// @flow

/* eslint-disable import/first */
jest.mock("@phenomic/api-client/lib/fetch", () => () =>
  Promise.resolve({
    list: [],
  }),
);

import resolve from "../resolveURLs.js";

const NoopComponent = {
  fakeComponent: true, // to pass test on component being valid
};

it("should be able to generate a single url", async () => {
  expect(
    await resolve({
      routes: [
        {
          path: "/",
          component: NoopComponent,
        },
      ],
    }),
  ).toMatchSnapshot();
});

it("should be able to generate a multiple static url", async () => {
  expect(
    await resolve({
      routes: [
        {
          path: "/",
          component: NoopComponent,
        },
        {
          path: "/test",
          component: NoopComponent,
        },
      ],
    }),
  ).toMatchSnapshot();
});

it("should be able to get urls from the static method", async () => {
  function getAllPossibleUrls({ path }) {
    if (!path.includes(":arg")) return [path];
    return [1, 2, 3].map(i => path.replace(":arg", String(i)));
  }

  expect(
    await resolve({
      routes: [
        {
          path: "/",
          component: {
            getAllPossibleUrls,
          },
        },
        {
          path: "/test/:arg",
          component: {
            getAllPossibleUrls,
          },
        },
      ],
    }),
  ).toMatchSnapshot();
});
