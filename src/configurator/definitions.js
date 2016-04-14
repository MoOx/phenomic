export default {
  "cwd": {
    type: "string",
    description: (
      "base directory (eg: where 'source' and 'destination' should be"
    ),
    default: process.cwd(),
  },
  "source": {
    type: "string",
    description: "source folder of your content (md, assets, etc)",
    default: "content",
  },
  "destination": {
    type: "string",
    description: "destination folder of your build",
    default: "dist",
  },
  "assets": {
    // types: string, objects, boolean and falsy value
    description: "path to static assets (images, media etc)",
    default: "assets",
  },
  "appcache": {
    // deprecated
    description: "DEPRECATED: enable appcache support",
  },
  "offline": {
    // types: boolean, object
    description: "flag to enable offline usage via appcache and service worker",
  },
  "CNAME": {
    type: "boolean",
    description: "flag to enable automatic generation of a CNAME file",
    default: false,
  },
  "nojekyll": {
    type: "boolean",
    description: (
      "flag to generate a .nojekyll file, to avoid Jekyll automatic step on" +
      "GitHub Pages",
    ),
    default: true,
  },
  "devHost": {
    type: "string",
    description: "host used during development",
    default: "0.0.0.0",
  },
  "devPort": {
    description: "port used during development",
    default: 3000,
  },
  "verbose": {
    type: "boolean",
    description: "flag to enable a more verbose output",
    default: false,
  },
  "dev": {
    type: "boolean",
    description: "flag to enable dev mode (hot loading)",
    default: false,
  },
  "production": {
    type: "boolean",
    description: "flag to enable production (optimized) mode",
    default: false,
  },
  "static": {
    type: "boolean",
    description: "flag to enable static build",
    default: false,
  },
  "server": {
    type: "boolean",
    description: "flag to enable development server",
    default: false,
  },
  "open": {
    type: "boolean",
    description: "flag to automatically open development server",
    default: true,
  },
}
