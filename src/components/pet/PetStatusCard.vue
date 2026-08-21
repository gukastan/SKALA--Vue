<script setup>
defineProps({
  pet: { type: Object, required: true },
})
</script>

<template>
  <el-card class="pet-status-card" shadow="never">
    <div class="pet-status-heading"><div><span class="section-kicker">PET STATUS</span><h3>{{ pet.name }}의 상태</h3></div><el-tag type="success">{{ pet.mood }}</el-tag></div>
    <div class="status-row"><span>⚡ 체력</span><el-progress :percentage="pet.energy" :stroke-width="10" color="#67c23a" /></div>
    <div class="status-row"><span>🌿 쾌적도</span><el-progress :percentage="pet.comfort" :stroke-width="10" color="#409eff" /></div>
    <div class="status-row"><span>🍪 배고픔</span><el-progress :percentage="pet.hunger" :stroke-width="10" color="#e6a23c" /></div>
  </el-card>
</template>

<style scoped>
.pet-status-card :deep(.el-card__body) { padding: 20px; }.pet-status-heading { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }.section-kicker { color: #2680eb; font-size: 10px; font-weight: 800; letter-spacing: .12em; }.pet-status-heading h3 { margin: 5px 0 0; font-size: 19px; }.status-row { display: grid; grid-template-columns: 76px 1fr; align-items: center; gap: 12px; margin-top: 15px; color: #627d98; font-size: 12px; font-weight: 700; }
</style>
