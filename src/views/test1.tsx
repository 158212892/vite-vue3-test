import { defineComponent } from 'vue';

import styles from './test1.module.scss';

const test1 = defineComponent((props, context) => {
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

  const getImageUrl = name => {
    return new URL(`../assets/${name}`, import.meta.url).href;
  };

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
  return () => {
    return (
      <div>
        <div class={styles.cssTest1}>{props.pathMatch}</div>
        <a-button type="primary">Primary</a-button>
        <a-table dataSource={dataSource} columns={columns} />
        <el-button>button</el-button>
      </div>
    );
  };
});

test1.props = {
  pathMatch: {
    type: [String, Number],
  },
};

export default test1;
