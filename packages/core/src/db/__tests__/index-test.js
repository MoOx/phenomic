import db from "..";

describe("db", () => {
  beforeEach(() => {
    // $FlowFixMe whatever
    jest.resetModuleRegistry();
  });

  let i = 0;

  it("should be able to put & get a value", () => {
    return db
      .put("foo", "bar", { data: { title: "bar" } })
      .then(() => db.get("foo", "bar"))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: { title: "baz" } }),
      db.put("bar" + i, "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar" + i, {}, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a reversed list", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: { title: "baz" } }),
      db.put("bar" + i, "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar" + i, { reverse: true }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after (starting) some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: { title: "baz" } }),
      db.put("bar" + i, "eoo", { data: { title: "eoo" } }),
      db.put("bar" + i, "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar" + i, { gte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list after some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: { title: "baz" } }),
      db.put("bar" + i, "eoo", { data: { title: "eoo" } }),
      db.put("bar" + i, "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar" + i, { gt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before (starting) some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: { title: "baz" } }),
      db.put("bar" + i, "eoo", { data: { title: "eoo" } }),
      db.put("bar" + i, "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar" + i, { lte: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list before some value", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: { title: "baz" } }),
      db.put("bar" + i, "eoo", { data: { title: "eoo" } }),
      db.put("bar" + i, "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar" + i, { lt: "eoo" }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should be able to get a list with a limited count", () => {
    i++;
    return Promise.all([
      db.put("bar" + i, "baz", { data: { title: "baz" } }),
      db.put("bar" + i, "foo", { data: { title: "foo" } })
    ])
      .then(() => db.getList("bar" + i, { limit: 1 }, "default", ""))
      .then(value => expect(value).toMatchSnapshot());
  });

  it("should throw when value isn't there", () => {
    return db.get("foo", "baz").catch(error => expect(error).toMatchSnapshot());
  });
});
