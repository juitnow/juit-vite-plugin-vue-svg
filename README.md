# ARCHIVED

Use the newer [`vite-svg-loader`](https://www.npmjs.com/package/vite-svg-loader)

# SVG support for Vue/Vite (with TypeScript!)

This plugin allows SVG images to be used as Vue components.

This plugin was _heavily_ inspired by [`vite-plugin-vue-svg`][1] from which it
boorrows its idea, overall structure, and integration with [`svgo`][2].

### Install

If you're using `npm` then:

```bash
npm install --save-dev '@juit/vite-plugin-vue-svg'
```

### Setup

Simply add the plugin to your `vite.config.ts` as follows:

```typescript
import vue from '@vitejs/plugin-vue'
import vueSvg from '@juit/vite-plugin-vue-svg'

// See https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSvg(/* ... svgo options ... */),
  ],
})
```

The plugin can be configured with any [`svgo`][2] options.

### Types

For _types_ to be working correctly, reference our component definition in any
of your `.d.ts` files:

```typescript
/// <reference types="@juit/vite-plugin-vue-svg/client" />
```

Or simply add a couple of definition for `*.svg?component` and
`*.svg?component-raw` modules:

```typescript
declare module '*.svg?component' {
  const component: { render: Function }
  export default component
}

declare module '*.svg?component-raw' {
  const component: { render: Function }
  export default component
}
```

### Usage

Simply import the SVG file using the `.svg?component` extension and use it
in your `.vue` file:

```html
<template>
  <div>
    <svg-image />
  </div>
</template>

<script>
import svgImage from './asset/image.svg?component'

export default {
  components: {
    svgImage,
  },
};
</script>
```

If you prefer to skip the [`svgo`][2] optimization all together (useful
for example when preserving `clipPath`s within `defs`) simply import your
file as `image.svg?component-raw`.

### License

Licensed under the [Apache License, Version 2.0](LICENSE.md).

[1]: https://www.npmjs.com/package/vite-plugin-vue-svg
[2]: https://www.npmjs.com/package/svgo
