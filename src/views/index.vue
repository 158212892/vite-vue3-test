<template>
  <div>
    <HelloWorld />
    <test2/>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
    <router-link to="/22">click me to go with number</router-link>
    <br />
    <router-link to="/bb">click me to go with cap</router-link>
  </div>
</template>
<script>
export default {
  /* 组件内导航守卫 */
  beforeRouteEnter(to, from) {},
};
</script>
<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import  test2 from "./test2"

import {
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
} from "vue";
import {
  useRoute,
  useRouter,
  /* 组合式导航守卫 */
  //   onBeforeRouteEnter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import { useStore, mapState } from "vuex";

defineProps({
  msg: String,
});
defineEmits({});

const router = useRouter();
const route = useRoute();

// router.addRoute([{ name: 'admin', path: '/admin', component: 'index' }])
console.log(router.getRoutes());
console.log("useRoute", useRoute());
console.log("useRouter", useRouter());
console.log("useStore", useStore());
</script>

<style lang="scss" scoped>
</style>