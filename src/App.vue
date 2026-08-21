<script setup>
import { useRoute } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'

const route = useRoute()
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="brand"><span class="brand-mark">☀</span><span>Weather Learning App</span></RouterLink>
    <el-menu :default-active="route.path" mode="horizontal" router class="main-menu" aria-label="주 메뉴">
      <el-menu-item index="/">사용자 모드</el-menu-item>
      <el-menu-item index="/about">서비스 소개</el-menu-item>
      <el-menu-item index="/learning">학습 모드</el-menu-item>
      <el-menu-item index="/practice">실습 부록</el-menu-item>
    </el-menu>
    <UnitToggler />
  </header>
  <main class="app-main"><RouterView /></main>
  <footer class="site-footer"><span>Weather Learning App</span><span>날씨로 배우는 Vue 3</span></footer>
</template>
