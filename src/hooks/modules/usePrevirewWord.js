import {
	ref,
	reactive,
	toRefs,
	getCurrentInstance
} from 'vue';
import axios from 'axios';
import {
	renderAsync
} from 'docx-preview';

/**
 * @about  Word预览  
 * 		     一个页面仅支持显示一个 （支持标题树三级）
 * 			 word 里面的内容可赋值
 * @流程   
 * 		1. 根据 docx超链接 进行实现预览
 * 		2. 解析已经展示的文档 DOM
 * 		3. 更改样式，获取所需要更改 class 的 DOM，原生 js 更改样式（引入式 css 无效）
 * 		4. （可选参数）根据标题特定 class 解析 tree， 获取标题、位置、等级
 * 		 （展示 => 获取解析有延迟）
 *      5. （可选参数）tree 节点点击跳转
 * @注意事项
 * 		1. 依赖文档特定标题、需要与后端进行规范交流 
 * 		 （详见F12、DOM中基础 word文档 ，可根据多个 word 进行微调，标题类名差异不大）
 * 		2. word 滚动左边树跟着变化需要进一步拓展
 * @utils的使用
 *   @name regFind  获取一个字符串值在指定字符串第n次出现的位置
 *   @name strChangeNum  中文转汉字
 *   @name filtersText   富文本转文本
 *   @name filtersTextOrText 文本截取  两个字符中间的字符
 */

//富文本截取 （提取DOM中 标题）
const filtersText = (html) => { // 要判断一下,如果是空就返回空字符串,不然会报错
	var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
	var msg = html.replace(re1, ''); //执行替换成空字符
	return msg;
};
//文本截取  两个字符中间的字符
const filtersTextOrText = (str, a = '第', b = '章') => { // 要判断一下,如果是空就返回空字符串,不然会报错
	if (str) {
		let new_str = str.substring(str.indexOf(a) + 1, str.indexOf(b))
		return new_str;
	};
};

//展示 word 并解析 tree  [| 树列表 | 层级对象 | 获取层级DOM | 获取树及距离 | 样式]
const usePrevirewWord = (treeList, dom_obj, getWordDom, analyzeTree, useWordStyle) => {
	let preview_word = ref(null); //渲染节点

	/**
	 * @about 获取 word 解析树
	 *  @property { Any} type = [scroll|other] 显示类型
	 * 	@value scroll 预览显示并解析树
	 * 	@value other  仅预览
	 */
	// group1/M00/01/18/rBAWwWGKLKWAXw0CAABcEgoFGSY76.docx
	const getWordData = async (link ='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f6b059c1-2fc8-49e8-b1ca-75703a910a4b/8db41354-bc3d-4f6d-9e33-e9af88b25680.docx',type = "scroll") => {
		if(link.indexOf('http') == -1) link  = ' http://172.16.22.193:18898/'+ link
		//创建 http 实例
		let axi = axios.create();
		axi({
			method: 'get',
			responseType: 'blob',
			// url: '/ceshi2.docx' || 'http://172.16.22.193:18903/group1/M00/02/F1/rBAWwWG5pnOAbFERALY6rfXglUg786.doc',
			url: link
		}).then(async ({
			data
		}) => {
			await renderAsync(data, preview_word.value); // 渲染到页面
			await useWordStyle(); //更改样式

			//如果 type 不等于 scroll 仅展示
			if (type == 'scroll') {
				await getWordDom(); //获取dom
				//重新赋值
				treeList.value = [];
				await analyzeTree(); //重新赋值 树
			}
		});
		//释放内存
		axi = null;
	};

	return {
		preview_word,
		dom_obj,
		getWordData
	};
};
//word dom节点、数据存储 相关   三级 ['一、'、'1'、'12'] 类型
const ownPrevirewWordEasyDom = (treeList) => {
	const {
		proxy
	} = getCurrentInstance();
	
	let classification = {
		title_info: 'docx_3', //章 内容里
	};
	
	const dom_obj = reactive({
		a: null, //一级
	})
	
	//获取word dom 节点
	const getWordDom = () => {
		return new Promise(function(resolve, reject) {
			dom_obj.a = document.getElementsByClassName(classification.title_info); //章 位置
			resolve(true);
		});
	};
	
	//解析树 每一级都有特定标题、特定标题有特定 class 类名、遍历同等级 class 类名；
	// 如大标题 11个， 11个等级，再遍历所有二级标题，找到二级标题属于那个一级标题...
	const analyzeTree = () => {
		return new Promise(function(resolve, reject) {
			//第 n 章   页面位置
			for (let i in dom_obj.a) {
				if (typeof dom_obj.a[i] == 'object'){
					let obj_data = {
						label: filtersText(dom_obj.a[i].innerHTML), //标题名字
						level: 1, //标题等级
						index: +i, //标题下标
					};
					treeList.value.push(obj_data);
				}
			};
			resolve(true);
		});
	};
	
	//更改word 样式
	const useWordStyle = () => {
		return new Promise(function(resolve, reject) {
			let docx_wrapper_dom = document.getElementsByClassName('docx-wrapper')[0];
			docx_wrapper_dom.style.padding = '0px';
			let docx_body_dom = document.getElementsByClassName('docx')[0];
			docx_body_dom.style.width = '100%';
			resolve(true);
		});
	};
	
	return {
		dom_obj,
		getWordDom,
		analyzeTree,
		useWordStyle
	};
};

//word dom节点、数据存储 相关   三级 ['第一章'、'1.1'、'1.1.1'] 类型
const ownPrevirewWordDom = (treeList) => {
	const {
		proxy
	} = getCurrentInstance();

	let classification = {
		title_info: 'docx_87', //章 内容里
		subsection: 'docx_80', //节 内容里
		mini_subsection: 'docx_5' //小节  内容里
	};

	const dom_obj = reactive({
		a: null, //一级
		b: null, //二级
		c: null, //三级
	})

	//获取word dom 节点
	const getWordDom = () => {
		return new Promise(function(resolve, reject) {
			dom_obj.a = document.getElementsByClassName(classification.title_info); //章 位置
			dom_obj.b = document.getElementsByClassName(classification.subsection); //节
			dom_obj.c = document.getElementsByClassName(classification.mini_subsection); //节
			resolve(true);
		});
	};

	//解析树 每一级都有特定标题、特定标题有特定 class 类名、遍历同等级 class 类名；
	// 如大标题 11个， 11个等级，再遍历所有二级标题，找到二级标题属于那个一级标题...
	const analyzeTree = () => {
		return new Promise(function(resolve, reject) {
			//第 n 章   页面位置
			for (let i in dom_obj.a) {
				if (typeof dom_obj.a[i] == 'object' && filtersText(dom_obj.a[i].innerHTML) &&
					filtersText(dom_obj.a[i].innerHTML).indexOf('章 ') !== -1) {

					let obj_data = {
						label: filtersText(dom_obj.a[i].innerHTML), //标题名字
						level: 1, //标题等级
						index: +i, //标题下标
						children: [] //子级标题
					};

					let big_index = proxy.$utils.strChangeNum(filtersTextOrText(obj_data
						.label)); //数字表示章节

					//子级
					for (let o in dom_obj.b) {
						if (typeof dom_obj.b[o] == 'object' && filtersText(dom_obj.b[o].innerHTML)) {

							//截取小标题第一个 . 前面的数字
							let small_index = +filtersText(dom_obj.b[o].innerHTML).substr(0, proxy
								.$utils.regFind(filtersText(dom_obj.b[o].innerHTML), '.', 0) + 1);

							//如果节第一个数字为1 说明为第一章
							if (big_index === small_index) {
								let small_obj_data = {
									label: filtersText(dom_obj.b[o].innerHTML), //标题名字
									level: 2, //标题等级
									index: +o, //标题下标
									children: [] //三级标题
								};

								//三级
								for (let r in dom_obj.c) {
									if (typeof dom_obj.c[r] == 'object' && filtersText(dom_obj.c[r]
											.innerHTML)) {
										//三级的一级数字标识
										let mini_one_index = +filtersText(dom_obj.c[r].innerHTML)
											.substr(0, proxy.$utils.regFind(filtersText(dom_obj.c[r]
												.innerHTML), '.', 0) + 1);
										//三级的第二个数字标识
										let mini_two_index = +filtersText(dom_obj.c[r].innerHTML)
											.substring(proxy.$utils.regFind(filtersText(dom_obj.c[r]
												.innerHTML), '.', 0) + 1, proxy.$utils.regFind(
												filtersText(dom_obj.c[r].innerHTML), '.', 1));
										//二级的数字标识
										let small_index_num = +filtersText(dom_obj.b[o].innerHTML)
											.substr(0, proxy.$utils.regFind(filtersText(dom_obj.b[o]
												.innerHTML), ' ', 0) + 1);
										//三级的二级数字标识
										let mini_index = +filtersText(dom_obj.c[r].innerHTML).substring(
											0, proxy.$utils.regFind(filtersText(dom_obj.c[r]
												.innerHTML), '.', 1));


										/**
										 * @流程  三级标识如 1.1.1 截取其中的 1.1 与二级标识做对比
										 */

										if (mini_index === small_index_num) {
											let mini_obj_data = {
												label: filtersText(dom_obj.c[r].innerHTML), //标题名字
												level: 3, //标题等级
												index: +r, //标题下标
											};
											small_obj_data.children.push(mini_obj_data);
										}
									};
								};
								obj_data.children.push(small_obj_data);
							};
						};
					};
					treeList.value.push(obj_data);
				}
			};
			resolve(true);
		});
	};

	//更改word 样式
	const useWordStyle = () => {
		return new Promise(function(resolve, reject) {
			let docx_wrapper_dom = document.getElementsByClassName('docx-wrapper')[0];
			docx_wrapper_dom.style.padding = '0px';
			let docx_body_dom = document.getElementsByClassName('docx')[0];
			docx_body_dom.style.width = '100%';

			//获取 所有 table 下所有 span DOM
			let docx_table_dom = document.querySelectorAll("table span");
			docx_table_dom.forEach((e) => {
				e.style.textDecoration = 'none';
				e.style.fontStyle = 'normal';
				e.style.fontFamily = 'Calibri';
			});
			resolve(true);
		});
	};

	return {
		classification,
		dom_obj,
		getWordDom,
		analyzeTree,
		useWordStyle
	};
};

//点击、跳转操作
const useWordEventLink = (treeList /*树*/ , dom_obj /*DOM*/ ) => {
	//   节点点击事件	 level 1、2、3 分别代表层级
	const nodeClick = (data, node, e) => {
		if (node.data.level === 1) {
			dom_obj.a[node.data.index].scrollIntoView();
		};
		if (node.data.level === 2) {
			dom_obj.b[node.data.index].scrollIntoView();
		};
		if (node.data.level === 3) {
			dom_obj.c[node.data.index].scrollIntoView();
		};
	};

	return {
		nodeClick,
	};
};


export {
	usePrevirewWord,
	useWordEventLink,
	ownPrevirewWordDom,
	ownPrevirewWordEasyDom
};
