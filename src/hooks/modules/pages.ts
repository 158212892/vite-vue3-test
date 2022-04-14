//分页相关
const usePageHandle = (state: { search_form: { size?: number; current?: number; pageNum?:number,pageSize?:number}; }, getList: () => void) => {
	//每页数量
	const handleSizeChange = (val:number):void => {
		if(state.search_form.size) state.search_form.size = val;
		if(state.search_form.pageSize) state.search_form.pageSize = val;
		getList();
	};
	//页码
	const handleCurrentChange = (val:number):void => {
		if(state.search_form.current) state.search_form.current = val;
		if(state.search_form.pageNum) state.search_form.pageNum = val;
		getList();
	};

	return {
		handleCurrentChange,
		handleSizeChange,
	};
};

export {
	usePageHandle
};

