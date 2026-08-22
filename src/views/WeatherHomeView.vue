<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import PetStage from '../components/pet/PetStage.vue'
import { weatherCities } from '../data/weatherData'
import { usePetStore } from '../stores/petStore'
import { fetchWeatherForCities, hasWeatherApiKey } from '../services/weatherService'

const router = useRouter()
const route = useRoute()
const weatherList = ref(weatherCities)
const searchQuery = ref('')
const selectedCity = ref(weatherList.value[0])
const petStore = usePetStore()
const { name: petName, mood, energy, comfort, hunger, statusText } = storeToRefs(petStore)
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

const selectCity = (city) => {
  selectedCity.value = city
  petStore.resetStatus(city.petMessage)
}

const handleCare = (action) => petStore.care(action, selectedCity.value)

const handleDetailJump = (id) => router.push(`/weather/${id}`)
</script>

<template>
  <div class="dashboard-wrapper pixel-weather-app">
    <div class="weather-console">
      <aside class="weather-control-column">
        <section class="dashboard-hero pixel-hero">
          <div><span class="eyebrow">PIXEL WEATHER PET</span><h1>날씨를 따라 여행하는<br /><span>{{ petName }}의 하루</span></h1><p>도시를 선택하면 {{ petName }}가 그곳의 날씨와 랜드마크를 만나러 떠나요.</p></div><div class="hero-pet">☁️</div>
        </section>

        <BaseDashboardCard class="search-panel"><SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" /></BaseDashboardCard>

        <BaseDashboardCard v-loading="isWeatherLoading">
          <div class="section-heading"><div><span class="section-kicker">TRAVEL MAP</span><h2>여행할 도시</h2></div><div class="source-tags"><el-tag :type="weatherSource === 'live' ? 'success' : 'info'" effect="light">{{ weatherSource === 'live' ? '실시간 API' : 'Mock Data' }}</el-tag><el-tag effect="plain">{{ filteredWeatherList.length }}개 도시</el-tag></div></div>
          <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @click="selectCity(item)" @select-card="selectCity(item)" @click-detail="handleDetailJump" />
          <el-empty v-if="filteredWeatherList.length === 0" description="검색 결과와 일치하는 도시가 없습니다." :image-size="90" />
          <el-alert v-if="weatherError" :title="weatherError" type="warning" :closable="false" show-icon />
        </BaseDashboardCard>
      </aside>

      <section class="pet-console-column">
        <PetStage :city="selectedCity" :pet="{ name: petName, mood, energy, comfort, hunger, statusText }" @care="handleCare" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.weather-console { display: grid; grid-template-columns: minmax(330px, .84fr) minmax(620px, 1.42fr); gap: 26px; align-items: start; max-width: 1400px; margin: 0 auto; }.weather-control-column, .pet-console-column { min-width: 0; }.pixel-hero { display: flex; justify-content: space-between; align-items: center; padding: 26px 28px; border: 4px solid #8c6a58; border-radius: 18px; background: linear-gradient(135deg, #fff0c9, #ffd4dd); box-shadow: inset 0 -5px #f2b6c4, 0 5px 0 #8c6a58; }.pixel-hero h1 { letter-spacing: -.03em; color: #3d2b52; }.pixel-hero h1 span { color: #e35d83; }.pixel-hero p { color: #806a91; }.hero-pet { display: grid; place-items: center; width: 92px; height: 92px; flex: 0 0 auto; border: 4px solid #8c6a58; border-radius: 50%; background: #d7f0d2; font-size: 45px; image-rendering: pixelated; box-shadow: inset 0 -5px #a2ca9e; }.search-panel { margin-top: 18px; }.pet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 16px; }.recommendation-alert, .action-alert { margin-top: 14px; border-radius: 14px; }.status-bar { margin-top: 14px; border-radius: 14px; }.source-tags { display: flex; gap: 6px; }
@media (max-width: 1050px) { .weather-console { grid-template-columns: minmax(280px, .8fr) minmax(460px, 1.2fr); gap: 18px; } }
@media (max-width: 850px) { .weather-console { grid-template-columns: 1fr; }.pet-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .pixel-hero { padding: 25px; }.hero-pet { width: 82px; height: 82px; font-size: 40px; }.pet-grid { grid-template-columns: 1fr; } }
</style>
