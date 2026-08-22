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
</style>

<style scoped>
.pixel-puppy-sprite { width: 220px; height: 245px; object-fit: contain; image-rendering: pixelated; filter: drop-shadow(7px 7px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-sleepy { filter: grayscale(.45) brightness(.9) drop-shadow(7px 7px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-hot { filter: sepia(.35) saturate(1.3) drop-shadow(7px 7px 0 rgba(0,0,0,.4)); }.pixel-puppy-sprite.is-hungry { transform: translateY(3px) scale(.96); }.pixel-puppy-sprite.is-happy { animation: puppy-bounce .8s steps(2, end) infinite alternate; }
@keyframes puppy-bounce { from { transform: translateY(0); } to { transform: translateY(-5px); } }
</style>

<style scoped>
.pixel-status { width: 240px; min-height: 178px; }
@media (max-width: 600px) {
  .pixel-stage-top { flex-direction: column; }
  .pixel-status { width: 100%; min-height: 0; }
  .pixel-location { width: 100%; white-space: normal; }
}
</style>
