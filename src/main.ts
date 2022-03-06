import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory, RouteRecordRaw, } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/main",
        name: "main",
        component: import('./components/MainPage.vue'),
    },
    {
        path: "/study/binding",
        name: "binding",
        component: import('./components/study/BindingPage.vue'),
    },
    {
        path: "/study/directive",
        name: "directive",
        component: import('./components/study/DirectivePage.vue'),
    },
    {
        path: "/study/event",
        name: "event",
        component: import('./components/study/EventPage.vue'),
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



createApp(App).use(router).mount('#app')
