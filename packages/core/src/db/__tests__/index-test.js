import db from "..";

describe("db", () => {
  beforeEach(() => {
    // $FlowFixMe whatever
    jest.resetModuleRegistry();
  });

  it("should be able to put & get a value", () => {
    return Promise.all([
      db.put("collection-1", "bar", {
        data: { title: "bar" },
        partial: { title: "bar" }
      })
    ])
      .then(() => db.get("collection-1", "bar"))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get an item with relations", () => {
    i++;
    return Promise.all([
      db.put("authors" + i, "foo", {
        data: { name: "foo-name", bio: "foo-bio" },
        partial: { name: "foo-name" }
      }),
      db.put("bar" + i, "foo", {
        data: { ["authors" + i]: ["foo"] },
        partial: { ["authors" + i]: ["foo"] }
      })
    ])
      .then(() => db.get("bar" + i, "foo"))
      .then(value => expect(value).toMatchSnapshot());
  });

  let i = 0;

  it("should be able to get a list", () => {
    return Promise.all([
      db.put("test-list", "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("test-list", "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("test-list", {}, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a reversed list", () => {
    return Promise.all([
      db.put("test-reversed-list", "baz", {
        data: {},
        partial: { title: "title-baz" }
      }),
      db.put("test-reversed-list", "foo", {
        data: {},
        partial: { title: "title-foo" }
      })
    ])
      .then(() =>
        db.getList("test-reversed-list", { reverse: true }, "default", "")
      )
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after (starting) some value", () => {
    return Promise.all([
      db.put("test-gte-list", "baz", {
        data: {},
        partial: { title: "title-baz" }
      }),
      db.put("test-gte-list", "eoo", {
        data: {},
        partial: { title: "title-eoo" }
      }),
      db.put("test-gte-list", "foo", {
        data: {},
        partial: { title: "title-foo" }
      })
    ])
      .then(() => db.getList("test-gte-list", { gte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after some value", () => {
    return Promise.all([
      db.put("test-gt-list", "baz", {
        data: {},
        partial: { title: "title-baz" }
      }),
      db.put("test-gt-list", "eoo", {
        data: {},
        partial: { title: "title-eoo" }
      }),
      db.put("test-gt-list", "foo", {
        data: {},
        partial: { title: "title-foo" }
      })
    ])
      .then(() => db.getList("test-gt-list", { gt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before (starting) some value", () => {
    return Promise.all([
      db.put("test-lte-list", "baz", {
        data: {},
        partial: { title: "title-baz" }
      }),
      db.put("test-lte-list", "eoo", {
        data: {},
        partial: { title: "title-eoo" }
      }),
      db.put("test-lte-list", "foo", {
        data: {},
        partial: { title: "title-foo" }
      })
    ])
      .then(() => db.getList("test-lte-list", { lte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before some value", () => {
    return Promise.all([
      db.put("test-lt-list", "baz", {
        data: {},
        partial: { title: "title-baz" }
      }),
      db.put("test-lt-list", "eoo", {
        data: {},
        partial: { title: "title-eoo" }
      }),
      db.put("test-lt-list", "foo", {
        data: {},
        partial: { title: "title-foo" }
      })
    ])
      .then(() => db.getList("test-lt-list", { lt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list with a limited count", () => {
    return Promise.all([
      db.put("test-limit-list", "baz", {
        data: {},
        partial: { title: "title-baz" }
      }),
      db.put("test-limit-list", "foo", {
        data: {},
        partial: { title: "title-foo" }
      })
    ])
      .then(() => db.getList("test-limit-list", { limit: 1 }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should throw when value isn't there", () => {
    try {
      db.get("error", "baz");
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });

  it("should be able to get a list with a specific query", () => {
    return Promise.all([
      db.put("test-query-list", "foo", {
        data: { title: "title-foo", tags: ["a", "b"] },
        partial: { title: "title-foo" }
      }),
      db.put("test-query-list", "bar", {
        data: { title: "title-bar", tags: ["a", "c"] },
        partial: { title: "title-bar" }
      }),
      db.put("test-query-list", "baz", {
        data: { title: "title-baz", tags: ["b", "c"] },
        partial: { title: "title-baz" }
      })
    ])
      .then(() => db.getList("test-query-list", {}, "tags", "a"))
      .then(value => expect(value).toMatchSnapshot());
  });
});
