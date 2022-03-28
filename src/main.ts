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
