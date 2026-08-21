<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import happyPuppySprite from '../../assets/pixel/pet-puppy-happy.png'
import normalPuppySprite from '../../assets/pixel/pet-puppy-normal.png'
import sleepyPuppySprite from '../../assets/pixel/pet-puppy-sleepy.png'
import hungryPuppySprite from '../../assets/pixel/pet-puppy-hungry.png'

const props = defineProps({
  city: { type: Object, required: true },
  pet: { type: Object, required: true },
})
const configStore = useConfigStore()
const displayTemp = computed(() => configStore.unit === 'fahrenheit' ? Math.round((props.city.temp * 9) / 5 + 32) : props.city.temp)

const petState = computed(() => {
  if (props.pet.energy < 35) return 'sleepy'
  if (props.pet.hunger > 70) return 'hungry'
  if (props.pet.mood === '행복') return 'happy'
  return 'normal'
})

const puppySprite = computed(() => ({
  happy: happyPuppySprite,
  normal: normalPuppySprite,
  sleepy: sleepyPuppySprite,
  hungry: hungryPuppySprite,
}[petState.value]))
</script>

<template>
  <el-card class="pet-stage-card" shadow="never">
    <div class="pet-device">
      <div class="device-screen-label">WEATHER PET · {{ city.name }}</div>
      <div class="device-screen">
        <div :class="['pixel-stage', city.backgroundClass]">
          <div class="pixel-stage-top"><span>📍 {{ city.name }}에 도착한 {{ pet.name }}</span><el-tag effect="dark" type="warning">{{ city.landmark }}</el-tag></div>
          <div class="pixel-weather">{{ city.weatherIcon }} {{ city.status }} · {{ displayTemp }}{{ configStore.unitSymbol }}</div>
          <div class="pixel-scene">
            <img :class="['pixel-puppy-sprite', `is-${petState}`]" :src="puppySprite" :alt="`${pet.name} ${petState} 캐릭터`" />
            <div class="pixel-caption">{{ pet.name }}의 여행 일지</div>
          </div>
          <div class="pixel-message">{{ city.petMessage }}</div>
        </div>
      </div>
      <div class="device-controls"><span>◀ SELECT</span><span>● OK</span><span>▶ BACK</span></div>
    </div>
  </el-card>
</template>

<style scoped>
.pet-stage-card :deep(.el-card__body) { padding: 0; }.pet-device { padding: 14px 14px 11px; border: 4px solid #8c6a58; border-radius: 26px; background: linear-gradient(145deg, #fff0c9, #f4c9d5); box-shadow: inset 0 -6px #e5a8b9, 0 5px 0 #8c6a58; }.device-screen-label { margin: 0 10px 9px; color: #d65f83; font: 800 11px 'Courier New', monospace; letter-spacing: .12em; text-align: center; }.device-screen { padding: 7px; border: 4px solid #8c6a58; border-radius: 18px; background: #f6dce1; box-shadow: inset 0 0 0 3px #fff1d1; }.pixel-stage { min-height: 330px; padding: 14px; color: #fff; font-family: 'Courier New', monospace; image-rendering: pixelated; border: 3px solid #222; border-radius: 10px; background-position: center; background-size: cover; }.jeonju-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/jeonju-bg.png'); }.busan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/busan-bg.png'); }.gwangju-bg { background-image: linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.12)), url('../../assets/pixel/gwangju-bg.png'); }.cheonan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/cheonan-bg.png'); }.pixel-stage-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 11px; font-weight: 700; }.pixel-stage-top > span, .pixel-weather { padding: 5px 8px; background: rgba(24,24,27,.66); border: 2px solid #222; text-shadow: 2px 2px #222; }.pixel-weather { display: inline-block; margin-top: 9px; font-size: 13px; font-weight: 800; }.pixel-scene { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; text-align: center; }.pixel-puppy { position: relative; width: 106px; height: 93px; margin-top: 3px; filter: drop-shadow(6px 6px 0 rgba(0,0,0,.35)); }.pixel-puppy-head { position: absolute; left: 18px; top: 8px; z-index: 2; width: 70px; height: 63px; background: #f2d3a1; border: 4px solid #222; }.pixel-ear { position: absolute; z-index: 1; top: 7px; width: 25px; height: 70px; background: #292524; border: 4px solid #222; }.pixel-ear.left { left: 2px; transform: rotate(8deg); }.pixel-ear.right { right: 2px; transform: rotate(-8deg); }.pixel-eye { position: absolute; top: 21px; z-index: 3; width: 7px; height: 10px; background: #222; }.pixel-eye.left { left: 19px; }.pixel-eye.right { right: 19px; }.pixel-muzzle { position: absolute; left: 16px; bottom: 7px; width: 39px; height: 24px; background: #fff1d0; border: 3px solid #222; }.pixel-nose { position: absolute; left: 13px; top: -8px; width: 11px; height: 8px; background: #222; }.pixel-mouth { position: absolute; left: 14px; bottom: 3px; width: 12px; height: 5px; border-bottom: 3px solid #222; }.pixel-collar { position: absolute; left: 23px; bottom: 8px; z-index: 3; width: 62px; height: 8px; background: #b91c1c; border: 3px solid #222; }.is-sleepy .pixel-eye { height: 3px; top: 25px; }.is-hot .pixel-puppy-head { background: #f4b183; }.is-hungry .pixel-mouth { width: 8px; height: 9px; border: 3px solid #222; }.is-happy .pixel-puppy-head { background: #f6dfad; }.pixel-caption { margin-top: 7px; font-size: 10px; text-shadow: 2px 2px #222; }.pixel-message { padding: 9px 11px; color: #222; background: #fff5c2; border: 2px solid #222; font-size: 11px; font-weight: 700; line-height: 1.45; }.device-controls { display: flex; justify-content: space-around; margin-top: 11px; color: #725668; font: 800 10px 'Courier New', monospace; }
</style>

<style scoped>
.pixel-puppy-sprite { width: 108px; height: 110px; object-fit: contain; image-rendering: pixelated; filter: drop-shadow(5px 5px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-sleepy { filter: grayscale(.45) brightness(.9) drop-shadow(5px 5px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-hot { filter: sepia(.35) saturate(1.3) drop-shadow(5px 5px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-hungry { transform: translateY(2px) scale(.96); }.pixel-puppy-sprite.is-happy { animation: puppy-bounce .8s steps(2, end) infinite alternate; }
@keyframes puppy-bounce { from { transform: translateY(0); } to { transform: translateY(-5px); } }
</style>
