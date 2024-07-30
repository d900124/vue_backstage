
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'; // vuex
import router from './router/router'
import FontAwesomeIcon from "./plugins/fontawesome.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/style.css'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store) // vuex
    .mount('#app')
