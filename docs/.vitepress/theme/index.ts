import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ImagePlaceholder from './components/ImagePlaceholder.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImagePlaceholder', ImagePlaceholder)
  },
} satisfies Theme
