import createStore from ".."

describe("createStore", () => {

  it("should create a store with an empty state", () => {
    const store = createStore()
    expect(store.getState()).toMatchSnapshot()
  })

  it("should create a store with an filled state", () => {
    const store = createStore({ "foo": "bar" })
    expect(store.getState()).toMatchSnapshot()
  })

  it("should notify of changes", () => {
    const store = createStore()
    const subscriber = jest.fn()
    store.subscribe(subscriber)
    store.set("foo", "bar")
    expect(subscriber.mock.calls.length).toBe(1)
  })

  it("subscribe should return an unsubscribe function", () => {
    const store = createStore()
    const subscriber = jest.fn()
    const unsubscribe = store.subscribe(subscriber)
    store.set("foo", "bar")
    unsubscribe()
    store.set("bar", "baz")
    expect(subscriber.mock.calls.length).toBe(1)
  })

})
