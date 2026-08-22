export const learningPoints = [
  {
    id: 1,
    marker: '1',
    title: '도시 검색',
    concepts: ['ref', ':value', '@input', 'computed'],
    description: '입력값이 searchQuery에 저장되고 filteredWeatherList가 다시 계산되어 도시 목록을 갱신합니다.',
    code: `<input
  :value="searchQuery"
  @input="handleSearchInput"
  placeholder="도시 이름을 입력하세요"
/>`,
    flow: ['사용자 입력', 'searchQuery 변경', 'filteredWeatherList 재계산', '도시 카드 갱신'],
  },
  {
    id: 2,
    marker: '2',
    title: '여행할 도시 카드',
    concepts: ['v-for', ':key', 'v-if', ':class'],
    description: 'weatherList를 반복 렌더링하고 기온과 날씨 상태에 따라 카드의 라벨과 스타일을 변경합니다.',
    code: `<WeatherCard
  v-for="city in filteredWeatherList"
  :key="city.id"
  :class="city.backgroundClass"
/>`,
    flow: ['weatherList 배열', 'v-for 카드 생성', 'temp 조건 판별', '날씨 라벨·스타일 적용'],
  },
  {
    id: 3,
    marker: '3',
    title: 'Pixel Pet Stage',
    concepts: ['selectedCity', 'ref', 'computed', ':class'],
    description: 'selectedCity가 변경되면 도시 배경, 날씨 정보, 캐릭터 메시지가 함께 변경됩니다.',
    code: `const selectedCity = ref(weatherList.value[0])

const petState = computed(() => {
  if (pet.energy < 35) return 'sleepy'
  if (pet.hunger > 70) return 'hungry'
  return 'normal'
})`,
    flow: ['도시 카드 클릭', 'selectCity(city)', 'selectedCity 변경', '배경·펫 화면 갱신'],
  },
  {
    id: 4,
    marker: '4',
    title: 'PET STATUS',
    concepts: ['computed', 'getStatus', '반응성'],
    description: '펫의 원시 상태값으로 위험·보통·최상 같은 표시를 계산하고 게이지를 갱신합니다.',
    code: `const statusSummary = computed(() => ({
  energy: getStatus(pet.energy),
  comfort: getStatus(pet.comfort),
  hunger: getStatus(100 - pet.hunger),
}))`,
    flow: ['pet.energy 변경', 'statusSummary 재계산', '상태 라벨·게이지 갱신'],
  },
  {
    id: 5,
    marker: '5',
    title: '돌봄 행동',
    concepts: ['@click', 'care(action)', 'state'],
    description: '돌봄 버튼 이벤트가 펫의 반응형 상태를 변경하고 캐릭터와 게이지에 즉시 반영됩니다.',
    code: `<button @click="carePet('water')">
  💧 물
</button>

const carePet = (action) => {
  pet.comfort += action === 'water' ? 10 : 0
}`,
    flow: ['돌봄 버튼 클릭', 'care(action) 실행', 'pet 상태 변경', '화면 자동 갱신'],
  },
]
