<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import demoMp4 from '../../../images/codenect-demo.mp4'
import demoPoster from '../../../images/codenect-demo-poster.png'

/**
 * CodeNect 实况录屏 + 终端窗口 UI 框。
 * 视频为真实 TUI 录屏（codenect-demo.mp4），终端框样式与产品一致：
 * 深蓝黑底 #161b22、边框 #30363d、标题栏红黄绿圆点。
 * 视频进入视口才播放（IntersectionObserver），离开暂停；muted 循环。
 * 无 JS 环境（如 file://）依赖原生 autoplay 属性与 poster 降级。
 */

const videoEl = ref<HTMLVideoElement>()

let observer: IntersectionObserver | null = null
let fallbackTimer: ReturnType<typeof setTimeout> | null = null
let playing = false

function tryPlay() {
  if (playing) return
  const v = videoEl.value
  if (!v) return
  playing = true
  // 无 JS 的纯 HTML 环境不会走到这里；浏览器对 muted autoplay 通常直接放行
  v.play().catch(() => {
    playing = false
  })
}

function pause() {
  if (!playing) return
  playing = false
  videoEl.value?.pause()
}

onMounted(() => {
  const el = videoEl.value
  if (!el || typeof IntersectionObserver === 'undefined') {
    tryPlay()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting)
      if (visible) tryPlay()
      else pause()
    },
    { threshold: 0.2 }
  )
  observer.observe(el)
  // 兜底：observer 未按时触发（首屏可见 / 环境异常）也照常播放
  fallbackTimer = setTimeout(() => {
    if (!playing) tryPlay()
  }, 800)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (fallbackTimer) clearTimeout(fallbackTimer)
})
</script>

<template>
  <div class="cn-term">
    <div class="cn-term-bar">
      <span class="cn-term-dot" style="background: #ff5f57"></span>
      <span class="cn-term-dot" style="background: #febc2e"></span>
      <span class="cn-term-dot" style="background: #28c840"></span>
      <span class="cn-term-title">CodeNect — 实录</span>
    </div>
    <div class="cn-term-body">
      <video
        ref="videoEl"
        :src="demoMp4"
        :poster="demoPoster"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        aria-label="CodeNect 终端界面实录演示"
      ></video>
    </div>
  </div>
</template>

<style scoped>
.cn-term {
  background: var(--cn-bg);
  border: 1px solid var(--cn-border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45);
}

.cn-term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #0d1117;
  border-bottom: 1px solid var(--cn-border);
}

.cn-term-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cn-term-title {
  margin-left: 8px;
  font-size: 12px;
  color: var(--cn-dim);
  font-family: var(--vp-font-family-mono);
}

.cn-term-body {
  padding: 0;
}

.cn-term-body video {
  display: block;
  width: 100%;
  height: auto;
  background: var(--cn-bg);
}
</style>
