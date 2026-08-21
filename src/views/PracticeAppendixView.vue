<script setup>
import { computed, ref } from 'vue'

const practiceModules = import.meta.glob('../components/practices/**/*.vue', {
  eager: true,
  import: 'default',
})

const groupMeta = {
  basic: { label: 'Vue 기본 문법', description: 'Directive, 이벤트, 폼, 스타일' },
  composition: { label: 'Composition API', description: '반응형 상태, computed, watcher' },
  component: { label: 'Component', description: 'Lifecycle, Props, Emits, Slot' },
  library: { label: '외부 라이브러리', description: 'Pinia, Axios, Element Plus' },
}

const formatName = (filename) => filename.replace(/\.vue$/, '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([._-])/g, ' ')

const lessons = Object.entries(practiceModules)
  .map(([path, component]) => {
    const match = path.match(/practices\/([^/]+)\/([^/]+)\.vue$/)
    const groupId = match?.[1] || 'basic'
    const filename = match?.[2] || path
    return {
      id: path,
      groupId,
      groupLabel: groupMeta[groupId]?.label || groupId,
      label: filename,
      title: formatName(filename),
      component,
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id))

const searchQuery = ref('')
const selectedLesson = ref(lessons[0])

const filteredLessons = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return lessons
  return lessons.filter((lesson) => `${lesson.label} ${lesson.title} ${lesson.groupLabel}`.toLowerCase().includes(query))
})

const groupedLessons = computed(() => Object.entries(groupMeta).map(([id, meta]) => ({
  id,
  ...meta,
  lessons: filteredLessons.value.filter((lesson) => lesson.groupId === id),
})).filter((group) => group.lessons.length))

const selectLesson = (id) => {
  selectedLesson.value = lessons.find((lesson) => lesson.id === id) || lessons[0]
}
</script>

<template>
  <section class="practice-page">
    <div class="page-heading compact">
      <p class="eyebrow">APPENDIX · HANDS ON</p>
      <h1>48개 실습을 <span>다시 실행해보기</span></h1>
      <p class="page-lead">현재 프로젝트의 `practices` 폴더에 있는 모든 실습을 개념별로 모았습니다. 하나를 선택하면 이 페이지에서 바로 실행할 수 있습니다.</p>
    </div>

    <div class="practice-toolbar">
      <el-input v-model="searchQuery" clearable size="large" placeholder="실습 이름이나 개념 검색" class="practice-search">
        <template #prefix>⌕</template>
      </el-input>
      <el-tag type="primary" effect="light" size="large">전체 {{ lessons.length }}개</el-tag>
    </div>

    <div class="practice-layout">
      <el-menu :default-active="selectedLesson.id" class="lesson-nav" @select="selectLesson">
        <div v-for="group in groupedLessons" :key="group.id" class="lesson-group">
          <div class="lesson-group-heading"><strong>{{ group.label }}</strong><el-badge :value="group.lessons.length" type="primary" /><small>{{ group.description }}</small></div>
          <el-menu-item v-for="lesson in group.lessons" :key="lesson.id" :index="lesson.id"><code>{{ lesson.label }}</code><span>{{ lesson.title }}</span><b>→</b></el-menu-item>
        </div>
        <el-empty v-if="groupedLessons.length === 0" description="실습이 없습니다." :image-size="70" />
      </el-menu>

      <el-card class="practice-stage" shadow="never">
        <div class="stage-heading"><div><el-tag type="success" effect="light">LIVE PRACTICE</el-tag><h2>{{ selectedLesson.title }}</h2></div><el-tag effect="plain">{{ selectedLesson.groupLabel }}</el-tag></div>
        <el-divider />
        <component :is="selectedLesson.component" />
      </el-card>
    </div>
  </section>
</template>
