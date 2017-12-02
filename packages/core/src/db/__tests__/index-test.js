import db from "..";

describe("db", () => {
  beforeEach(() => {
    // $FlowFixMe whatever
    jest.resetModuleRegistry();
  });

  it("should be able to put & get a value", () => {
    return db
      .put("foo", "bar", { data: { title: "bar" } })
      .then(() => db.get("foo", "bar"))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list", () => {
    return Promise.all([
      db.put("bar", "baz", { data: { title: "baz" } }),
      db.put("bar", "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar", {}, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a reversed list", () => {
    return Promise.all([
      db.put("bar2", "baz", { data: { title: "baz" } }),
      db.put("bar2", "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar2", { reverse: true }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after (starting) some value", () => {
    return Promise.all([
      db.put("bar3", "baz", { data: { title: "baz" } }),
      db.put("bar3", "eoo", { data: { title: "eoo" } }),
      db.put("bar3", "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar3", { gte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after some value", () => {
    return Promise.all([
      db.put("bar4", "baz", { data: { title: "baz" } }),
      db.put("bar4", "eoo", { data: { title: "eoo" } }),
      db.put("bar4", "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar4", { gt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before (starting) some value", () => {
    return Promise.all([
      db.put("bar5", "baz", { data: { title: "baz" } }),
      db.put("bar5", "eoo", { data: { title: "eoo" } }),
      db.put("bar5", "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar5", { lte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before some value", () => {
    return Promise.all([
      db.put("bar6", "baz", { data: { title: "baz" } }),
      db.put("bar6", "eoo", { data: { title: "eoo" } }),
      db.put("bar6", "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar6", { lt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list with a limited count", () => {
    return Promise.all([
      db.put("bar7", "baz", { data: { title: "baz" } }),
      db.put("bar7", "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar7", { limit: 1 }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should throw when value isn't there", () => {
    return db.get("foo", "baz").catch(error => expect(error).toMatchSnapshot());
  });
});
