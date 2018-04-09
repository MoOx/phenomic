import fs from "fs";
import path from "path";

import "isomorphic-fetch";
import jsonFetch from "simple-json-fetch";

(async function() {
  try {
    const releases = (await jsonFetch(
      "https://api.github.com/repos/phenomic/phenomic/releases"
    )).json;
    releases.forEach(release => {
      // skip pre 1.x
      if (
        release.tag_name.startsWith("v0.") ||
        release.tag_name.startsWith("0.")
      )
        return;

      const date = release.published_at.slice(0, "YYYY-MM-DD".length);
      const md = `---
title: ${release.name || release.tag_name}
tag_name: ${release.tag_name}
link: ${release.html_url}
author: ${release.author.login}
prerelease: ${release.prerelease}
---

${release.body}
`;
      const filename = path.join(
        __dirname,
        "..",
        "content",
        "blog",
        date + "-" + release.tag_name + ".md"
      );
      fs.writeFileSync(filename, md);
    });
  } catch (e) {
    console.error("❌ " + e.message);
  }
})();
