<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="brand"><span class="brand-mark">☀</span><span>Weather Learning App</span></RouterLink>
    <nav class="main-nav" aria-label="주 메뉴">
      <RouterLink to="/" class="nav-link">사용자 모드</RouterLink>
      <RouterLink to="/about" class="nav-link">서비스 소개</RouterLink>
      <RouterLink to="/learning" class="nav-link">학습 모드</RouterLink>
      <RouterLink to="/practice" class="nav-link">실습 부록</RouterLink>
    </nav>
    <UnitToggler />
  </header>
  <main class="app-main"><RouterView /></main>
  <footer class="site-footer"><span>Weather Learning App</span><span>날씨로 배우는 Vue 3</span></footer>
</template>
