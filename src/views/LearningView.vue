<script setup>
const concepts = [
  { name: 'ref', description: '날씨 목록과 선택 상태를 반응형 데이터로 관리합니다.', code: 'const weatherList = ref([...])' },
  { name: 'v-for', description: '날씨 데이터 배열을 카드 목록으로 반복 렌더링합니다.', code: '<WeatherCard v-for="item in list" />' },
  { name: 'v-if', description: '기온에 따라 더움·선선함 라벨을 결정합니다.', code: 'v-if="cityItem.temp >= 25"' },
  { name: 'computed', description: '검색어에 맞는 도시만 계산해 표시합니다.', code: 'computed(() => filteredList)' },
  { name: '@click', description: '카드 선택과 상세 페이지 이동을 연결합니다.', code: '@click.stop="handleDetail"' },
  { name: 'props / emits', description: '부모와 자식 컴포넌트가 데이터를 주고받습니다.', code: 'defineProps() · defineEmits()' },
  { name: 'Pinia', description: '메인과 상세 화면이 단위 상태를 공유합니다.', code: 'useConfigStore()' },
  { name: 'Vue Router', description: '대시보드·상세·소개 화면을 연결합니다.', code: 'router.push(`/weather/${id}`)' },
]
</script>

<template>
  <section class="learning-page">
    <div class="page-heading">
      <p class="eyebrow">LEARN HOW VUE WORKS</p>
      <h1>완성된 날씨 앱에서<br /><span>Vue의 동작을 읽어보세요.</span></h1>
      <p class="page-lead">사용자 모드의 화면이 어떤 Vue 문법으로 만들어졌는지 한눈에 확인하는 학습 공간입니다.</p>
    </div>
    <div class="learning-layout">
      <el-card class="flow-card" shadow="never">
        <div class="flow-card-header"><el-tag type="primary" effect="light">실행 흐름</el-tag><span>전주 카드 선택</span></div>
        <div v-for="(step, index) in ['카드를 클릭합니다.', 'WeatherCard가 select-card를 발생시킵니다.', 'selectedCityInfo가 새 문구로 갱신됩니다.', 'Vue가 상태 바를 자동으로 다시 그립니다.']" :key="step" class="flow-step-wrap">
          <div class="flow-step"><strong>{{ index + 1 }}</strong><div><b>{{ ['사용자 입력', '이벤트 전달', '반응형 상태 변경', '화면 업데이트'][index] }}</b><span>{{ step }}</span></div></div>
          <div v-if="index < 3" class="flow-line"></div>
        </div>
      </el-card>
      <article class="concept-grid">
        <el-card v-for="concept in concepts" :key="concept.name" class="concept-card" shadow="hover"><code>{{ concept.name }}</code><p>{{ concept.description }}</p><small>{{ concept.code }}</small></el-card>
      </article>
    </div>
    <RouterLink to="/practice" class="learning-cta"><el-button type="primary" size="large">개념별 실습으로 이동하기 <span>→</span></el-button></RouterLink>
  </section>
</template>
