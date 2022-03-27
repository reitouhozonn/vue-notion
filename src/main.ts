import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory, RouteRecordRaw, } from "vue-router";

import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/main",
    name: "main",
    meta: { title: 'NotionV' },
    component: () => import('./components/MainPage.vue'),
  },
  {
    path: "/study/binding",
    name: "binding",
    component: () => import('./components/study/BindingPage.vue'),
  },
  {
    path: "/study/directive",
    name: "directive",
    component: () => import('./components/study/DirectivePage.vue'),
  },
  {
    path: "/study/event",
    name: "event",
    component: () => import('./components/study/EventPage.vue'),
  },
  {
    path: "/*",
    redirect: "main"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// const options: PluginOptions {

// };

createApp(App)
  .use(router)
  .use(Toast)
  .mount('#app')
