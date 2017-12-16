import db from "..";

describe("db", () => {
  beforeEach(() => {
    // $FlowFixMe whatever
    jest.resetModuleRegistry();
  });

  it("should be able to put & get a value", () => {
    return db
      .put("foo", "bar", { data: { title: "bar" }, partial: { title: "bar" } })
      .then(() => db.get("foo", "bar"))
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
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("bar" + i, "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("bar" + i, {}, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a reversed list", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("bar" + i, "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("bar" + i, { reverse: true }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after (starting) some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("bar" + i, "eoo", { data: {}, partial: { title: "title-eoo" } }),
      db.put("bar" + i, "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("bar" + i, { gte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("bar" + i, "eoo", { data: {}, partial: { title: "title-eoo" } }),
      db.put("bar" + i, "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("bar" + i, { gt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before (starting) some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("bar" + i, "eoo", { data: {}, partial: { title: "title-eoo" } }),
      db.put("bar" + i, "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("bar" + i, { lte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("bar" + i, "eoo", { data: {}, partial: { title: "title-eoo" } }),
      db.put("bar" + i, "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("bar" + i, { lt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list with a limited count", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: {}, partial: { title: "title-baz" } }),
      db.put("bar" + i, "foo", { data: {}, partial: { title: "title-foo" } })
    ])
      .then(() => db.getList("bar" + i, { limit: 1 }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should throw when value isn't there", () => {
    return db.get("foo", "baz").catch(error => expect(error).toMatchSnapshot());
  });

  it("should be able to get a list with a specific query", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "foo", {
        data: { title: "title-foo", tags: ["a", "b"] },
        partial: { title: "title-foo" }
      }),
      db.put("bar" + i, "bar", {
        data: { title: "title-bar", tags: ["a", "c"] },
        partial: { title: "title-bar" }
      }),
      db.put("bar" + i, "baz", {
        data: { title: "title-baz", tags: ["b", "c"] },
        partial: { title: "title-baz" }
      })
    ])
      .then(() => db.getList("bar" + i, {}, "tags", "a"))
      .then(value => expect(value).toMatchSnapshot());
  });
});
