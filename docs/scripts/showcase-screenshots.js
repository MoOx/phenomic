import { resolve, join } from "path"
import fs from "fs"

import mkdirp from "mkdirp"
import findCacheDir from "find-cache-dir"
const cacheDir = findCacheDir({
  name: join("phenomic", "screenshots"),
  create: true,
})

const showcaseDir = join(__dirname, "..", "content", "showcase", "entry")

import grayMatter from "gray-matter"
const showcasesFile = fs.readdirSync(showcaseDir)

const listTmp = []
showcasesFile.forEach((file) => {
  const showcaseFile = fs.readFileSync(
    join(showcaseDir, file),
    { encoding: "utf-8" }
  )
  const showcase = grayMatter(showcaseFile)

  listTmp.push(showcase.data)
})

// console.log(listTmp)
const list = listTmp
  // .slice(0,2) // for tests

import urlToSlug from "../src/utils/url-to-slug"

import Nightmare from "nightmare"
const screenshotsLocation = resolve(
  __dirname, "..", "content", "assets", "showcases"
)
mkdirp.sync(screenshotsLocation)
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

const nightmare = Nightmare({
  waitTimeout: 30000,
  gotoTimeout: 30000,
  loadTimeout: 30000,
})
let prevUrl
screenshots.forEach(({ url, tmpLocation, width, height }) => {
  try {
    fs.readFileSync(tmpLocation)
  }
  catch (e) {
    console.log("☐ Missing screenshots for", url, width, height)
    if (url !== prevUrl) {
      nightmare.goto(url)
    }
    nightmare
      .wait(2000) // wait for some logo animations & stuff (eg putaindecode.io)
      .viewport(width, height)
      .screenshot(tmpLocation)
  }
})

import pngToJpg from "png-jpg"
import optimizer from "image-optim"

nightmare
  .end()
  .then(() => {
    console.log("ℹ️ Showcase screenshots saved")
    console.log("ℹ️ Optimizing screenshots...")
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
    console.log("✅ Showcase screenshots ready.")
  })
  .catch((e) => console.error(e))
