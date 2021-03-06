import { compileTemplate } from '@vue/compiler-sfc'
import { Plugin } from 'vite'
import { optimize } from 'svgo'
import { createHash } from 'crypto'
import { readFile } from 'fs/promises'

import type { OptimizeOptions } from 'svgo'
export type { OptimizeOptions }

export default function(options: OptimizeOptions = {}): Plugin {
  return {
    name: 'vue-svg',
    async transform(code: string, path: string, ssr?: boolean) {
      void ssr

      // If not our own, then return undefined
      const match = path.match(/\.svg\?component(-raw)?$/)
      if (! match) return

      // If we match ".svg?component-raw" do NOT optimize
      const optimized = !match[1]

      // The filename (basically, id w/o '?component')
      const filename = path.slice(0, optimized ? -10 : -14)

      // Read up the source from the file
      const source = await readFile(filename, 'utf-8')

      // Optimize the SVG code if necessary
      const svg = optimized ?
          optimize(source, { ...options, path: filename }).data :
          source

      // Create an ID from filename + hash
      const id = createHash('sha256')
          .update(path, 'utf-8')
          .update(source, 'utf-8')
          .digest('hex')
          .substr(0, 8)

      const compiled = compileTemplate({
        source: svg,
        filename,
        id,
        compilerOptions: {
          sourceMap: true,
        },
      })

      return {
        code: compiled.code + '\nexport default { render }',
        map: compiled.map as any, // usual version as string/number!
      }
    },
  }
}
