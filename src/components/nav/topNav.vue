<template>
	<el-row  class="container">
		<div class="headTopBox align-center jus-left">
			<div class="logo jus-center align-center"><i></i></div>
			<div class="bg_linear"></div>
			<div class="title">基于“网上电网”的省地一体化多维精益规划决策功能应用</div>
			<div class="head-right jus-right">
				<div class="flex">
					<div class="head-icon"></div>
					<div class="p-l-5">
						<div>周一一，欢迎你</div>
						<div><i class="company-icon"></i>国网成都供电公司</div>
					</div>
					<div class="shu"></div>
				</div>
				<div style="padding:10px 0 0 10px">
					<!-- <div><i class="set-icon"></i>设置</div> -->
					<div><i class="logOut"></i>退出登陆</div>
				</div>
			</div>
			<!-- <div class="btn-fullscreen" @click="handleFullScreen">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="el-icon-rank"></i>
				</el-tooltip>
			</div> -->

		</div>
		<!--头部-->
		<el-col v-show="false" :span="24" class="topbar-wrap">
			<div class="topbar-logo topbar-btn">
				<a href="/">
					
				</a>
				国家电网
			</div>
			<div class="topbar-logos">
				国家电网基于“网上电网”的省地一体化多维精益规划决策功能应用
			</div>
			<div class="topbar-title">
				<!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
				<el-row v-show="$store.state.topNavState==='home'">
					<el-col :span="24">
						<el-menu
							:default-active="defaultActiveIndex"
							class="el-menu-demo"
							mode="horizontal"
							@select="handleSelect"
							:router="true"
						>
							<!-- <el-menu-item index="/">我的工作</el-menu-item>
							<el-menu-item index="/docsmanager">文件管理</el-menu-item>
							<el-menu-item index="/versionManager">版本控制管理</el-menu-item> -->
						</el-menu>
					</el-col>
				</el-row>
				<!-- <el-row v-show="$store.state.topNavState==='docs'">
					<el-col :span="24">
					</el-col>
				</el-row> -->
			</div>
			<div class="topbar-account topbar-btn">
				<el-row class='user-row'>
					<el-col :span="3">
						<!-- 全屏显示 -->
						<div class="btn-fullscreen" @click="handleFullScreen">
							<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
								<i class="el-icon-rank"></i>
							</el-tooltip>
						</div>
					</el-col>
					<el-col :span="3">
						<!-- 消息中心 -->
						<div class="btn-bell">
							<el-tooltip
								effect="dark"
								:content="messageCount?`有${messageCount}条未读消息`:`消息中心`"
								placement="bottom"
							>
								<router-link to="/message">
									<i class="el-icon-message-solid"></i>
								</router-link>
							</el-tooltip>
							<span class="btn-bell-badge" v-if="messageCount"></span>
						</div>
					</el-col>
					<el-col :span="18">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link userinfo-inner">
								<i class="iconfont icon-user"></i>
								{{nickname}}
								<i class="el-icon-caret-bottom"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<div @click="jumpTo('/user/changepwd')">
										<span style="color: #555;font-size: 14px;">修改密码</span>
									</div>
								</el-dropdown-item>
								<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</el-row>
			</div>
		</el-col>
	</el-row>
</template>
<script>
import { road } from "../../road.js";

export default {
	data() {
		return {
			loading: false,
			fullscreen: false,
			roleName: "",
			nickname: "",
			defaultActiveIndex: "/",
			homeMenu: false,
			messageCount: 5
		};
	},
	created() {
		road.$on("setNickName", text => {
			this.nickname = "text";
		});

		road.$on("goto", url => {
			// if (url === "/login") {
			// 	localStorage.removeItem("Authorization");
			// 	this.$router.push(url);
			// }
		});
		// 组件创建完后获取数据
		this.fetchNavData();
	},
	methods: {
		jumpTo(url) {
			this.$router.push(url); //用go刷新
		},
		handleSelect(index) {
			this.defaultActiveIndex = index;
		},
		// 全屏事件
		handleFullScreen() {
			let element = document.documentElement;
			if (this.fullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			} else {
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.webkitRequestFullScreen) {
					element.webkitRequestFullScreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.msRequestFullscreen) {
					// IE11
					element.msRequestFullscreen();
				}
			}
			this.fullscreen = !this.fullscreen;
		},
		fetchNavData() {
			// 初始化菜单激活项
			let cur_path = this.$route.path; //获取当前路由
			let routers = this.$router.options.routes; // 获取路由对象
			let nav_type = "",
				nav_name = "";
			for (var i = 0; i < routers.length; i++) {
				let children = routers[i].children;
				if (children) {
					for (let j = 0; j < children.length; j++) {
						if (children[j].path === cur_path) {
							nav_type = routers[i].type;
							nav_name = routers[i].name;
							break;
						}
						// 如果该菜单下还有子菜单
						if (children[j].children) {
							let grandChildren = children[j].children;
							for (let z = 0; z < grandChildren.length; z++) {
								if (grandChildren[z].path === cur_path) {
									nav_type = routers[i].type;
									nav_name = routers[i].name;
									break;
								}
							}
						}
					}
				}
			}
			this.$store.state.topNavState = nav_type;
			this.$store.state.leftNavState = nav_name;
			if (nav_type == "home") {
				this.defaultActiveIndex = "/";
			} else {
				this.defaultActiveIndex = "/" + nav_name + "Manager";
			}
		},
		logout() {
			//logout
			this.$confirm("确认退出吗?", "提示", {
				confirmButtonClass: "el-button--warning"
			})
				.then(() => {
					//确认
					// localStorage.removeItem("Authorization");
					// road.$emit("goto", "/login");
				})
				.catch(() => {});
		}
	},
	mounted() {
		let user = window.localStorage.getItem("Authorization");
		if (user) {
			user = JSON.parse(user);
			this.nickname = user.nickname || "";
			this.rolename = user.rolename || "";
		}
	},
	watch: {
		$route: function(to, from) {
			// 路由改变时执行
			//console.info("to.path:" + to.path);
			this.fetchNavData();
		}
	}
};
</script>
<style scoped lang="scss">
	@import '../../assets/css/home/top_navbar.scss'; 
</style>
