<script lang="tsx">
import { defineComponent } from 'vue';

import './index.scss';

export default defineComponent({
  props: ['pathMatch'],

  setup(props, context) {
    let aa = ['val1', 'val2'];
    // console.log('setup');
    // return () => (<div>1{aa}</div>);
    return {
      a: 'hbbujjk',
      aa,
      dataSource: [
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
      ],

      columns: [
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
      ],
    };
  },
  render() {
    // console.log('render');
    const { pathMatch, aa, dataSource, columns } = this;

    let bb = aa.map((val, i) => <li key={i}> {val} </li>);
    return (
      <div class="css-test1">
        <div>test564645</div>
        <div>{pathMatch}</div>
        <ul>{bb}</ul>
        <a-table dataSource={dataSource} columns={columns} />
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
// @import './index.scss';
.css-test1 {
  background: yellow;
}
</style>
