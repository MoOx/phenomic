import { resolve, join } from "path";
import fs from "fs";

import mkdirp from "mkdirp";
import grayMatter from "gray-matter";
import Nightmare from "nightmare";
import pngToJpg from "png-jpg";
import optimizer from "image-optim";

import urlToSlug from "../modules/url-to-slug";
import { screenshotsSize } from "../package.json";

const cacheDir = resolve(__dirname, "..", ".screenshots");
const showcaseDir = resolve(__dirname, "..", "content", "showcase-entries");
const screenshotsLocation = resolve(
  __dirname,
  "..",
  "public",
  "showcase",
  "entry"
);

const showcasesFile = fs.readdirSync(showcaseDir);

const listTmp = [];
showcasesFile.forEach(file => {
  const showcaseFile = fs.readFileSync(join(showcaseDir, file), {
    encoding: "utf-8"
  });
  const showcase = grayMatter(showcaseFile);

  listTmp.push(showcase.data);
});

// console.log(listTmp)
const list = listTmp;
// .slice(0,2) // for tests

mkdirp.sync(screenshotsLocation);
const screenshots = list.reduce((screenshots, { url }) => {
  const filename = urlToSlug(url);
  return [
    ...screenshots,
    {
      url,
      tmpLocation: join(cacheDir, filename + "-large.png"),
      location: join(screenshotsLocation, filename + "-large.jpg"),
      ...screenshotsSize.large
    },
    {
      url,
      tmpLocation: join(cacheDir, filename + "-small.png"),
      location: join(screenshotsLocation, filename + "-small.jpg"),
      ...screenshotsSize.small
    }
  ];
}, []);

const nightmare = Nightmare(
  {
    // waitTimeout: 30000,
    // gotoTimeout: 30000,
    // loadTimeout: 30000,
  }
);
let prevUrl;
screenshots.forEach(({ url, tmpLocation, width, height }) => {
  try {
    fs.readFileSync(tmpLocation);
  } catch (e) {
    console.log("☐ Missing screenshots for", url, width, height);
    if (url !== prevUrl) {
      nightmare.goto(url).wait(15000); // eg: huge backgrounds are slow to get :)
    }
    nightmare
      .wait(2000) // wait for some logo animations & stuff (eg putaindecode.io)
      .viewport(width, height)
      .screenshot(tmpLocation);
  }
});

nightmare
  .end()
  .then(() => {
    console.log("✅ Showcase screenshots cached");
    console.log("ℹ️ Optimizing screenshots...");
    return Promise.all(
      screenshots.map(({ tmpLocation, location }) => {
        // skip file if they already exist
        try {
          fs.readFileSync(location);
          return Promise.resolve();
        } catch (e) {
          return new Promise((resolve, reject) => {
            try {
              pngToJpg(
                {
                  input: tmpLocation,
                  output: location,
                  options: { quality: 90 }
                },
                () => {
                  optimizer
                    .optimize(location)
                    // .then(() => console.log(location, "optimized"))
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
      })
    );
  })
  .then(() => console.log("✅ Showcase screenshots ready."))
  .catch(e => console.error(e));
