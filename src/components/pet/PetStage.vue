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
const emit = defineEmits(['care'])
const configStore = useConfigStore()
const displayTemp = computed(() => configStore.unit === 'fahrenheit' ? Math.round((props.city.temp * 9) / 5 + 32) : props.city.temp)

const getStatus = (value, labels) => {
  if (value < 20) return labels[0]
  if (value < 50) return labels[1]
  if (value < 80) return labels[2]
  return labels[3]
}

const statusSummary = computed(() => ({
  energy: getStatus(props.pet.energy, ['위험', '피곤', '보통', '최상']),
  comfort: getStatus(props.pet.comfort, ['매우 불쾌', '불쾌', '보통', '쾌적']),
  hunger: getStatus(100 - props.pet.hunger, ['매우 배고픔', '출출함', '보통', '배부름']),
}))

const deviceMessage = computed(() => props.pet.statusText?.includes('도시를 선택하면') ? props.city.petMessage : props.pet.statusText || props.city.petMessage)

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
          <div class="pixel-stage-top">
            <div class="pixel-location">{{ city.name }} · {{ city.status }} · {{ displayTemp }}{{ configStore.unitSymbol }}</div>
            <div class="pixel-status"><span>PET STATUS</span><strong>{{ pet.mood }}</strong><div class="mini-status"><label>⚡ 체력 {{ statusSummary.energy }} <b>{{ pet.energy }}%</b></label><i><em :style="{ width: `${pet.energy}%` }"></em></i></div><div class="mini-status"><label>🌿 쾌적도 {{ statusSummary.comfort }} <b>{{ pet.comfort }}%</b></label><i><em :style="{ width: `${pet.comfort}%` }"></em></i></div><div class="mini-status"><label>🍪 배고픔 {{ statusSummary.hunger }} <b>{{ pet.hunger }}%</b></label><i><em :style="{ width: `${pet.hunger}%` }"></em></i></div></div>
          </div>
          <div class="pixel-scene">
            <img :class="['pixel-puppy-sprite', `is-${petState}`]" :src="puppySprite" :alt="`${pet.name} ${petState} 캐릭터`" />
          </div>
          <div class="pixel-message">{{ deviceMessage }}</div>
        </div>
      </div>
      <div class="device-care"><span class="device-care-label">CARE</span><button type="button" @click="emit('care', 'water')">💧 물</button><button type="button" @click="emit('care', 'snack')">🍪 간식</button><button type="button" @click="emit('care', 'walk')">🌳 산책</button><button type="button" @click="emit('care', 'rest')">🛋️ 휴식</button></div>
      <div class="device-controls"><span>◀ SELECT</span><span>● OK</span><span>▶ BACK</span></div>
    </div>
  </el-card>
</template>

<style scoped>
.pet-stage-card :deep(.el-card__body) { padding: 0; }.pet-device { padding: 18px 18px 14px; border: 5px solid #8c6a58; border-radius: 30px; background: linear-gradient(145deg, #fff0c9, #f4c9d5); box-shadow: inset 0 -8px #e5a8b9, 0 6px 0 #8c6a58; }.device-screen-label { margin: 0 12px 12px; color: #d65f83; font: 800 12px 'Courier New', monospace; letter-spacing: .12em; text-align: center; }.device-screen { padding: 9px; border: 5px solid #8c6a58; border-radius: 22px; background: #f6dce1; box-shadow: inset 0 0 0 4px #fff1d1; }.pixel-stage { min-height: 470px; padding: 18px; color: #fff; font-family: 'Courier New', monospace; image-rendering: pixelated; border: 4px solid #222; border-radius: 12px; background-position: center; background-size: cover; }.jeonju-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/jeonju-bg.png'); }.busan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/busan-bg.png'); }.gwangju-bg { background-image: linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.12)), url('../../assets/pixel/gwangju-bg.png'); }.cheonan-bg { background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.08)), url('../../assets/pixel/cheonan-bg.png'); }.pixel-stage-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; font-size: 12px; font-weight: 700; }.pixel-location, .pixel-status { padding: 7px 10px; background: rgba(24,24,27,.72); border: 3px solid #222; text-shadow: 2px 2px #222; }.pixel-location { white-space: nowrap; }.pixel-status { display: grid; gap: 3px; min-width: 220px; }.pixel-status span { color: #f7d678; font-size: 10px; letter-spacing: .1em; }.pixel-status strong { color: #fff; font-size: 13px; }.mini-status { display: grid; gap: 2px; }.mini-status label { display: flex; justify-content: space-between; gap: 10px; color: #fff; font-size: 9px; line-height: 1.2; }.mini-status b { color: #f7d678; font-weight: 800; }.mini-status i { display: block; height: 5px; overflow: hidden; border: 1px solid #222; background: #e8d8d0; }.mini-status em { display: block; height: 100%; background: #7bd45f; transition: width .25s ease; }.mini-status:nth-of-type(2) em { background: #55bff2; }.mini-status:nth-of-type(3) em { background: #f3bf39; }.pixel-scene { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; text-align: center; }.pixel-puppy { position: relative; width: 106px; height: 93px; margin-top: 3px; filter: drop-shadow(6px 6px 0 rgba(0,0,0,.35)); }.pixel-puppy-head { position: absolute; left: 18px; top: 8px; z-index: 2; width: 70px; height: 63px; background: #f2d3a1; border: 4px solid #222; }.pixel-ear { position: absolute; z-index: 1; top: 7px; width: 25px; height: 70px; background: #292524; border: 4px solid #222; }.pixel-ear.left { left: 2px; transform: rotate(8deg); }.pixel-ear.right { right: 2px; transform: rotate(-8deg); }.pixel-eye { position: absolute; top: 21px; z-index: 3; width: 7px; height: 10px; background: #222; }.pixel-eye.left { left: 19px; }.pixel-eye.right { right: 19px; }.pixel-muzzle { position: absolute; left: 16px; bottom: 7px; width: 39px; height: 24px; background: #fff1d0; border: 3px solid #222; }.pixel-nose { position: absolute; left: 13px; top: -8px; width: 11px; height: 8px; background: #222; }.pixel-mouth { position: absolute; left: 14px; bottom: 3px; width: 12px; height: 5px; border-bottom: 3px solid #222; }.pixel-collar { position: absolute; left: 23px; bottom: 8px; z-index: 3; width: 62px; height: 8px; background: #b91c1c; border: 3px solid #222; }.is-sleepy .pixel-eye { height: 3px; top: 25px; }.is-hot .pixel-puppy-head { background: #f4b183; }.is-hungry .pixel-mouth { width: 8px; height: 9px; border: 3px solid #222; }.is-happy .pixel-puppy-head { background: #f6dfad; }.pixel-message { padding: 12px 14px; color: #222; background: #fff5c2; border: 3px solid #222; font-size: 13px; font-weight: 700; line-height: 1.45; }.device-care { display: grid; grid-template-columns: auto repeat(4, 1fr); gap: 8px; align-items: center; margin-top: 13px; }.device-care-label { color: #d65f83; font: 800 10px 'Courier New', monospace; letter-spacing: .08em; }.device-care button { min-height: 34px; padding: 5px 7px; border: 3px solid #8c6a58; border-radius: 9px; color: #4a354e; background: #fff5d9; box-shadow: 0 3px 0 #b77991; font: 800 11px 'Noto Sans KR', sans-serif; cursor: pointer; }.device-care button:active { transform: translateY(2px); box-shadow: 0 1px 0 #b77991; }.device-controls { display: flex; justify-content: space-around; margin-top: 13px; color: #725668; font: 800 11px 'Courier New', monospace; }
</style>

<style scoped>
.pixel-puppy-sprite { width: 220px; height: 245px; object-fit: contain; image-rendering: pixelated; filter: drop-shadow(7px 7px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-sleepy { filter: grayscale(.45) brightness(.9) drop-shadow(7px 7px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-hot { filter: sepia(.35) saturate(1.3) drop-shadow(7px 7px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-hungry { transform: translateY(3px) scale(.96); }.pixel-puppy-sprite.is-happy { animation: puppy-bounce .8s steps(2, end) infinite alternate; }
@keyframes puppy-bounce { from { transform: translateY(0); } to { transform: translateY(-5px); } }
</style>
