import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'test2',
  props: ['pathMatch'],
  setup(props, context) {
    return () => (
      // <>
      <div>
        <div>{props.pathMatch}</div>
        <A
          v-slots={{
            bar: scope => <span>{scope.q + scope.e} B</span>,
          }}
        >
          <input class="css-test1" />
        </A>
      </div>
       
      // </>
    );
  },
});

var A = defineComponent((props, { slots }) => {
  const q = 1;
  const e = 2;
  return function () {
    /*属性劫持*/
    console.log('this', this);
    this.$options.name = 'A';
    // const data = ref('test');
    // this.$slots.default()[0].props = {
    //   value: data.value,
    //   onChange: e => {
    //     return (data.value = e);
    //   },
    //   ...this.$slots.default()[0].props,
    // };

    return (
      <>
        {/* <h2> {{data.value}} </h2> */}
        {/* 定义插槽*/}
        <h1>{slots.default ? slots.default() : 'default'}</h1>
        <h2>{slots.bar?.({ q, e }) || 'bar'}</h2>
      </>
    );
  };
});
