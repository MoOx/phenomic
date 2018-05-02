// @flow

import extractMetaFromBodyNode from "../extractMetaFromBodyNode.js";

it("should guess partial data from body AST", () => {
  expect(
    extractMetaFromBodyNode({
      c: [
        {
          c: [
            {
              c: [
                {
                  p: {
                    className: "icon icon-link"
                  },
                  t: "span"
                }
              ],
              p: {
                "aria-hidden": true,
                href: "#auto-title"
              },
              t: "a"
            },
            "Auto title"
          ],
          p: {
            id: "auto-title"
          },
          t: "h1"
        },
        "\n",
        {
          c: [
            {
              c: [
                {
                  p: {
                    className: "icon icon-link"
                  },
                  t: "span"
                }
              ],
              p: {
                "aria-hidden": true,
                href: "#sub-title"
              },
              t: "a"
            },
            "Sub title"
          ],
          p: {
            id: "sub-title"
          },
          t: "h2"
        },
        "\n",
        {
          c: ["Content"],
          t: "p"
        },
        "\n",
        {
          c: [
            {
              c: [
                {
                  p: {
                    className: "icon icon-link"
                  },
                  t: "span"
                }
              ],
              p: {
                "aria-hidden": true,
                href: "#another-level-2"
              },
              t: "a"
            },
            "Another Level 2"
          ],
          p: {
            id: "another-level-2"
          },
          t: "h2"
        },
        "\n",
        {
          c: [
            {
              c: [
                {
                  p: {
                    className: "icon icon-link"
                  },
                  t: "span"
                }
              ],
              p: {
                "aria-hidden": true,
                href: "#a-level-3"
              },
              t: "a"
            },
            "A level 3"
          ],
          p: {
            id: "a-level-3"
          },
          t: "h3"
        }
      ],
      t: "div"
    })
  ).toMatchSnapshot();
});
