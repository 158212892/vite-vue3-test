/**
 * @about 表格编辑
 * @使用注意  /index/work/library_place
 * 			单行编辑见 /index/work/analyze_report
 */


import {
	reactive,
	ref,
	onBeforeUpdate,
	nextTick
} from 'vue';

import {
	ElMessage,
	ElNotification
} from 'element-plus';


// 关于表格编辑
const tableEdit = (editTableData) => {
	let snap_data = reactive({});

	// input 聚焦
	const inputFous = (row, index) => {
		console.log('聚焦了');
		snap_data.value = Object.assign({}, row);
	}

	// input 失焦
	const inputBlur = (row, index) => {
		console.log('失焦了');
		let is_change = JSON.stringify(row) === JSON.stringify(snap_data.value);
		console.log(is_change);
		if (!is_change) editTableData(row);
	};

	return {
		inputFous,
		inputBlur
	};
};

//编辑单行
const useTableEditRow = (editApi) => {
	let edit_oid = ref(null);
	let itemRowRefs = [];
	let old_data = null;

	const setRowItemRef = el => {
		itemRowRefs.push(el);
	};

	const editItemBtn = async (row, index, num) => {
		itemRowRefs = [];
		edit_oid.value = row.oid;
		//是否更改
		old_data = Object.assign({}, row);

		await nextTick();

		if (itemRowRefs[num]) return itemRowRefs[num].focus();
		if (itemRowRefs[0]) return itemRowRefs[0].focus();
		itemRowRefs[1].focus();
	};

	//保存
	const saveItemBtn = async (row, index) => {
		let table_status = JSON.stringify(row) === JSON.stringify(old_data);

		if (!table_status) {
			let status = await editApi(row);
			if (status.data) {
				edit_oid.value = null;

				ElNotification({
					title: '更改成功！',
					type: "success",
					duration: 1200
				});
			};
		} else {
			ElMessage.info('无更改');
			edit_oid.value = null;
		};
	};

	onBeforeUpdate(() => {
		itemRowRefs = [];
	});


	return {
		edit_oid,
		setRowItemRef,
		editItemBtn,
		saveItemBtn
	};
};

export {
	tableEdit,
	useTableEditRow
};