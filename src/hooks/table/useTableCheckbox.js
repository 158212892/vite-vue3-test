/**
 * @about table 翻页复选框回显问题
 * @funciton | useVxeTableCheckbox | useVxeTableCheckbox |
 * 		@name useVxeTableCheckbox VxeTable 
 * 			@使用注意 此处的 Table 为子组件 单独拎出来了
 * 				     详见实例  /index/work/normal_graph
 * 		@name useVxeTableCheckbox Element-plus Table
 * 			@使用注意 详见实例 /index/work/analyze_report
 */

import { ref, nextTick, watch } from 'vue';



const useVxeTableCheckbox = (props,emit) => {
	// table ref
	const paperTable = ref(null);
	//选中的 set object
	const selectedPapers = new Set();
	
	
	
	//抛出 选择的id  抛出到上一级
	const emitSelect = rows => {
		let changeIds = Array.from(rows);
		emit('changeColumns', changeIds);
	};
	
	//单个选择
	const itemSelect = ({ rowid, checked }) => {
		if (checked) {
			selectedPapers.add(rowid);
		} else {
			selectedPapers.delete(rowid);
		};
		emitSelect(selectedPapers);
	};
	
	//当前页所有选择
	const itemAllSelect = ({ records, checked }) => {
		if (checked) {
			records.forEach(item => selectedPapers.add(item.oid));
		} else {
			// 注意取消全选时需要遍历当前表格数据来删除，records不管用
			paperTable.value.data.forEach(item => selectedPapers.delete(item.oid));
		};
		emitSelect(selectedPapers);
	};
	
	watch(
		() => props.tableDatas,
		async (newVal, oldValue) => {
			await nextTick();
			let table = paperTable.value;
			table.data.forEach(paper => {
				if (selectedPapers.has(paper.oid)) {
					table.setCheckboxRow(table.getRowById(paper.oid), true);
				}
			});
			emitSelect(selectedPapers);
		}
	);
	
	return {
		paperTable,
		selectedPapers,
		itemSelect,
		itemAllSelect
	};
};


//el-table checkbox 默认返回 oid
const useEleTableCheckbox = (state,select_key = 'oid') => {
	// table ref
	const multipleTable = ref(null);
	let multipleSelection = ref([]);
	//选中的 set object
	const selectedPapers = new Set();
	
	//单个选择
	const handleSelection = (selection,row) => {
		//如果点击的取消
		if(getSelectList().includes(row[`${select_key}`])){
			selectedPapers.delete(row[`${select_key}`]);
		};
	};
	//所有选择
	const handleSelectionAll = (selection) => {
		if(!selection.length){
			state.tableData.forEach(itm => {
				selectedPapers.delete(itm[`${select_key}`]);
				getSelectList();
			});
		};
	};
	//选中值变化
	const handleSelectionChange = (val) => {
		val.forEach(itm => selectedPapers.add(itm[`${select_key}`]));
		getSelectList();
	};
	
	//获取已经选择的 list
	const getSelectList = () => {
		multipleSelection.value = Array.from(selectedPapers);
		return multipleSelection.value;
	};
	//清空
	const clearSelectList = () => {
		multipleSelection.value = [];
		selectedPapers.clear();
		multipleTable.value.clearSelection();
	};
	
	watch(
		() => state.tableData,
		async (newVal, oldValue) => {
			await nextTick();
			newVal.forEach(itm => {
				if (selectedPapers.has(itm[`${select_key}`])) {
					multipleTable.value.toggleRowSelection(itm);
				};
			});
		}
	);
	
	return {
		multipleTable,
		multipleSelection,
		handleSelection,handleSelectionAll,
		handleSelectionChange,
		clearSelectList
	};
};

export {
	useVxeTableCheckbox,
	useEleTableCheckbox
};