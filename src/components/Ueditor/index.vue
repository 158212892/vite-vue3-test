<template>
	<vue-ueditor-wrap :config="myConfig" v-model="copyContent" :editor-id="editorId"></vue-ueditor-wrap>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap';

export default {
	name: 'Editor',
	components: {
		VueUeditorWrap
	},
	data() {
		return {
			// 唯一id防止editor互相影响
			editorId: `editor-${new Date().getTime()}`,
			copyContent: ''
		};
	},
	props: {
		initialFrameHeight: {
			type: Number,
			default() {
				return 400;
			}
		},
		toolbars: {
			type: Array,
			default() {
				return [
					[
						'undo',
						'redo',
						'|',
						'searchreplace',
						'bold',
						'italic',
						'underline',
						'fontborder',
						'strikethrough',
						'superscript',
						'subscript',
						'removeformat',
						'formatmatch',
						'autotypeset',
						'blockquote',
						'pasteplain',
						'|',
						'forecolor',
						'backcolor',
						'insertorderedlist',
						'insertunorderedlist',
						'selectall',
						'cleardoc',
						'|',
						'rowspacingtop',
						'rowspacingbottom',
						'lineheight',
						'|',
						'customstyle',
						'paragraph',
						'fontfamily',
						'fontsize',
						'|',
						'directionalityltr',
						'directionalityrtl',
						'indent',
						'|',
						'justifyleft',
						'justifycenter',
						'justifyright',
						'justifyjustify',
						'|',
						'touppercase',
						'tolowercase',
						'|',
						'link',
						'unlink',
						'anchor',
						'|',
						'imagenone',
						'imageleft',
						'imageright',
						'imagecenter',
						'|',
						'simpleupload',
						'insertimage',
						'emotion',
						'scrawl',
						'insertvideo',
						'attachment',
						'map',
						'pagebreak',
						'|',
						'horizontal',
						'date',
						'time',
						'spechars',
						'|',
						'inserttable',
						'deletetable',
						'insertparagraphbeforetable',
						'insertrow',
						'deleterow',
						'insertcol',
						'deletecol',
						'mergecells',
						'mergeright',
						'mergedown',
						'splittocells',
						'splittorows',
						'splittocols',
						'charts'
					]
				];
			}
		},
		content: {
			type: String,
			default: ''
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		// 富文本简单配置,更多配置可在 ueditor.config.js 中查看
		myConfig() {
			return {
				// 如果需要上传功能,找后端小伙伴要服务器接口地址
				serverUrl: process.env.VUE_APP_BASEURL + '/ioer/upload',
				 // serverUrl: "http://35.201.165.105:8000/controller.php",
				// 你的UEditor资源存放的路径,相对于打包后的index.html(路由使用history模式注意使用绝对路径或者填写正确的相对路径)
				UEDITOR_HOME_URL: '/ueditor/',
				// UEDITOR_HOME_URL: '../../assets/ueditor_dev/',
				// 编辑器不自动被内容撑高
				autoHeightEnabled: false,
				// 初始容器高度
				initialFrameHeight: this.initialFrameHeight,
				// 初始容器宽度
				initialFrameWidth: '100%',
				// 关闭自动保存s
				enableAutoSave: false,
				autosave: false,
				// 是否启用元素路径，默认是true显示
				elementPathEnabled: false,
				// 是否开启字数统计
				wordCount: true,
				// 工具栏
				toolbars: this.toolbars,
				// 层级
				zIndex: 0,
				// 只读属性
				readonly: this.readonly
			};
		}
	},
	model: {
		prop: 'content',
		event: 'change'
	},
	watch: {
		copyContent(val) {
			this.$emit('change', val);
		},
		content: {
			immediate: true,
			handler(val) {
				this.copyContent = val;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	::v-deep .edui-default .edui-editor{
		z-index: 0!important;
	}
</style>