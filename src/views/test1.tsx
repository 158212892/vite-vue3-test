import { defineComponent } from 'vue';

import './index.scss';

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
        <div>{props.pathMatch}</div>
        <a-table dataSource={dataSource} columns={columns} />
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
