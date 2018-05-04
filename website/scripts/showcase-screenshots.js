// @flow

import { resolve, join } from "path";
import fs from "fs";

import mkdirp from "mkdirp";
import grayMatter from "gray-matter";
import puppeteer from "puppeteer";
import pngToJpg from "png-jpg";
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
const list = listTmp; //.slice(0, 2); // for tests

mkdirp.sync(cacheDir);
mkdirp.sync(screenshotsLocation);

const screenshots = list.reduce((screenshots, { file, url }) => {
  const filename = urlToSlug(url);
  return [
    ...screenshots,
    {
      file,
      url,
      pngLocation: join(cacheDir, filename + "-large.png"),
      jpgLocation: join(screenshotsLocation, filename + "-large.jpg"),
      ...screenshotsSize.large
    },
    {
      file,
      url,
      pngLocation: join(cacheDir, filename + "-small.png"),
      jpgLocation: join(screenshotsLocation, filename + "-small.jpg"),
      ...screenshotsSize.small
    }
  ];
}, []);

const optimizeScreenshot = async ({ url, pngLocation, jpgLocation }) => {
  // skip file if they already exist
  try {
    fs.readFileSync(jpgLocation);
    return Promise.resolve();
  } catch (e) {
    return new Promise((resolve, reject) => {
      try {
        pngToJpg(
          {
            input: pngLocation,
            output: jpgLocation,
            options: { quality: 90 }
          },
          () => {
            optimizer
              .optimize(jpgLocation)
              .then(() => console.log("📦 ", url, "optimized"))
              .then(resolve)
              // .catch(err => console.log("Failed to optimize image", err));
              .catch(reject);
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }
};

(async () => {
  const browser = await puppeteer.launch();
  for (const s in screenshots) {
    const { file, url, pngLocation, jpgLocation, width, height } = screenshots[
      s
    ];
    const page = await browser.newPage();
    try {
      fs.readFileSync(pngLocation);
    } catch (e) {
      console.log("📷 ", url, "Missing screenshots", width, height);
      try {
        await page.goto(url);
        if (
          (await page.$("#PhenomicRoot")) === null &&
          (await page.$("#phenomic")) === null &&
          (await page.$("#statinamic")) === null // back to the future
        ) {
          console.error("⚠️ ", url, "Website seems not to run phenomic");
          console.error("🚒 git rm " + join(showcaseDir, file));
        } else {
          await page.setViewport({ width, height });
          await page.screenshot({ path: pngLocation });
          console.log("📸 ", url, width, height);
        }
      } catch (e) {
        console.error("🚨 ", url, e);
      }
    }
    // optimize only if available
    let optimize;
    try {
      fs.readFileSync(pngLocation);
      optimize = true;
    } catch (e) {
      optimize = false;
    }
    if (optimize) {
      await optimizeScreenshot({ url, pngLocation, jpgLocation });
    }
  }

  await browser.close();
})();
