// @flow

module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": [
          "composes",
        ],
      },
    ],

    // too annoying during development
    //
    "block-no-empty": null,

    // does not make sense when you comment a line of code in a block
    "comment-empty-line-before": null,

    // atom command to comment code don't add space, so super annoying...
    "comment-whitespace-inside": null,
  },
}
