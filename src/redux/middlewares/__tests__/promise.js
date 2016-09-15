import promiseMd from "../promise"

const types = [ "REQUEST", "SUCCESS", "FAILURE" ]

describe("redux > middlewares > promise", () => {
  it("should not touch actions without promise property", () => {
    const spy = jest.fn()
    const action = {}

    promiseMd()(spy)(action)

    expect(spy.mock.calls.length).toBe(1)
    expect(spy).toBeCalledWith(action)
  })

  it("should throw error if not passing a real promise", () => {
    const spy = jest.fn()
    const action = {
      promise: "foo",
    }

    expect(() =>{
      promiseMd()(spy)(action)
    })
    .toThrowError(
      "promiseMiddleware expects a promise object that implements then()"
    )

    expect(spy).not.toBeCalled()
  })

  it("should dispatch REQUEST and SUCCESS if promise resolved", async () => {
    const spy = jest.fn()
    const action = {
      types,
      foo: "bar",
      promise: new Promise((resolve) => resolve(1)),
    }

    await promiseMd()(spy)(action)

    // 1st call, 1st arg
    expect(spy.mock.calls[0][0]).toEqual({
      foo: "bar",
      type: "REQUEST",
    })
    // 2nd call, 2nd arg
    expect(spy.mock.calls[1][0]).toEqual({
      foo: "bar",
      response: 1,
      type: "SUCCESS",
    })
    expect(spy.mock.calls.length).toBe(2)
  })
  it("should dispatch REQUEST and FAILURE if promise rejected", async () => {
    const spy = jest.fn()
    const action = {
      types,
      foo: "bar",
      promise: new Promise((resolve, reject) => reject(2)),
    }

    await promiseMd()(spy)(action)

    // 1st call, 1st arg
    expect(spy.mock.calls[0][0]).toEqual({
      foo: "bar",
      type: "REQUEST",
    })
    // 2nd call, 2nd arg
    expect(spy.mock.calls[1][0]).toEqual({
      foo: "bar",
      response: 2,
      type: "FAILURE",
    })
    expect(spy.mock.calls.length).toBe(2)
  })
})
