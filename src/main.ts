import { createApp } from 'vue'
import App from './App'
import { router } from './router'
import './styles/index.less'
// import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { Button } from 'ant-design-vue'

const app = createApp(App)

app.use(router)
  .use(Button)
app.mount('#app')