<script setup>
const concepts = [
  { name: 'ref', description: '전주·부산·광주·천안 날씨 목록을 반응형으로 관리합니다.', code: 'const weatherList = ref(weatherCities)' },
  { name: 'v-for', description: '도시 배열을 여행 카드 목록으로 반복 렌더링합니다.', code: '<WeatherCard v-for="item in filteredList" />' },
  { name: 'v-if', description: '비·자외선·기온 조건에 따라 추천 태그를 표시합니다.', code: 'v-if="city.rainProbability >= 60"' },
  { name: 'computed', description: '검색 결과와 구름이의 날씨 추천을 계산합니다.', code: 'const recommendation = computed(...)' },
  { name: ':class', description: '선택한 도시의 랜드마크 배경 클래스를 바인딩합니다.', code: ':class="city.backgroundClass"' },
  { name: 'props / emits', description: '펫 스테이지와 돌봄 버튼이 부모 상태와 통신합니다.', code: 'defineProps() · defineEmits()' },
  { name: 'Pinia', description: '구름이의 기분·체력·쾌적도·배고픔을 공유합니다.', code: 'usePetStore() · petStore.care()' },
  { name: 'setInterval', description: '10초마다 체력·쾌적도는 5% 감소하고 배고픔은 5% 증가합니다.', code: 'setInterval(decayByTime, 10000)' },
  { name: 'Axios', description: '환경변수 API 키가 있으면 네 도시의 실시간 날씨를 가져옵니다.', code: 'axios.get(OPENWEATHER_URL, { params })' },
  { name: 'Vue Router', description: '도시 상세·학습·실습 화면을 페이지로 연결합니다.', code: 'router.push(`/weather/${id}`)' },
]
</script>

<template>
  <section class="learning-page">
    <div class="page-heading">
      <p class="eyebrow">LEARN HOW VUE WORKS</p>
      <h1>구름이의 여행에서<br /><span>Vue의 동작을 읽어보세요.</span></h1>
      <p class="page-lead">도시 선택부터 날씨 반응, 펫 돌봄까지 Pixel Weather Pet의 데이터 흐름을 따라가며 Vue 문법을 학습합니다.</p>
    </div>
    <div class="learning-layout">
      <el-card class="flow-card" shadow="never">
        <div class="flow-card-header"><el-tag type="primary" effect="light">실행 흐름</el-tag><span>전주 여행 시작</span></div>
        <div v-for="(step, index) in ['전주 카드를 클릭합니다.', 'selectedCity가 전주 객체로 바뀝니다.', 'backgroundClass와 날씨 추천이 계산됩니다.', 'Pinia 상태와 시간 경과 로직이 구름이를 변화시킵니다.']" :key="step" class="flow-step-wrap">
          <div class="flow-step"><strong>{{ index + 1 }}</strong><div><b>{{ ['도시 선택', '반응형 상태 변경', '조건·클래스 계산', '펫 상태 업데이트'][index] }}</b><span>{{ step }}</span></div></div>
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
