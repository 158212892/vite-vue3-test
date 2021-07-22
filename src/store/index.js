import {
  createStore
} from 'vuex'

//数据持久化
// import persistedState from 'vuex-persistedstate'

import mutation from "./mutation"
import action from "./action"

const modulesFiles =
  import.meta.globEager('./modules/*.js');
const modules = Object
  .keys(modulesFiles)
  .reduce((pre, k) => ({
    ...pre,
    [k.replace(/\.\/modules\/|\.js/g, "")]: modulesFiles[k].default
  }), {});

export default createStore({
  // state,
  // getters,
  mutation,
  action,
  modules,
  // plugins: [persistedState()]
})