import { defineComponent } from 'vue';
import App from './App.vue';
/*写法1*/
export default defineComponent({
  setup: () => {
    return {};
  },
  render() {
    // console.log(this);

    return <App />;
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
