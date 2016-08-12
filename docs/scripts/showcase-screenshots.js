import { resolve, join } from "path"
import fs from "fs"
import findCacheDir from "find-cache-dir"
const cacheDir = findCacheDir({ name: "phenomic", create: true })

import grayMatter from "gray-matter"
const showcasesFile = fs.readFileSync(
  __dirname + "/../content/showcase.md",
  { encoding: "utf-8" }
)
const showcases = grayMatter(showcasesFile)
const list = showcases.data.list
// .slice(0,2) // for tests

import urlToSlug from "../web_modules/url-to-slug"

import Nightmare from "nightmare"
const screenshotsLocation = resolve(__dirname, "../content/assets/showcases/")
const screenshots = list.reduce((screenshots, { url }) => {
  const filename = urlToSlug(url)
  return [
    ...screenshots,
    {
      url,
      tmpLocation: join(cacheDir, "screenshot-" + filename + "-large.png"),
      location: join(screenshotsLocation, filename + "-large.jpg"),
      width: 1366,
      height: 768,
    },
    {
      url,
      tmpLocation: join(cacheDir, "screenshot-" + filename + "-small.png"),
      location: join(screenshotsLocation, filename + "-small.jpg"),
      width: 360,
      height: 640,
    },
  ]
}, [])

const nightmare = Nightmare()
let prevUrl
screenshots.forEach(({ url, tmpLocation, width, height }) => {
  try {
    fs.readFileSync(tmpLocation)
  }
  catch (e) {
    console.log("Screenshots for ", url, width, height, tmpLocation)
    if (url !== prevUrl) {
      nightmare
        .goto(url)
        .wait(8000)
    }
    else {
      nightmare
      .wait(200) // wait for some logo animations & stuff (eg putaindecode.io)
    }
    nightmare
      .viewport(width, height)
      .screenshot(tmpLocation)
  }
})

import pngToJpg from "png-jpg"
import optimizer from "image-optim"

nightmare
  .end()
  .then(() => {
    console.log("✅ Showcase screenshots ready.")
    console.log("✅ Showcase optimizing screenshots...")
    screenshots.forEach(({ tmpLocation, location }) => {
      try {
        fs.readFileSync(location)
      }
      catch (e) {
        pngToJpg(
          {
            input: tmpLocation,
            output: location,
            options: { quality: 90 },
          },
          () => {
            optimizer.optimize(location)
              // .then(() => console.log(location, "optimized"))
              .catch((err) => console.log("Failed to optimize image", err))
          }
        )
      }
    })
  })
