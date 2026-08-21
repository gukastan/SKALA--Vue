<script setup>
import { useConfigStore } from '@/stores/configStore'
const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label">단위</span>
    <el-switch
      :model-value="configStore.unit === 'fahrenheit'"
      active-text="°F"
      inactive-text="°C"
      @change="configStore.toggleUnit"
    />
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-left: auto;
  color: #627d98;
  font-size: 12px;
  font-weight: 700;
}
</style>
