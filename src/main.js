import { createApp } from 'vue'
// 引入ElmentPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import jquery from "jquery";
import store from '@/store'


const app = createApp(App)

app.use(ElementPlus)
app.use(router).use(store).mount('#app')

