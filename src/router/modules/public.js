// import index from '@/views/index.vue'
import index from '@/views/index';

export default [
  
  {
    name: 'index',
    path: '/index',
    // alias:['/index'],
    // redirect: to => {
    //     // 方法接收目标路由作为参数
    //     // return 重定向的字符串路径/路径对象
    //     return {
    //         path: '/',
    //         query: {
    //             params: to.params
    //         }
    //     }
    // },
    // component: index,
    components: {
      //命名视图
      default: index,
      a: () => import('../../views/test1'),
      b: () => import('../../views/test2'),
    },
    // props:true, //布尔模式
    // props: { default: true, sidebar: false }, //命名视图
    props: {
      msg: import.meta.env.VITE_APP_TITLE,
    }, //静态对象模式
    // props: route => ({ msg: route.query.msg }),
    meta: {},
    // beforeEnter: [(to, from, next) => { //启用redirect后，添加 beforeEnter 守卫不会有任何效果
    //     next();
    // }, (to, from, next) => {
    //     next();
    // }],
    children: [
      {
        name: 'test',
        path: '/:pathMatch(\\d+)',
        // alias:'',
        // redirect: '/',
        component: () => import('../../views/test1'),
        props: true,
        meta: {},
      },
      {
        name: 'test1',
        path: '/:pathMatch([^\\d]\\w)',
        // alias:'',
        // redirect: '/',
        component: () => import('../../views/test2'),
        props: true,
        meta: {},
      },
    ],
  },
];
