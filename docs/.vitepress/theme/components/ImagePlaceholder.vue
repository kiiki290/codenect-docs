<template>
  <div class="img-placeholder">
    <div class="img-placeholder-icon">插图占位</div>
    <div class="img-placeholder-desc">{{ desc }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ desc: string }>()
</script>

<style scoped>
.img-placeholder {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
  padding: 40px 24px;
  margin: 16px 0;
  text-align: center;
  background: var(--vp-c-bg-soft);
}
.img-placeholder-icon {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.img-placeholder-desc {
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  line-height: 1.6;
}
</style>
