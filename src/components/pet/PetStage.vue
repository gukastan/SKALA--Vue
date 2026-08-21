<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  city: { type: Object, required: true },
  pet: { type: Object, required: true },
})
const configStore = useConfigStore()
const displayTemp = computed(() => configStore.unit === 'fahrenheit' ? Math.round((props.city.temp * 9) / 5 + 32) : props.city.temp)

const petFace = computed(() => {
  if (props.pet.energy < 35) return '😴'
  if (props.pet.comfort < 40) return '🥵'
  if (props.pet.hunger > 70) return '😋'
  if (props.pet.mood === '행복') return '😄'
  return '🙂'
})
</script>

<template>
  <el-card class="pet-stage-card" shadow="never">
    <div :class="['pixel-stage', city.backgroundClass]">
      <div class="pixel-stage-top"><span>📍 {{ city.name }}에 도착한 {{ pet.name }}</span><el-tag effect="dark" type="warning">{{ city.landmark }}</el-tag></div>
      <div class="pixel-weather">{{ city.weatherIcon }} {{ city.status }} · {{ displayTemp }}{{ configStore.unitSymbol }}</div>
      <div class="pixel-scene">
        <div class="pixel-landmark">▟ {{ city.landmark }} ▙</div>
        <div class="pixel-pet" role="img" :aria-label="`${pet.name} 캐릭터`">{{ petFace }}</div>
        <div class="pixel-caption">{{ pet.name }}의 여행 일지</div>
      </div>
      <div class="pixel-message">{{ city.petMessage }}</div>
    </div>
  </el-card>
</template>

<style scoped>
.pet-stage-card :deep(.el-card__body) { padding: 0; }.pixel-stage { min-height: 350px; padding: 20px; color: #fff; font-family: 'Courier New', monospace; image-rendering: pixelated; border: 4px solid #222; background-position: center; background-size: cover; }.jeonju-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/jeonju-bg.png'); }.busan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/busan-bg.png'); }.gwangju-bg { background-image: linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.12)), url('../../assets/pixel/gwangju-bg.png'); }.cheonan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/cheonan-bg.png'); }.pixel-stage-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; font-weight: 700; text-shadow: 2px 2px #222; }.pixel-weather { margin-top: 15px; font-size: 15px; font-weight: 800; text-shadow: 2px 2px #222; }.pixel-scene { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 195px; text-align: center; }.pixel-landmark { padding: 10px 14px; color: #222; background: rgba(255,255,255,.72); border: 3px solid #222; font-size: 15px; }.pixel-pet { margin-top: 18px; font-size: 72px; filter: drop-shadow(4px 4px 0 #222); }.pixel-caption { margin-top: 8px; font-size: 11px; text-shadow: 2px 2px #222; }.pixel-message { padding: 12px; color: #222; background: #fff5c2; border: 3px solid #222; font-size: 12px; font-weight: 700; line-height: 1.6; }
</style>
