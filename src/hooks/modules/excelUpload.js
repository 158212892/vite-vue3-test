/**
 * @about excel 模板文件上传 以及 文件下载
 * @createTime 2021/8/20 
 */

import {
	ref,
	getCurrentInstance
} from 'vue';

import { ElMessage, ElNotification } from 'element-plus';

const excelUpload = (dialogVisible) => {
	const {
		ctx,
		proxy
	} = getCurrentInstance();

	let upload_loading = ref(false);
	let uploadFile = ref(null);
	

	const handleAvatarSuccess = res => {
		upload_loading.value = false;

		if (res.code == 200) {
			dialogVisible.value = false;
			ElNotification({
				title: '导入成功！',
				type: 'success'
			});
		} else {
			setTimeout(_ => {
				uploadFile.value.clearFiles();
			}, 1000)
			ElNotification({
				title: '导入失败！',
				message: res.msg,
				type: 'error'
			});
		}
	};

	const beforeAvatarUpload = file => {
		const suffix = proxy.$utils.getSuffix(file.name);
		const isLt10M = file.size / 1024 / 1024 < 10;

		if (!['xlsx', 'xls'].includes(suffix)) {
			ElMessage.warning('只能上传表格文件!');
			return false;
		}

		if (!isLt10M) {
			ElMessage.warning('上传文件大小不能超过10MB!');
			return false;
		}

		upload_loading.value = true;
	};
	
	//上传文件拦截
	const beforeAvatarUploadZip = (file) => {
		const isLt10M = file.size / 1024 / 1024 < 100;
		const zip_file = proxy.$utils.getSuffix(file.name);
		let is_zip = true;
	
		if (!["zip"].includes(zip_file)) {
			is_zip = false;
			ElMessage({
				message: "只能上传zip为后缀的压缩包并不大于100M",
				type: "warning",
			});
		}
		if (!isLt10M) {
			ElMessage({
				message: "单个压缩包不能大于100M",
				type: "warning",
			});
		}
		if(is_zip && isLt10M) upload_loading.value = true;
		return is_zip && isLt10M;
	};
	
	// 文件下载
	const fileUpload = () => {
		ElNotification({
			title: '模板下载正在开发中！',
			type: 'info'
		});
	};
	
	return {
		uploadFile,
		upload_loading,
		beforeAvatarUpload,beforeAvatarUploadZip,
		handleAvatarSuccess,
		fileUpload
	};
};

export {
	excelUpload
};
