import test from "ava"
import checkEngine from "../check-engine"

test("should not throw when sastifies", (t) => {
  t.notThrows(checkEngine)
})

// process.version is READONLY
test.todo("should throw when sastifies")
