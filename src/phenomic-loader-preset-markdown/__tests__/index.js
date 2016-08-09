import test from "ava"

import preset from ".."

test("should handle markdown", (t) => {
  t.deepEqual(
    preset.reduce((result, plugin) => plugin({
      frontMatter: {
        data: { title: "Front Matter" },
        content: "\nThis is **content**.",
      },
      result,
      options: {},
    }), {}),
    {
      head: {
        title: "Front Matter",
        description: "This is content.",
      },
      body: "<p>This is <strong>content</strong>.</p>\n",
    }
  )
})
