import logSymbols from "log-symbols";

import logger from "..";

test("log should log", () => {
  const log = logger("sender test", false);
  // we can't snapshot because of logSymbols
  expect(log("test msg")).toBe(
    `${logSymbols.info} [90msender test: [39m test msg`
  );
  expect(log.debug("test debug")).toBe(`  [90msender test: [39m test debug`);
  expect(log.info("test info")).toBe(
    `${logSymbols.info} [90msender test: [39m test info`
  );
  expect(log.success("test success")).toBe(
    `${logSymbols.success} [90msender test: [39m test success`
  );
  expect(log.warn("test warning")).toBe(
    `${logSymbols.warning} [90msender test: [39m test warning`
  );
  expect(log.error("test error")).toBe(
    `${logSymbols.error} [90msender test: [39m test error`
  );
});
