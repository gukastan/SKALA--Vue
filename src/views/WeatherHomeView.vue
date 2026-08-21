<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import CareActions from '../components/pet/CareActions.vue'
import PetStage from '../components/pet/PetStage.vue'
import PetStatusCard from '../components/pet/PetStatusCard.vue'
import { weatherCities } from '../data/weatherData'
import { usePetStore } from '../stores/petStore'
import { fetchWeatherForCities, hasWeatherApiKey } from '../services/weatherService'

const router = useRouter()
const route = useRoute()
const weatherList = ref(weatherCities)
const searchQuery = ref('')
const selectedCity = ref(weatherList.value[0])
const selectedCityInfo = ref('도시를 선택하면 구름이가 여행을 시작해요.')
const petStore = usePetStore()
const { name: petName, mood, energy, comfort, hunger, statusText: actionMessage } = storeToRefs(petStore)
const isWeatherLoading = ref(false)
const weatherSource = ref(hasWeatherApiKey ? 'live' : 'mock')
const weatherError = ref('')

onMounted(() => {
  if (route.query.search) searchQuery.value = route.query.search
  petStore.startTimeDecay()
  loadWeatherData()
})

onUnmounted(() => petStore.stopTimeDecay())

const loadWeatherData = async () => {
  if (!hasWeatherApiKey) return
  isWeatherLoading.value = true
  weatherError.value = ''
  try {
    weatherList.value = await fetchWeatherForCities(weatherList.value)
    weatherSource.value = 'live'
  } catch {
    weatherSource.value = 'mock'
    weatherError.value = '실시간 날씨를 불러오지 못해 Mock Data를 표시하고 있어요.'
  } finally {
    isWeatherLoading.value = false
  }
}

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
  petStore.resetStatus()
  actionMessage.value = city.petMessage
}

const handleCare = (action) => petStore.care(action, selectedCity.value)

const handleDetailJump = (id) => router.push(`/weather/${id}`)
</script>

<template>
  <div class="dashboard-wrapper pixel-weather-app">
    <section class="dashboard-hero pixel-hero">
      <div><span class="eyebrow">PIXEL WEATHER PET</span><h1>날씨를 따라 여행하는<br /><span>{{ petName }}의 하루</span></h1><p>도시를 선택하면 {{ petName }}가 그곳의 날씨와 랜드마크를 만나러 떠나요.</p></div><div class="hero-pet">☁️</div>
    </section>

    <BaseDashboardCard><SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" /></BaseDashboardCard>

    <div class="weather-pet-layout">
      <div class="weather-list-column">
        <BaseDashboardCard v-loading="isWeatherLoading">
          <div class="section-heading"><div><span class="section-kicker">TRAVEL MAP</span><h2>여행할 도시</h2></div><div class="source-tags"><el-tag :type="weatherSource === 'live' ? 'success' : 'info'" effect="light">{{ weatherSource === 'live' ? '실시간 API' : 'Mock Data' }}</el-tag><el-tag effect="plain">{{ filteredWeatherList.length }}개 도시</el-tag></div></div>
          <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @click="selectCity(item)" @select-card="selectCity(item)" @click-detail="handleDetailJump(item.id)" />
          <el-empty v-if="filteredWeatherList.length === 0" description="검색 결과와 일치하는 도시가 없습니다." :image-size="90" />
          <el-alert v-if="weatherError" :title="weatherError" type="warning" :closable="false" show-icon />
        </BaseDashboardCard>
        <el-alert class="status-bar" :title="selectedCityInfo" type="success" :closable="false" show-icon />
      </div>

      <div class="pet-column">
        <PetStage :city="selectedCity" :pet="{ name: petName, mood, energy, comfort, hunger }" />
        <div class="pet-grid"><PetStatusCard :pet="{ name: petName, mood, energy, comfort, hunger }" /><CareActions @care="handleCare" /></div>
        <el-alert class="recommendation-alert" :title="recommendation" type="warning" :closable="false" show-icon />
        <el-alert class="action-alert" :title="actionMessage" type="info" :closable="false" show-icon />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pixel-hero { border: 4px solid #222; border-radius: 0; background: linear-gradient(115deg, #4338ca, #7c3aed); }.pixel-hero h1 { letter-spacing: 0; }.pixel-hero h1 span { color: #fde68a; }.hero-pet { display: grid; place-items: center; width: 130px; height: 130px; border: 4px solid #222; background: #bae6fd; font-size: 68px; image-rendering: pixelated; }.weather-pet-layout { display: grid; grid-template-columns: minmax(260px, .8fr) 1.25fr; gap: 20px; align-items: start; }.pet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }.recommendation-alert, .action-alert { margin-top: 14px; border-radius: 10px; }.status-bar { margin-top: 14px; border-radius: 12px; }.pet-column { min-width: 0; }.weather-list-column { min-width: 0; }.source-tags { display: flex; gap: 6px; }
@media (max-width: 850px) { .weather-pet-layout { grid-template-columns: 1fr; }.pet-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .pixel-hero { padding: 25px; }.hero-pet { width: 82px; height: 82px; font-size: 40px; }.pet-grid { grid-template-columns: 1fr; } }
</style>
