import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$axios = axios;
installElementPlus(app)
router.push('/'); // 确保应用启动时导航到登录页面
app.use(axios)
app.use(router).mount('#app')