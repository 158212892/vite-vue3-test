import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routesModules =
  import.meta.globEager('./modules/*.js');
const routes = Object
  .keys(routesModules)
  .reduce((pre, k) => [...pre, ...routesModules[k].default], []);

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      // el: '#main',
      // el: to.hash,
      // behavior: 'smooth',
      top: 0
    }
  }
})

/* 全局导航守卫 */
router.beforeEach((to, from, /*next*/ ) => {
  //全局前置守卫
  // 返回 false 以取消导航
  // return false
  //undefined 或return true; //则导航是有效的 
  //next(); //一旦启用next参数，必须调用next()才能放行。
})

router.beforeResolve(async to => {
  //全局解析守卫
  /* router.beforeResolve 是一个理想的位置，可以在用户无法进入页面的情况下，获取数据或进行任何其他你想避免的操作。 */
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})

router.afterEach((to, from, failure) => {
  //全局后置钩子
  //它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
  // if (!failure) sendToAnalytics(to.fullPath)
  // sendToAnalytics(to.fullPath)
})

export default router