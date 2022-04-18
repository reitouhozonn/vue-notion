import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory, RouteRecordRaw, } from "vue-router";

import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

// import 'firebase/firestore' // firestoreを使いたいのでimportする
// import 'firebase/auth'
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC6fk3qSBe9GkvmgN-F8GAuH1pe9lcj0B4",
//   authDomain: "codememo-2d69e.firebaseapp.com",
//   projectId: "codememo-2d69e",
//   storageBucket: "codememo-2d69e.appspot.com",
//   messagingSenderId: "5454883495",
//   appId: "1:5454883495:web:f28f64d25533e11b690982",
//   measurementId: "G-2VVWX1BR55"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);





const routes: Array<RouteRecordRaw> = [
  {
    path: "/main",
    name: "main",
    meta: { title: 'NotionV' },
    component: () => import('./components/MainPage.vue'),
  },
  {
    path: "/",
    name: "top",
    component: () => import('./components/Top.vue'),
    // redirect: "main"
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
