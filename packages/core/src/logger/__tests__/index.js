import logger from "..";

test("log should log", () => {
  const log = logger("sender test", false);
  expect(log("test msg")).toMatchSnapshot();
  expect(log.debug("test debug")).toMatchSnapshot();
  expect(log.info("test info")).toMatchSnapshot();
  expect(log.success("test success")).toMatchSnapshot();
  expect(log.warn("test warning")).toMatchSnapshot();
  expect(log.error("test error")).toMatchSnapshot();
});
