<script lang="tsx">
import { defineComponent } from 'vue';

import './index.scss';

export default defineComponent({
  props: ['pathMatch'],

  setup(props, context) {
    // console.log('setup');

    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    // return () => (<div>1{aa}</div>);
    return function () {};
  },
});
</script>
<style lang="scss" scoped>
// @import './index.scss';
</style>
