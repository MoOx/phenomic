import test from "ava"
import sinon from "sinon"

import promiseMd from "../promise"

const types = [ "REQUEST", "SUCCESS", "FAILURE" ]

test("should not touch actions without promise property", (t) => {
  const spy = sinon.spy()
  const action = {}

  promiseMd()(spy)(action)

  t.true(spy.calledOnce)
  t.true(spy.calledWith(action))
})

test("should throw error if not passing a real promise", (t) => {
  const spy = sinon.spy()
  const action = {
    promise: "foo",
  }

  t.throws(() => {
    promiseMd()(spy)(action)
  }, "promiseMiddleware expects a promise object that implements then()")

  t.is(spy.callCount, 0)
})

test("should dispatch REQUEST and SUCCESS if promise resolved", async (t) => {
  const spy = sinon.spy()
  const action = {
    types,
    foo: "bar",
    promise: new Promise((resolve) => resolve(1)),
  }

  await promiseMd()(spy)(action)

  t.true(
    spy.firstCall.calledWith({
      foo: "bar",
      type: "REQUEST",
    })
  )
  t.true(
    spy.secondCall.calledWith({
      foo: "bar",
      response: 1,
      type: "SUCCESS",
    })
  )
  t.is(spy.callTwice)
})

test("should dispatch REQUEST and FAILURE if promise rejected", async (t) => {
  const spy = sinon.spy()
  const action = {
    types,
    foo: "bar",
    promise: new Promise((resolve, reject) => reject(2)),
  }

  await promiseMd()(spy)(action)

  t.true(
    spy.firstCall.calledWith({
      foo: "bar",
      type: "REQUEST",
    })
  )
  t.true(
    spy.secondCall.calledWith({
      foo: "bar",
      response: 2,
      type: "FAILURE",
    })
  )
  t.is(spy.callTwice)
})
