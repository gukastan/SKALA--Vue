<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <section class="service-page">
    <div class="service-heading"><div><p class="eyebrow">ABOUT WEATHER PET</p><h1>날씨로 배우는 <span>Vue 학습 앱</span></h1></div><button @click="handleGoHome" class="home-btn">대시보드 홈으로 이동</button></div>
    <div class="service-grid">
      <el-card class="service-card" shadow="never"><span class="service-icon">🌤️</span><h3>실제 사용자 화면</h3><p>전주·부산·광주·천안의 날씨를 확인하고 구름이와 함께 도시를 여행합니다.</p></el-card>
      <el-card class="service-card" shadow="never"><span class="service-icon">🧩</span><h3>구현 원리</h3><p>완성된 Weather Pet의 사용자 행동이 ref, computed, Component, Router, Pinia, Axios와 어떻게 연결되는지 살펴봅니다.</p></el-card>
      <el-card class="service-card" shadow="never"><span class="service-icon">🧪</span><h3>실습 부록</h3><p>practices 폴더의 48개 예제를 개념별로 선택하고 화면에서 바로 실행합니다.</p></el-card>
    </div>
    <div class="service-note"><strong>이 앱의 흐름</strong><span>날씨 확인</span><b>→</b><span>구름이 돌보기</span><b>→</b><span>구현 원리 관찰</span><b>→</b><span>실습 부록 복습</span></div>
  </section>
</template>

<style scoped>
.service-page { height: 100%; display: grid; grid-template-rows: 100px 1fr 74px; gap: 18px; }.service-heading { display: flex; justify-content: space-between; align-items: center; gap: 20px; }.service-heading h1 { font-size: 36px; }.service-heading .eyebrow { margin-bottom: 6px; }.service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; min-height: 0; }.service-card { display: flex; align-items: center; gap: 16px; min-height: 0; padding: 24px; border: 3px solid #d18ba5; border-radius: 18px; background: #fff7ed; box-shadow: 0 5px 0 #c88fa8; }.service-card :deep(.el-card__body) { padding: 0; }.service-icon { display: grid; place-items: center; flex: 0 0 62px; width: 62px; height: 62px; border: 3px solid #8c6a58; border-radius: 18px; background: #d7f0d2; font-size: 30px; }.service-card h3 { margin: 0 0 6px; color: #3d2b52; font-size: 19px; }.service-card p { margin: 0; color: #736789; font-size: 13px; line-height: 1.55; }.home-btn { flex: 0 0 auto; padding: 12px 18px; color: #fff; border: 3px solid #b77991; border-radius: 10px; background: #ee7094; box-shadow: 0 3px 0 #9e5d76; font-weight: 800; cursor: pointer; }.service-note { display: flex; align-items: center; justify-content: center; gap: 18px; padding: 14px 20px; border: 3px solid #d5ae91; border-radius: 14px; color: #5e4b68; background: #fff0c9; box-shadow: 0 4px 0 #c88fa8; }.service-note strong { color: #d65f83; }.service-note b { color: #ee7094; font-size: 18px; }
</style>
