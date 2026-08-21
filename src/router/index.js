import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'WeatherHome', component: () => import('../views/WeatherHomeView.vue') },
    { path: '/about', name: 'WeatherAbout', component: () => import('../views/WeatherAboutView.vue') },
    { path: '/weather/:cityId', name: 'WeatherDetail', component: () => import('../views/WeatherDetailView.vue') },
    { path: '/learning', name: 'Learning', component: () => import('../views/LearningView.vue') },
    { path: '/practice', name: 'PracticeAppendix', component: () => import('../views/PracticeAppendixView.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFoundView.vue') },
  ],
})

export default router
