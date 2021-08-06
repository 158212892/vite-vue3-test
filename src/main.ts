import { createApp } from 'vue'
import App from './App'

// import './registerServiceWorker'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

console.log('env',import.meta.env);
