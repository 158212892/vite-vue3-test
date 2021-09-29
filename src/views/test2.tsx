import { defineComponent, ref } from 'vue';

const A = defineComponent((props, { slots }) => {
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
      <div>
        {/* 定义插槽*/}
        <h1>{slots.default ? slots.default() : 'default'}</h1>
        <h2>{slots.bar?.({ q, e }) || 'bar'}</h2>
      </div>
    );
  };
});

export default defineComponent({
  name: 'test2',
  props: ['pathMatch'],
  setup(props, context) {
    let value = ref<string>('222');
    const onSearch = (searchValue: string) => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
    };
    return () => (
      <A
        v-slots={{
          bar: (scope: any): any => <span>{scope.q + scope.e} B</span>,
        }}
      >
        <a-input-search
          v-model={[value.value, 'value', ['modifier']]}
          placeholder="input search text"
          onSearch={onSearch}
        />
      </A>
    );
  },
});
