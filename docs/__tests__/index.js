import globby from "globby";

it("should build docs correctly", () => {
  const testFolder = __dirname + "/../dist";
  const files = globby.sync("**/*", {
    cwd: testFolder,
    nodir: true
  });

  // should have html files
  expect(files.filter(file => file.endsWith(".html"))).toMatchSnapshot();
});
