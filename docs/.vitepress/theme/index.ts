import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ImagePlaceholder from './components/ImagePlaceholder.vue'
import HomeLayout from './layouts/HomeLayout.vue'
import './styles/home.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImagePlaceholder', ImagePlaceholder)
    // 首页自定义布局：index.md frontmatter `layout: home-custom` 生效
    app.component('home-custom', HomeLayout)
  },
} satisfies Theme
