import logger from "..";

test("log should log", () => {
  const log = logger("sender test", false);
  if (process.platform !== "win32") {
    expect(log("test msg")).toMatchSnapshot();
    expect(log.debug("test debug")).toMatchSnapshot();
    expect(log.info("test info")).toMatchSnapshot();
    expect(log.success("test success")).toMatchSnapshot();
    expect(log.warn("test warning")).toMatchSnapshot();
    expect(log.error("test error")).toMatchSnapshot();
  } else {
    expect(log("test msg").includes("test msg")).toBe(true);
    expect(log("test msg").includes("sender test")).toBe(true);
  }
});
