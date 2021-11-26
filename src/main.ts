import { createApp } from "vue";
import App from "./App";

// import './registerServiceWorker'
/* vue全家桶 */
import router from "./router";
import store from "./store";

/* AntdUI*/
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

/* bootstrap*/
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "bootstrap-icons/font/bootstrap-icons.css";

/* 代替reset.css*/
import 'normalize.css'

const app = createApp(App);
// app.use(Antd).use(store).use(router).mount("#app");
app.use(store).use(router).mount("#app");

console.log("env", import.meta.env);