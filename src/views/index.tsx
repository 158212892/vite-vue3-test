import {
  /*  方法 */
  defineComponent,
  defineAsyncComponent,
  h,
  ref,
  reactive,
  useSlots,
  useAttrs,
  computed,
  watch,
  /* 生命周期 */
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  /*  内置组件 */
  Suspense,
  Teleport,
  Transition,
  KeepAlive,
  Slot,
} from 'vue';
import {
  RouterLink,
  RouterView,
  useRoute,
  useRouter,
  /* 组合式导航守卫 */
  //   onBeforeRouteEnter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from 'vue-router';
import { useStore, mapState } from 'vuex';

import './index.scss';
//静态引入
// import HelloWorld from '@/views/components/HelloWorld.vue';
//异步引入
export default defineComponent({
  name: 'index',
  props: [],
  beforeRouteEnter(to, from) {
    // console.log('beforeRouteEnter');
  },
  setup(props, { attrs, slots, emit }) {
    console.log('useRoute', useRoute());
    console.log('useRouter', useRouter());
    console.log('useStore', useStore());
    return function () {
      //   console.log(this);

      return (
        <>
          <div>
            {/* <Suspense>
              {{
                fallback: () => (
                  <div>
                    <strong>加载中。。。</strong>
                  </div>
                ),
                default: () => (
                  <>
                    <RouterView name="a"></RouterView> <RouterView name="b"></RouterView>
                  </>
                ),
              }}
            </Suspense> */}
            <RouterView>
              {{
                default: ({ Component, route }) => (
                  <Transition name="fade">
                    <KeepAlive>{Component}</KeepAlive>
                  </Transition>
                ),
              }}
            </RouterView>

            <RouterLink to="/22">click me to go with number</RouterLink>
            <br />
            <br />
            <RouterLink custom to="/bb">
              {{
                default: ({ href, route, navigate, isActive, isExactActive }) => (
                  <a class={isActive ? 'active' : ''} href={href}>
                    {'click me to go with cap' + route.fullPath}
                  </a>
                ),
              }}
            </RouterLink>
          </div>
        </>
      );
    };
  },
});
