[![NPM Downloads](https://img.shields.io/npm/dy/%40angius%2Fbun-plugin-solid?style=flat-square&logo=npm&labelColor=CB3837)](https://www.npmjs.com/package/@angius/bun-plugin-solid)
![GitHub License](https://img.shields.io/github/license/atulin/bun-plugin-solid?style=flat-square)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/atulin/bun-plugin-solid/publish-npm.yml?style=flat-square)
![Static Badge](https://img.shields.io/badge/built%20with%20bun-f472b6?style=flat-square&logo=bun&labelColor=black)


# bun-plugin-solid

A plugin to compile Solid.js code with Bun.

```bash
bun add -D bun-plugin-solid
```

```ts
import { SolidPlugin } from "bun-plugin-solid";

await Bun.build({
  // ...
  plugins: [SolidPlugin()],
});
```

## Options

All passed options are forwarded to [`babel-preset-solid`](https://www.npmjs.com/package/babel-preset-solid). For example:

```ts
await Bun.build({
  // ...
  plugins: [SolidPlugin({ generate: "ssr", hydratable: true })],
});
```

Additionally, you can pass Babel `TransformOptions`

```ts
await Bun.build({
  // ...
  plugins: [SolidPlugin({ babelOptions: { plugins: [[someBabelPlugin, {}]] } })],
});
```

## About this plugin and motivation

This plugin uses babel under the hood, which is not ideal. However, there is (currently) no clear public roadmap for proper compilation of Solid.js in Bun, so this plugin is a temporary solution for those (like me) who want to use Bun to build their Solid.js projects.

The hope is that it'll become obsolete once there is a better solution, at which point it can simply be removed.

The plugin will only run in for `.jsx` and `.tsx` files.
