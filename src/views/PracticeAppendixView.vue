<script setup>
import { ref } from 'vue'
import ReactiveRef from '@/components/practices/composition/ReactiveRef.vue'
import ComputedBasic from '@/components/practices/composition/ComputedBasic.vue'
import WatchersWatchEffect from '@/components/practices/composition/WatchersWatchEffect.vue'
import VueFor from '@/components/practices/basic/VueFor.vue'
import VueBindClass from '@/components/practices/basic/VueBindClass.vue'
import ModelBasic from '@/components/practices/basic/ModelBasic.vue'
import EventModifier from '@/components/practices/basic/EventModifier.vue'

const lessons = [
  { id: 'ref', label: 'ref', title: '반응형 상태', component: ReactiveRef },
  { id: 'computed', label: 'computed', title: '계산된 값', component: ComputedBasic },
  { id: 'watch', label: 'watchEffect', title: '변화 감시', component: WatchersWatchEffect },
  { id: 'v-for', label: 'v-for', title: '배열 렌더링', component: VueFor },
  { id: 'v-bind', label: 'v-bind', title: '속성·클래스 바인딩', component: VueBindClass },
  { id: 'v-model', label: 'v-model', title: '폼 양방향 바인딩', component: ModelBasic },
  { id: 'event', label: '이벤트', title: '이벤트와 수식어', component: EventModifier },
]
const selectedLesson = ref(lessons[0])
</script>

<template>
  <section class="practice-page">
    <div class="page-heading compact"><p class="eyebrow">APPENDIX · HANDS ON</p><h1>개념별로 다시 <span>실험해보기</span></h1><p class="page-lead">수업 중 작성한 작은 예제를 하나씩 실행하며 완성 앱에 쓰인 문법을 기초부터 확인합니다.</p></div>
    <div class="practice-layout">
      <aside class="lesson-nav"><button v-for="lesson in lessons" :key="lesson.id" :class="{ active: selectedLesson.id === lesson.id }" @click="selectedLesson = lesson"><code>{{ lesson.label }}</code><span>{{ lesson.title }}</span><b>→</b></button></aside>
      <article class="practice-stage"><div class="stage-heading"><span class="mini-badge">LIVE PRACTICE</span><h2>{{ selectedLesson.title }}</h2></div><component :is="selectedLesson.component" /></article>
    </div>
  </section>
</template>
