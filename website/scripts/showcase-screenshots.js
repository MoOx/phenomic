// @flow

import { resolve, join } from "path";
import fs from "fs";

import mkdirp from "mkdirp";
import grayMatter from "gray-matter";
import puppeteer from "puppeteer";
import optimizer from "image-optim";

import urlToSlug from "../modules/url-to-slug";
import { screenshotsSize } from "../package.json";

const cacheDir = resolve(__dirname, "..", ".screenshots");
const showcaseDir = resolve(__dirname, "..", "content", "showcase", "entry");
const screenshotsLocation = resolve(
  __dirname,
  "..",
  "public",
  "showcase",
  "entry"
);

const showcasesFiles = fs
  .readdirSync(showcaseDir)
  .filter(file => !file.startsWith("."));

const listTmp = [];
showcasesFiles.forEach(file => {
  const showcaseFile = fs.readFileSync(join(showcaseDir, file), {
    encoding: "utf-8"
  });
  const showcase = grayMatter(showcaseFile);

  listTmp.push({ file, ...showcase.data });
});

// console.log(listTmp);
// process.exit(1);
const list = listTmp; // .slice(0, 2); // for tests

mkdirp.sync(cacheDir);
mkdirp.sync(screenshotsLocation);

const screenshots = list.reduce((screenshots, { file, url }) => {
  const filename = urlToSlug(url);
  return [
    ...screenshots,
    {
      file,
      url,
      jpgLocation: join(screenshotsLocation, filename + "-large.jpg"),
      ...screenshotsSize.large
    },
    {
      file,
      url,
      jpgLocation: join(screenshotsLocation, filename + "-small.jpg"),
      ...screenshotsSize.small
    }
  ];
}, []);

const optimizeScreenshot = async ({ url, jpgLocation }) => {
  return optimizer
    .optimize(jpgLocation)
    .then(() => console.log("📦 ", url, "optimized"));
};

(async () => {
  const browser = await puppeteer.launch({
    // netlify fails to run puppeteer
    // https://github.com/GoogleChrome/puppeteer/issues/1321#issuecomment-378361236
    args: ["--disable-dev-shm-usage"]
  });
  for (const s in screenshots) {
    const { file, url, jpgLocation, width, height } = screenshots[s];
    try {
      // skip if jpeg exist
      fs.readFileSync(jpgLocation);
    } catch (e) {
      try {
        console.log("👉 Visiting ", url);
        const page = await browser.newPage();
        await page.goto(url);
        if (
          (await page.$("#PhenomicRoot")) === null &&
          (await page.$("#phenomic")) === null &&
          (await page.$("#statinamic")) === null // back to the future
        ) {
          console.error("⚠️ ", url, "Website seems not to run phenomic");
          console.error("🚒 tip: git rm " + join(showcaseDir, file));
        } else {
          console.log("📷 ", url, "Taking screenshot", width, height);
          await page.setViewport({ width, height });
          await page.screenshot({
            path: jpgLocation,
            type: "jpeg",
            quality: 40
          });
          await optimizeScreenshot({ url, jpgLocation });
          console.log("📸 ", url, width, height);
        }
      } catch (e) {
        console.error("🚨 ", url, e.message);
      }
    }
  }

  await browser.close();
})();
