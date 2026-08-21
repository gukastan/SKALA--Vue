<script setup>
import { useRoute } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'

const route = useRoute()
</script>

<template>
  <header class="site-header device-header">
    <RouterLink to="/" class="brand"><span class="brand-mark">🐶</span><span><b>CLOUDIE</b><small>TRAVEL WEATHER PET</small></span></RouterLink>
    <el-menu :default-active="route.path" mode="horizontal" router class="main-menu" aria-label="주 메뉴">
      <el-menu-item index="/">사용자 모드</el-menu-item>
      <el-menu-item index="/about">서비스 소개</el-menu-item>
      <el-menu-item index="/learning">학습 모드</el-menu-item>
      <el-menu-item index="/practice">실습 부록</el-menu-item>
    </el-menu>
    <UnitToggler />
  </header>
  <main class="app-main device-main"><RouterView /></main>
  <footer class="site-footer device-footer"><span>♥ CLOUDIE TRAVEL WEATHER PET</span><span>날씨로 배우는 Vue 3 · Element Plus UI</span></footer>
</template>
