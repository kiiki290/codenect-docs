// 离线静态包构建：相对路径构建 + dist 路径改写 + 链接完整性校验
// 用法：node scripts/build-offline.mjs —— 产物在 docs/.vitepress/dist/
//
// 背景：VitePress 默认输出绝对路径（/assets/...、/guide/...），file:// 双击打开会挂。
// DOCS_OFFLINE=1 时 config.mts 用 base './'，但 VitePress 只生成 './' 前缀（不按嵌套深度
// 生成 '../'），嵌套页面（guide/xxx.html）下的 './assets/...' 会解析错位。本脚本在构建后
// 按每个 HTML 的目录深度改写为深度感知的相对路径，并校验所有引用指向真实文件。
import { execSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(repoRoot, 'docs', '.vitepress', 'dist')

console.log('[1/3] 构建（DOCS_OFFLINE=1）...')
execSync('npm run docs:build', {
  cwd: repoRoot,
  env: { ...process.env, DOCS_OFFLINE: '1' },
  stdio: 'inherit',
  shell: true,
})

function collectHtml(dir, base) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...collectHtml(p, join(base, name)))
    else if (name.endsWith('.html')) out.push({ file: p, rel: join(base, name) })
  }
  return out
}

const EXTERNAL = /^(#|data:|https?:|mailto:|javascript:|tel:|\/\/)/

// 把 VitePress 生成的 './x' 或 '/x' 改写为相对当前页面深度的路径。
// 刻意不保留 './' 前缀（裸相对路径）——file:// 下避免客户端路由拦截，走整页加载最稳。
function rewrite(v, depth) {
  if (!v || EXTERNAL.test(v)) return v
  if (v === '/' || v === './') return '../'.repeat(depth) + 'index.html'
  if (v.startsWith('/')) return '../'.repeat(depth) + v.slice(1)
  if (v.startsWith('./')) return '../'.repeat(depth) + v.slice(2)
  return v // '../...' 或裸相对路径，原样保留
}

const pages = collectHtml(dist, '')

console.log(`[2/3] 改写 ${pages.length} 个 HTML 的路径...`)
let rewritten = 0
for (const page of pages) {
  const depth = page.rel.split(sep).length - 1
  const html = readFileSync(page.file, 'utf8')
  const next = html.replace(/(href|src)="([^"]*)"/g, (m, attr, v) => {
    const w = rewrite(v, depth)
    if (w !== v) rewritten++
    return `${attr}="${w}"`
  })
  writeFileSync(page.file, next)
}
console.log(`    改写 ${rewritten} 处引用`)

console.log('[3/3] 校验所有引用指向真实文件...')
let bad = 0
for (const page of pages) {
  const html = readFileSync(page.file, 'utf8')
  for (const [, , v] of html.matchAll(/(href|src)="([^"]*)"/g)) {
    if (!v || EXTERNAL.test(v)) continue
    let decoded = v
    try { decoded = decodeURIComponent(v) } catch { /* 原样使用 */ }
    if (!existsSync(join(dirname(page.file), decoded))) {
      console.error(`  [X] ${page.rel}: "${v}" 目标不存在`)
      bad++
    }
  }
}
if (bad > 0) {
  console.error(`校验失败：${bad} 处引用无对应文件`)
  process.exit(1)
}
console.log('完成：离线包已就绪（docs/.vitepress/dist/）')
