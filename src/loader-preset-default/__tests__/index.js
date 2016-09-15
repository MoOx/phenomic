import test from "jest-ava-api"

import preset from ".."

test("should do the basic requirements", (t) => {
  t.deepEqual(
    preset.reduce((result, plugin) => plugin({
      frontMatter: {
        orig: "---\ntitle: Front Matter\n---\nThis is content.",
        data: { title: "Front Matter" },
        content: "\nThis is content.",
      },
      result,
      options: {},
    }), {}),
    {
      head: { title: "Front Matter" },
      body: "\nThis is content.",
    }
  )
})
