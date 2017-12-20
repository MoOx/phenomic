import resolve from "../resolve.js";

const NoopComponent = {
  fakeComponent: true // to pass test on component being valid
};

const noopFetch = async (/*config: PhenomicQueryConfig*/) => {
  return await Promise.resolve({
    test: true
  });
};

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
