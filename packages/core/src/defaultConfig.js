import path from "path";

export default {
  path: process.cwd(),
  outdir: path.join(process.cwd(), "dist"),
  port: 3333,
  bundleName: "phenomic.main",
  plugins: []
};
