import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import Toast from "vue-toastification";

// fontawesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Bootstrap CSS JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'




createApp(App).use(store).use(router).use(Toast).mount('#app')
