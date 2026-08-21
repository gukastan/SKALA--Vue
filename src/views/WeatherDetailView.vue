<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { weatherCities } from '../data/weatherData'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const router = useRouter()
const cityData = computed(() => weatherCities.find((city) => city.id === route.params.cityId))
const configStore = useConfigStore()
const displayTemp = computed(() => cityData.value && (configStore.unit === 'fahrenheit' ? Math.round((cityData.value.temp * 9) / 5 + 32) : cityData.value.temp))
</script>

<template>
  <section class="detail-container" v-if="cityData">
    <div class="detail-heading"><div><span class="eyebrow">CITY WEATHER REPORT</span><h1>{{ cityData.name }} 상세 날씨</h1><p>{{ cityData.landmark }}를 여행 중인 구름이의 관측 리포트입니다.</p></div><el-button @click="router.push('/')">← 대시보드</el-button></div>
    <div :class="['detail-banner', cityData.backgroundClass]"><span>{{ cityData.weatherIcon }}</span><div><strong>{{ cityData.name }}</strong><small>{{ cityData.status }} · {{ displayTemp }}{{ configStore.unitSymbol }}</small></div><el-tag type="warning" effect="dark">{{ cityData.landmark }}</el-tag></div>
    <el-row :gutter="16" class="detail-stats"><el-col v-for="stat in [{ label: '습도', value: `${cityData.humidity}%`, icon: '💧' }, { label: '바람', value: `${cityData.windSpeed}m/s`, icon: '🌬️' }, { label: '강수확률', value: `${cityData.rainProbability}%`, icon: '☔' }, { label: '미세먼지', value: cityData.airQuality, icon: '🌿' }]" :key="stat.label" :xs="12" :sm="6"><el-card shadow="hover"><div class="stat-item"><span>{{ stat.icon }}</span><small>{{ stat.label }}</small><strong>{{ stat.value }}</strong></div></el-card></el-col></el-row>
    <el-alert :title="cityData.petMessage" type="warning" :closable="false" show-icon />
  </section>
  <el-empty v-else description="해당 도시의 날씨 정보를 찾을 수 없습니다."><el-button type="primary" @click="router.push('/')">대시보드로 돌아가기</el-button></el-empty>
</template>

<style scoped>
.detail-container { padding: 30px; border-radius: 18px; background: #fff; box-shadow: 0 8px 28px rgba(16,42,67,.06); }.detail-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }.detail-heading h1 { font-size: clamp(28px, 4vw, 44px); }.detail-heading p { color: #627d98; }.detail-banner { display: flex; align-items: center; gap: 18px; margin: 28px 0 18px; padding: 24px; color: #fff; border: 4px solid #222; font-family: 'Courier New', monospace; }.jeonju-bg { background: linear-gradient(#8fd3ff 0 52%, #93c95b 52%); }.busan-bg { background: linear-gradient(#a7e8ff 0 45%, #43b9dd 45%); }.gwangju-bg { background: linear-gradient(#65748b 0 48%, #63836c 48%); }.cheonan-bg { background: linear-gradient(#b4e3ff 0 50%, #a1c96c 50%); }.detail-banner > span { font-size: 52px; }.detail-banner strong, .detail-banner small { display: block; }.detail-banner strong { font-size: 27px; }.detail-banner small { margin-top: 6px; }.detail-banner .el-tag { margin-left: auto; }.detail-stats { margin-bottom: 18px; }.stat-item { display: grid; grid-template-columns: 28px 1fr; align-items: center; gap: 5px; }.stat-item span { grid-row: span 2; font-size: 24px; }.stat-item small { color: #829ab1; }.stat-item strong { color: #102a43; font-size: 18px; }
@media (max-width: 600px) { .detail-container { padding: 20px; }.detail-heading { flex-direction: column; }.detail-banner { flex-wrap: wrap; }.detail-banner .el-tag { margin-left: 0; } }
</style>
