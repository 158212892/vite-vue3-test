import { defineComponent, ref } from 'vue';
import { RouterView } from 'vue-router';
import App from './App.vue';

import DefaultLayout from './layouts/DefaultLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
/*写法1*/
export default defineComponent({
  components: {
    DefaultLayout,
    MainLayout,
  },
  setup: () => {
    return { layout: ref() };
  },
  render() {
    // console.log(this);

    return this.layout !== undefined ? this.layout : <DefaultLayout></DefaultLayout>;
    // return <RouterView />;
  },
});

/*写法2*/
// export default defineComponent({
//   setup: () => {
//     return function () {
//       console.log(this);

//       return <App />;
//     };
//   },
// });

/*写法3*/
// export default defineComponent(() => {
//   return function () {
//     console.log(this);

//     return <App />;
//   };
// });
