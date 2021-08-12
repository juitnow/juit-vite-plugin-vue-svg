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

Or simply add a definition for `*.svg?component` modules:

```typescript
declare module '*.svg?component' {
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
    <SvgImage />
  </div>
</template>

<script>
import SvgImage from './asset/image.svg?component'

export default {
  components: {
    SvgImage,
  },
};
</script>
```

### License

Licensed under the [Apache License, Version 2.0](LICENSE.md).

[1]: https://www.npmjs.com/package/vite-plugin-vue-svg
[2]: https://www.npmjs.com/package/svgo
