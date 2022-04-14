import {
	ref,
	reactive,
	onMounted,
	nextTick,
	onBeforeUpdate,
} from 'vue';

import {
	ElMessage,
} from 'element-plus';


import axios from 'axios';
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
// import Clipboard from 'clipboard';

import { formmatAxisVal } from '../../utils/utils.js';

/**
 * @about  Excel预览  
 * @流程  
 * 		   一、获得数据
 * 			1. 使用axios请求链接 或者 接口 获得 arraybuffer文件格式
 * 			2. 使用 XLSX 插件过一遍数据 转换成数组式 直观数据
 * 			3. sheet、data 数据存储		   
 * 		   二、单个 sheet 增加标识
 * 			1. 判断字段，符合条件的：操作文本，增加 批注、颜色、坐标 $xx$等
 * 			2. 使用 XLSX 插件 转换成 html 渲染到页面
 *		   三、获取 DOM、剔除标识$xx$、样式转换
 *		   四、其他相关操作如sheet切换，重走流程二、三
 * 
 */
const usePrevirewExcel = () => {
	const table_state = reactive({
		info_data: null, //总数据
		table_item: null, //选中的数据
		table_sheet: [], //sheet 选择的数组名
		sheet_scroll: [], //scrollTop
	});

	const table_event_state = reactive({
		table_tac: 0, //选择的sheet
		is_fixed: false, //是否全屏
		is_loading: false, //是否加载动画
		is_data: false, //是否有数据
	});

	//Dom 操作
	const {
		useExcelStyle
	} = usePrevirewExcelDom();

	// 'http://172.16.22.193:18898/group1/M00/00/10/rBAWwWFNXeWAO3s1AACGyBhoYEc39.xlsx'
	const getExcelData = async (link) => {
		//创建 http 实例
		let axi = axios.create();
		return new Promise(function(resolve, reject) {
			axi({
				method: 'get',
				responseType: 'arraybuffer',
				// url: '/demo.xlsm',  //测试 xlsm
				// url: '/qingdanpizhu.xls', //测试批注使用的 本地excel 
				// url: 'http://172.16.22.193:18898/group1/M00/03/C4/rBAWwWHzYTOABaJvAACZ--AkP_c56.xlsx'
				// url: 'http://172.16.22.193:18898/group1/M00/03/C4/rBAWwWHzYRyAYrWkAADGAqchMMc04.xlsx'
				url: link,
			}).then(async ({
				data
			}) => {
				// 解析数据
				let workbook = XLSX.read(new Uint8Array(data), {
					type: "array",
					cellStyles: true
				});
				//sheet list
				table_state.table_sheet = workbook.SheetNames;
				//sheet data
				table_state.info_data = workbook.Sheets;
				// await useExcelStyle();
				resolve(true);
			});
		});

		//释放内存
		axi = null;
	};

	//直接传递文件形式
	const geFileExcelData = (file_data) => {
		return new Promise(function(resolve, reject) {
			// 解析数据
			let workbook = XLSX.read(new Uint8Array(file_data), {
				type: "array"
			});
			//sheet list
			table_state.table_sheet = workbook.SheetNames;
			//sheet data
			table_state.info_data = workbook.Sheets;

			resolve(true);
		});
	};

	//sheet tab
	const sheetExcelTab = async (index = 0) => {
		return new Promise(async (resolve, reject) => {
			// table_state.table_item = null;
			//切换
			// table_event_state.table_tac = index;
			let worksheet = JSON.parse(JSON.stringify(table_state.info_data[table_state
				.table_sheet[index]])); // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
			//sheet 是否有数据
			let excel_obj_length = [];
			// console.log(worksheet);
			for (let i in worksheet) {
				//仅遍历表格参数，携带 !objects 等无用

				//fix number point 4 bit
				if (typeof worksheet[`${i}`].v == 'number') {
					let point_index = String(worksheet[`${i}`].v).indexOf('.') + 1; // 获取小数点的位置
					let count_num = String(worksheet[`${i}`].v).length - point_index;
					if (point_index > 0 && count_num > 4) {
						worksheet[`${i}`].v = worksheet[`${i}`].v.toFixed(4);
					};
				};

				if (worksheet[`${i}`].t && worksheet[`${i}`].c) {
					//fix 没有文本,但是有批注
					if (!worksheet[`${i}`].v) {
						// console.log(worksheet[`${i}`].w);
						worksheet[`${i}`].v = '$null$';
					};
					// console.log(worksheet[`${i}`]);
					//把批注插入 td 文本
					worksheet[`${i}`].w = (worksheet[`${i}`].v || '无') + '$axis$' + i + '$slot$' + (worksheet[
						`${i}`].c[0].t || '插入了批注但未填写');
					// console.log(worksheet[`${i}`].w)
					// worksheet[`${i}`].w = '**********';
					//没渲染 w 却渲染 h 问题
					if (worksheet[`${i}`].h) worksheet[`${i}`].h = worksheet[`${i}`].w;
				} else {
					excel_obj_length.push(i);
					if (worksheet[`${i}`].s && worksheet[`${i}`].w) {
						//添加警告颜色
						if (worksheet[`${i}`].s.fgColor) {
							worksheet[`${i}`].w = (worksheet[`${i}`].w || '无') + '$rgb$' + (worksheet[`${i}`].s.fgColor.rgb || 'FF0000');
							worksheet[`${i}`].h = worksheet[`${i}`].w;
						}
					}
				};
			};
			table_event_state.is_data = false;
			if (excel_obj_length.length < 2) {
				table_event_state.is_loading = false;
				table_event_state.is_data = true;
				return ElMessage({
					type: 'info',
					message: '此sheet页无数据',
				});
			};
			// console.log(worksheet)
			table_state.table_item = await XLSX.utils.sheet_to_html(worksheet); // 渲染
			resolve(true);
		});
	};


	return {
		table_state,
		table_event_state,
		getExcelData,
		geFileExcelData,
		sheetExcelTab
	};
};

//更改excel 样式 usePrevirewExcelDom
const usePrevirewExcelDom = () => {
	const useExcelStyle = () => {
		return new Promise(function(resolve, reject) {
			resolve(true);
		});
	};

	return {
		useExcelStyle
	};
};

//top event 
const usePrevirewExcelEvent = (props, proxy, emit) => {
	const excel_body_ref = ref(null);

	//复制 html
	const copyHtml = () => {
		return
		// var clipboard = new Clipboard('.previrew_excel');
		// clipboard.on('success', e => {
		// 	clipboard.destroy()
		// });
	};

	//导出
	const createPicture = () => {
		html2canvas(excel_body_ref.value, {
			useCORS: true,
			backgroundColor: null,
			scale: 1, //设置放大的倍数
			height: document.getElementById('excel_body_id').offsetHeight,
			windowHeight: document.getElementById('excel_window_id').scrollHeight
		}).then(canvas => {
			var imgData = canvas.toDataURL("image/jpeg");
			fileDownload(imgData);
		});
	};
	//下载图片
	const fileDownload = (downloadUrl) => {
		let aLink = document.createElement("a");
		aLink.style.display = "none";
		aLink.href = downloadUrl;
		aLink.download = "监控详情.png";
		// 触发点击-然后移除
		document.body.appendChild(aLink);
		aLink.click();
		document.body.removeChild(aLink);
	};

	//下载文件
	const upLoadFile = () => {
		window.open(props.link ||
			'http://172.16.22.193:18898/group1/M00/00/10/rBAWwWFNXeWAO3s1AACGyBhoYEc39.xlsx', '_blank');
	};

	//根据 DOM 增加批注
	const addSlotHtml = () => {
		return new Promise((resolve, reject) => {
			//选择渲染出来的所有 td 单项
			let excel_td_dom = document.querySelectorAll("#excel_body_id table td");
			for (let i in excel_td_dom) {
				//筛选条件为 [存在 | 有内容 | 有标识符（$slot$） ]
				if (typeof excel_td_dom[i].innerHTML == 'string' && excel_td_dom[i].innerHTML &&
					excel_td_dom[i].innerHTML.indexOf('$slot$') !== -1) {

					//添加class
					excel_td_dom[i].setAttribute("class", 'slot_td');
					//文本
					let td_value = excel_td_dom[i].innerHTML.substring(0, excel_td_dom[i].innerHTML
						.indexOf("$slot$"));
					//批注
					let slot_value = (excel_td_dom[i].innerHTML.substring(td_value.length, excel_td_dom[
						i].innerHTML.length)).replace('$slot$', '').replace('<br>', '');
					// 过滤批注 16进制 符号
					if (slot_value.indexOf('�') !== -1) {
						slot_value = slot_value.substring(0, slot_value.indexOf('�'));
					};
					// slot_value = slot_value.replace('�','');
					
					// 判断是否加了横纵坐标
					let axisVal = null;
					if(excel_td_dom[i].innerHTML.indexOf('$axis$') !== -1){
						axisVal = td_value.replace('$null$', '');
						axisVal = axisVal.substring(td_value.indexOf("$axis$"),td_value.length);
						axisVal = axisVal.replace('$axis$', '');
						//清除坐标轴标识
						td_value = td_value.substring(0, td_value.indexOf("$axis$"));
					};
					
					//赋值
					excel_td_dom[i].innerHTML = td_value + '<span  class="slot_badge"></span>' +
						'<span title="批注" class="slot_class">' + slot_value + '</span>';
					
					// 测试点击DOM获取值
					excel_td_dom[i].onclick = (e) => {
						emit('handExcelValue', {
							td_value: td_value == '$null$' ? null : td_value,
							slot_value,
							axis_value: formmatAxisVal(axisVal)
						});
					};
				};

				//筛选条件为 [存在 | 有内容 | 有标识符（$rgb$） ]  增加颜色
				if (typeof excel_td_dom[i].innerHTML == 'string' && excel_td_dom[i].innerHTML && excel_td_dom[i].innerHTML.indexOf('$rgb$') !== -1) {
					// 文本
					let td_value = excel_td_dom[i].innerHTML.substring(0, excel_td_dom[i].innerHTML
						.indexOf("$rgb$"));
					// 颜色
					let slot_value = (excel_td_dom[i].innerHTML.substring(td_value.length, excel_td_dom[
						i].innerHTML.length)).replace('$rgb$', '');
					excel_td_dom[i].innerHTML = td_value;

					//无批注红底
					if (slot_value == 'FF0000') {
						excel_td_dom[i].style.backgroundColor = "#" + slot_value;
						excel_td_dom[i].style.color = "#ffffff";
					};
					//无批注黄底
					if (slot_value == 'FFFF00') {
						excel_td_dom[i].style.backgroundColor = "rgba(254, 255, 166, 0.5)";
					};
				};

				//筛选条件如果内容为空，但是有批注的情况
				if (typeof excel_td_dom[i].innerHTML == 'string' && excel_td_dom[i].innerHTML &&
					excel_td_dom[i].innerHTML.indexOf('$null$') !== -1) {
					excel_td_dom[i].innerHTML = excel_td_dom[i].innerHTML.replace('$null$', '');
				};
				
				//内容为空高度丢失问题
				if (typeof excel_td_dom[i] == 'object') {
					if (!excel_td_dom[i].innerHTML) {
						excel_td_dom[i].height = '30';
					};
				};
			};
			resolve(true);
		});
	};

	return {
		excel_body_ref,
		createPicture,
		upLoadFile,
		copyHtml,
		addSlotHtml
	};
};

// sheet 切换位移相关
const sheetTabScrollAbout = () => {
	/** sheet ref */
	const sheets_ref = ref(null);

	const sheets_scroll = reactive({
		/** sheet可见宽度 */
		show_width: 0,
		/** sheet总宽度 */
		all_width: 0,
		/** sheet左边滚动距离 */
		left_width: 0
	});


	// const sheets_all_width
	const sheetScrollEvent = (direction = 'right', /** 可选参数 向左侧位移多远 */ left_width_nums = 0) => {
		if (direction == 'right') {
			sheets_ref.value.scrollLeft += sheets_ref.value.clientWidth - 100;
		} else if (direction == 'left') {
			sheets_ref.value.scrollLeft -= sheets_ref.value.clientWidth + 100;
		} else {
			sheets_ref.value.scrollLeft = left_width_nums - 100;
		};
		sheets_scroll.left_width = sheets_ref.value.scrollLeft;
		// console.log(sheets_scroll);
	};

	// item sheet ref
	const itemRefs = ref([]);
	const setItemRef = el => {
		if (el) {
			itemRefs.value.push(el);
		};
	}

	//sheet toggle scorll 
	const sheetToggleScroll = (index) => {
		let left_width_nums = 0;
		for (let i in itemRefs.value) {
			if (Number(i) < index) {
				left_width_nums += itemRefs.value[i].clientWidth;
			}
		};
		sheetScrollEvent('', left_width_nums);
	};


	onMounted(async () => {
		await nextTick();
		// console.log(sheets_ref.value);
		// console.log(sheets_ref.value.clientWidth);
		// console.log(sheets_ref.value.scrollWidth);
		setTimeout(() => {
			sheets_scroll.show_width = sheets_ref.value.clientWidth;
			sheets_scroll.all_width = sheets_ref.value.scrollWidth;
		}, 80);
	});

	onBeforeUpdate(() => {
		itemRefs.value = [];
	})

	return {
		sheets_ref,
		sheets_scroll,
		sheetScrollEvent,
		itemRefs,
		setItemRef,
		sheetToggleScroll
	};
};

export {
	usePrevirewExcel,
	usePrevirewExcelEvent,
	sheetTabScrollAbout
};
