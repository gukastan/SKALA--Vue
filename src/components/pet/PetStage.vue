<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  city: { type: Object, required: true },
  pet: { type: Object, required: true },
})
const configStore = useConfigStore()
const displayTemp = computed(() => configStore.unit === 'fahrenheit' ? Math.round((props.city.temp * 9) / 5 + 32) : props.city.temp)

const petState = computed(() => {
  if (props.pet.energy < 35) return 'sleepy'
  if (props.pet.comfort < 40) return 'hot'
  if (props.pet.hunger > 70) return 'hungry'
  if (props.pet.mood === '행복') return 'happy'
  return 'normal'
})
</script>

<template>
  <el-card class="pet-stage-card" shadow="never">
    <div :class="['pixel-stage', city.backgroundClass]">
      <div class="pixel-stage-top"><span>📍 {{ city.name }}에 도착한 {{ pet.name }}</span><el-tag effect="dark" type="warning">{{ city.landmark }}</el-tag></div>
      <div class="pixel-weather">{{ city.weatherIcon }} {{ city.status }} · {{ displayTemp }}{{ configStore.unitSymbol }}</div>
      <div class="pixel-scene">
        <div :class="['pixel-pet', `is-${petState}`]" role="img" :aria-label="`${pet.name} 캐릭터`"><span class="pixel-eye left"></span><span class="pixel-eye right"></span><span class="pixel-mouth"></span></div>
        <div class="pixel-caption">{{ pet.name }}의 여행 일지</div>
      </div>
      <div class="pixel-message">{{ city.petMessage }}</div>
    </div>
  </el-card>
</template>

<style scoped>
.pet-stage-card :deep(.el-card__body) { padding: 0; }.pixel-stage { min-height: 270px; padding: 14px; color: #fff; font-family: 'Courier New', monospace; image-rendering: pixelated; border: 3px solid #222; background-position: center; background-size: cover; }.jeonju-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/jeonju-bg.png'); }.busan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/busan-bg.png'); }.gwangju-bg { background-image: linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.12)), url('../../assets/pixel/gwangju-bg.png'); }.cheonan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/cheonan-bg.png'); }.pixel-stage-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 11px; font-weight: 700; }.pixel-stage-top > span, .pixel-weather { padding: 5px 8px; background: rgba(24,24,27,.66); border: 2px solid #222; text-shadow: 2px 2px #222; }.pixel-weather { display: inline-block; margin-top: 9px; font-size: 13px; font-weight: 800; }.pixel-scene { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 135px; text-align: center; }.pixel-pet { position: relative; width: 76px; height: 64px; margin-top: 7px; background: #facc15; border: 4px solid #222; box-shadow: 7px 7px 0 rgba(0,0,0,.35); }.pixel-pet::before, .pixel-pet::after { content: ''; position: absolute; top: -13px; width: 19px; height: 17px; background: #facc15; border: 4px solid #222; border-bottom: 0; }.pixel-pet::before { left: 7px; transform: skewY(-22deg); }.pixel-pet::after { right: 7px; transform: skewY(22deg); }.pixel-eye { position: absolute; top: 22px; z-index: 1; width: 7px; height: 10px; background: #222; }.pixel-eye.left { left: 20px; }.pixel-eye.right { right: 20px; }.pixel-mouth { position: absolute; left: 29px; bottom: 12px; width: 18px; height: 6px; border-bottom: 3px solid #222; border-radius: 0 0 12px 12px; }.is-sleepy .pixel-eye { height: 3px; top: 26px; }.is-hot { background: #fb923c; }.is-hungry .pixel-mouth { width: 10px; left: 33px; height: 10px; border: 3px solid #222; }.is-happy { background: #fde047; }.pixel-caption { margin-top: 7px; font-size: 10px; text-shadow: 2px 2px #222; }.pixel-message { padding: 9px 11px; color: #222; background: #fff5c2; border: 2px solid #222; font-size: 11px; font-weight: 700; line-height: 1.45; }
</style>
