import { createApp } from "vue";
import App from "./App";

// import './registerServiceWorker'
/* vue全家桶 */
import router from "./router";
import store from "./store";

/* AntdUI*/
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

/* 代替reset.css*/
import 'normalize.css'

const app = createApp(App);
app.use(Antd).use(store).use(router).mount("#app");

console.log("env", import.meta.env);