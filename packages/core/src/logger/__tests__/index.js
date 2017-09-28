import logSymbols from "log-symbols";

import logger from "..";

test("log should log", () => {
  const log = logger("sender test", false);

  // we can't snapshot because of logSymbols & colors...
  const colorStart = process.platform !== "win32" ? "[90m" : "";
  const colorEnd = process.platform !== "win32" ? "[39m" : "";

  expect(log("test msg")).toBe(
    `${logSymbols.info} ${colorStart}sender test: ${colorEnd} test msg`
  );
  expect(log.debug("test debug")).toBe(
    `  ${colorStart}sender test: ${colorEnd} test debug`
  );
  expect(log.info("test info")).toBe(
    `${logSymbols.info} ${colorStart}sender test: ${colorEnd} test info`
  );
  expect(log.success("test success")).toBe(
    `${logSymbols.success} ${colorStart}sender test: ${colorEnd} test success`
  );
  expect(log.warn("test warning")).toBe(
    `${logSymbols.warning} ${colorStart}sender test: ${colorEnd} test warning`
  );
  expect(log.error("test error")).toBe(
    `${logSymbols.error} ${colorStart}sender test: ${colorEnd} test error`
  );
});
