import { createApp } from "vue";
import App from "./App";

// import './registerServiceWorker'
/* vue全家桶 */
import router from "./router";
import store from "./store";
import { setupGlobDirectives } from './directives';
import './router/permission';

/* bootstrap*/
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "bootstrap-icons/font/bootstrap-icons.css";

/* 代替reset.css*/
import 'normalize.css'

const app = createApp(App);
// Register global directive
setupGlobDirectives(app);
app.use(store).use(router).mount("#app");

console.log("env", import.meta.env);