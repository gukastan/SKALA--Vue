<script setup>
// 1. 상위로 입력 텍스트를 전달할 커스텀 이벤트 등록 (매크로)
defineEmits(['update-query'])

// 2. 상위로부터 현재 검색 상태 값을 수신 (한글 동기화 상태 유지용)
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <div class="search-heading"><div><span class="search-kicker">LOCATION SEARCH</span><h3>도시 검색</h3></div><el-tag type="info" effect="plain">{{ currentQuery ? '검색 중' : '전체 도시' }}</el-tag></div>
    <el-input :model-value="currentQuery" size="large" clearable placeholder="도시 이름을 입력하세요" @input="$emit('update-query', $event)" />
    <p class="search-result">검색 중인 도시: <strong>{{ currentQuery || '전체 도시' }}</strong></p>
  </div>
</template>

<style scoped>
.search-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.search-kicker { color: #2680eb; font-size: 10px; font-weight: 800; letter-spacing: .12em; }
h3 { margin: 5px 0 0; font-size: 19px; }
.search-result { margin: 11px 0 0; color: #829ab1; font-size: 12px; }
.search-result strong { color: #102a43; }
</style>
