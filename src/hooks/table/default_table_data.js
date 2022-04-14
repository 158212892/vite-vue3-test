//日期选择 快捷选项
const shortcuts = [{
		text: '最近一周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		}
	},
	{
		text: '最近一个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			return [start, end];
		}
	},
	{
		text: '最近三个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			return [start, end];
		}
	}
];

//日期禁用  禁用今天之后的
const disabledDates = () => {
	const disabledDate = (time) => {
		return time.getTime() > Date.now();
	};

	return {
		disabledDate
	};
};

const tableData = [{
		oid: 123,
		date: '2016-05-02',
		name: '王小虎',
		address: '金沙江路 1518 弄'
	},
	{
		oid: 124,
		date: '2016-05-04',
		name: '王小虎',
		address: '金沙江路 1517 弄'
	},
	{
		oid: 125,
		date: '2016-05-01',
		name: '王小虎',
		address: ' 1519 弄'
	},
	{
		oid: 126,
		date: '2016-05-03',
		name: '王小虎',
		address: ' 1516 弄'
	},
	{
		oid: 127,
		date: '2016-05-03',
		name: '王小虎',
		address: ' 1516 弄'
	}
];


export {
	shortcuts,
	tableData,
	disabledDates
}
