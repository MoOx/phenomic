---
priority: 3
title: Configuration
subtitle: How to configure Phenomic
---

@todo

## Source

* comsmiconfig (package.json, .phenomicrc, phenomic.config.js ...)

## Options

```js
declare type PhenomicInputPluginOption = { [optionName: string]: mixed };

declare type PhenomicInputPlugin =
  | string
  // | {| default: PhenomicPluginModule<PhenomicInputPluginOption> |}
  | PhenomicPluginModule<PhenomicInputPluginOption>;

declare type PhenomicInputPluginWithOptionalOptions =
  | PhenomicInputPlugin
  | $ReadOnlyArray<PhenomicInputPlugin | PhenomicInputPluginOption>;

declare type PhenomicInputPreset = (any) => PhenomicInputPlugins;
declare type PhenomicInputMaybePreset = string | PhenomicInputMaybePreset;

declare type PhenomicInputPlugins = {|
  plugins?:
    | $ReadOnlyArray<PhenomicInputPluginWithOptionalOptions>
    | {
        [name: string]: PhenomicInputPluginWithOptionalOptions
      },
  presets?: $ReadOnlyArray<
    | PhenomicInputMaybePreset
    | $ReadOnlyArray<
      | PhenomicInputMaybePreset
      | $ReadOnlyArray<$ReadOnlyArray<string | PhenomicInputPluginOption>>
      | {
        [name: string]: PhenomicInputPluginOption
      }
    >
  >
|};

type globs = $ReadOnlyArray<string>;

declare type PhenomicInputConfig = {|
  baseUrl?: string,
  path?: string,
  content?: { [key: string]: globs | {| root: string, globs: globs |} },
  outdir?: string,
  port?: number,
  socketPort?: number,
  bundleName?: string,
  ...PhenomicInputPlugins
|};
```
