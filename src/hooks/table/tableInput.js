/**
 * @about 数据框小数点限制
 * @使用注意  实例见/index/work/library_place
 */

const placeTableInput = (state) => {
	//输入框限制
	const formatInputValue = (value, name, index, c_index) => {
		if (isNaN(value)) {
			return (state.tableData[index].list[c_index][`${name}`] = null);
		}
		if (value.indexOf('.') > 0) {
			return (state.tableData[index].list[c_index][`${name}`] = value.slice(0, value.indexOf('.') + 3));
		}
	};
	
	//输入框限制 一级
	const formatCommonInputValue = (value, name, index) => {
		if (isNaN(value)) {
			return (state.tableData[index][`${name}`] = null);
		}
		if (value.indexOf('.') > 0) {
			return (state.tableData[index][`${name}`] = value.slice(0, value.indexOf('.') + 3));
		}
	};
	
	return {
		formatInputValue,
		formatCommonInputValue
	}
};

export {
	placeTableInput
};
