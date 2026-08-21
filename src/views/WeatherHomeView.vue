<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import CareActions from '../components/pet/CareActions.vue'
import PetStage from '../components/pet/PetStage.vue'
import PetStatusCard from '../components/pet/PetStatusCard.vue'
import { createPet, weatherCities } from '../data/weatherData'

const router = useRouter()
const route = useRoute()
const weatherList = ref(weatherCities)
const searchQuery = ref('')
const selectedCity = ref(weatherList.value[0])
const selectedCityInfo = ref('도시를 선택하면 구름이가 여행을 시작해요.')
const pet = reactive(createPet())
const actionMessage = ref('오늘은 어디로 여행을 떠나볼까요?')

onMounted(() => {
  if (route.query.search) searchQuery.value = route.query.search
})

watch(searchQuery, (newQuery) => {
  router.replace({ path: route.path, query: { search: newQuery || undefined } })
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

const recommendation = computed(() => {
  const city = selectedCity.value
  if (city.rainProbability >= 60) return '☔ 비가 올 확률이 높아요. 오늘은 실내에서 쉬는 걸 추천해요.'
  if (city.uvIndex === '높음') return '🧢 자외선이 강해요. 산책 전 모자를 씌워주세요.'
  if (city.airQuality === '나쁨') return '😷 공기가 좋지 않아요. 외출을 줄여주세요.'
  if (city.humidity >= 80) return '💦 습도가 높아요. 시원한 곳에서 쉬게 해주세요.'
  return `🌿 ${city.name}의 날씨가 좋아요. 구름이와 산책해보세요.`
})

const selectCity = (city) => {
  selectedCity.value = city
  selectedCityInfo.value = `${city.name}이 선택되었습니다. 구름이가 ${city.landmark}(으)로 이동했어요.`
  actionMessage.value = city.petMessage
}

const handleCare = (action) => {
  if (action === 'water') {
    pet.comfort = Math.min(100, pet.comfort + (selectedCity.value.temp >= 27 ? 15 : 5))
    actionMessage.value = '💧 시원한 물을 마신 구름이의 쾌적도가 올라갔어요.'
  } else if (action === 'snack') {
    pet.hunger = Math.max(0, pet.hunger - 20)
    pet.mood = '행복'
    actionMessage.value = '🍪 맛있는 간식을 먹고 구름이가 행복해졌어요.'
  } else if (action === 'walk') {
    if (selectedCity.value.rainProbability >= 60 || selectedCity.value.airQuality === '나쁨') {
      pet.energy = Math.max(0, pet.energy - 10)
      actionMessage.value = '🌧️ 날씨가 좋지 않아 산책이 조금 힘들었어요.'
    } else {
      pet.mood = '행복'
      pet.energy = Math.max(0, pet.energy - 5)
      actionMessage.value = '🌳 즐겁게 산책하고 구름이의 기분이 좋아졌어요.'
    }
  } else {
    pet.energy = Math.min(100, pet.energy + 15)
    pet.comfort = Math.min(100, pet.comfort + 5)
    actionMessage.value = '🛋️ 포근하게 쉬고 구름이의 체력이 회복됐어요.'
  }
}

const handleDetailJump = (id) => router.push(`/weather/${id}`)
</script>

<template>
  <div class="dashboard-wrapper pixel-weather-app">
    <section class="dashboard-hero pixel-hero">
      <div><span class="eyebrow">PIXEL WEATHER PET</span><h1>날씨를 따라 여행하는<br /><span>구름이의 하루</span></h1><p>도시를 선택하면 구름이가 그곳의 날씨와 랜드마크를 만나러 떠나요.</p></div><div class="hero-pet">☁️</div>
    </section>

    <BaseDashboardCard><SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" /></BaseDashboardCard>

    <div class="weather-pet-layout">
      <div class="weather-list-column">
        <BaseDashboardCard>
          <div class="section-heading"><div><span class="section-kicker">TRAVEL MAP</span><h2>여행할 도시</h2></div><el-tag type="success" effect="light">{{ filteredWeatherList.length }}개 도시</el-tag></div>
          <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @click="selectCity(item)" @select-card="selectCity(item)" @click-detail="handleDetailJump(item.id)" />
          <el-empty v-if="filteredWeatherList.length === 0" description="검색 결과와 일치하는 도시가 없습니다." :image-size="90" />
        </BaseDashboardCard>
        <el-alert class="status-bar" :title="selectedCityInfo" type="success" :closable="false" show-icon />
      </div>

      <div class="pet-column">
        <PetStage :city="selectedCity" :pet="pet" />
        <div class="pet-grid"><PetStatusCard :pet="pet" /><CareActions @care="handleCare" /></div>
        <el-alert class="recommendation-alert" :title="recommendation" type="warning" :closable="false" show-icon />
        <el-alert class="action-alert" :title="actionMessage" type="info" :closable="false" show-icon />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pixel-hero { border: 4px solid #222; border-radius: 0; background: linear-gradient(115deg, #4338ca, #7c3aed); }.pixel-hero h1 { letter-spacing: 0; }.pixel-hero h1 span { color: #fde68a; }.hero-pet { display: grid; place-items: center; width: 130px; height: 130px; border: 4px solid #222; background: #bae6fd; font-size: 68px; image-rendering: pixelated; }.weather-pet-layout { display: grid; grid-template-columns: minmax(260px, .8fr) 1.25fr; gap: 20px; align-items: start; }.pet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }.recommendation-alert, .action-alert { margin-top: 14px; border-radius: 10px; }.status-bar { margin-top: 14px; border-radius: 12px; }.pet-column { min-width: 0; }.weather-list-column { min-width: 0; }
@media (max-width: 850px) { .weather-pet-layout { grid-template-columns: 1fr; }.pet-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .pixel-hero { padding: 25px; }.hero-pet { width: 82px; height: 82px; font-size: 40px; }.pet-grid { grid-template-columns: 1fr; } }
</style>
