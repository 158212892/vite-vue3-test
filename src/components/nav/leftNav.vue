<template>
	<!--左侧导航-->
	<aside :class="{ showSidebar: !collapsed }">
		<!--导航菜单-->
		<el-menu :default-active="$route.path" router :collapse="collapsed" ref="leftNavigation">
			<template v-for="(issue, index) in $router.options.routes">
				<!-- 注意：这里就是leftNavState状态作用之处，当该值与router的根路由的name相等时加载相应菜单组 -->
				<template v-if="issue.name === $store.state.leftNavState">
					<template v-for="(item, index) in issue.children">
						<!-- <el-submenu  v-if="!item.leaf" :index="index+''" v-show="item.menuShow">
              <template slot="title"><i :class="item.meta.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path===term.path?'is-active':''">
                <i :class="item.meta.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu> -->
						<el-menu-item v-if="item.leaf" :index="item.path" :key="item.path" :class="oneLevelPath($route) === item.path ? 'is-active' : ''" v-show="item.menuShow">
							<div class="item-pd">
								<div><i :class="oneLevelPath($route) === item.path ? issue.meta.onIconCls : issue.meta.iconCls"></i></div>
								<div slot="title">{{ item.name }}</div>
							</div>
						</el-menu-item>
					</template>
				</template>
			</template>
		</el-menu>
		<!--展开折叠开关-->
		<div class="menu-toggle" v-show="collapsed">
			<i class="el-icon-caret-left" v-show="!collapsed" title="收起"></i>
			<i class="el-icon-caret-right" v-show="collapsed" title="展开"></i>
		</div>
	</aside>
</template>
<script>
export default {
	name: 'leftNav',
	data() {
		return {
			loading: false,
			collapsed: this.$store.state.collapsed
			// oneLevelPath:'/'+this.$route.path.match(/\w+/gi)[0],//一级路由
		};
	},
	methods: {
		oneLevelPath(route) {
			return `/${route.path.match(/\w+/gi)[0]}`; //一级路由
		},
		//折叠导航栏
		// collapse: function () {
		//   this.collapsed = !this.collapsed;
		//   this.$store.state.collapsed = this.collapsed;
		// },
		// 左侧导航栏根据当前路径默认打开子菜单（如果当前是二级菜单，则父级子菜单默认打开）
		defaultLeftNavOpened() {
			let cur_path = this.$route.path; //获取当前路由
			let routers = this.$router.options.routes; // 获取路由对象
			let subMenuIndex = '',
				needOpenSubmenu = false;
			for (let i = 0; i < routers.length; i++) {
				let children = routers[i].children;
				if (children) {
					for (let j = 0; j < children.length; j++) {
						if (children[j].path === cur_path) {
							break;
						}
						// 如果该菜单下还有子菜单
						if (children[j].children && !children[j].leaf) {
							let grandChildren = children[j].children;
							for (let z = 0; z < grandChildren.length; z++) {
								if (grandChildren[z].path === cur_path) {
									subMenuIndex = j;
									needOpenSubmenu = true;
									break;
								}
							}
						}
					}
				}
			}
			if (this.$refs['leftNavigation'] && needOpenSubmenu) {
				this.$refs['leftNavigation'].open(subMenuIndex); // 打开子菜单
			}
		}
	},
	watch: {
		$route: function(to, from) {
			// 路由改变时执行
			//console.info("to.path:" + to.path);
		},
		'$store.state.collapsed': function(newVal) {
			this.collapsed = newVal;
			//  document.querySelectorAll('.menu-list')
		}
	},
	mounted() {
		this.defaultLeftNavOpened();
	}
};
</script>
<style lang="scss" scoped>
.el-menu-item {
	height: 70px;
	line-height: 14px;
	font-size: 0.16rem;
}
.item-pd {
	padding: 10px 20px;
}

// 菜单图标
.index,
.indexOn,
.mailList,
.mailListOn,
.expertBuild,
.expertBuildOn,
.businessEvaluation,
.businessEvaluationOn,
.normativeDocuments,
.normativeDocumentsOn,
.forum,
.forumOn,
.collaborativeWork,
.collaborativeWorkOn {
	// background-image: url("../../assets/images/ontoggle.png");
	width: 21px;
	height: 21px;
	margin-bottom: 8px;
	display: inline-block;
	background-size: 100% 100%;
}
.index {
	background-image: url('../../assets/images/index.png');
}
.indexOn {
	background-image: url('../../assets/images/indexOn.png');
}

.mailList {
	background-image: url('../../assets/images/mailList.png');
}
.mailListOn {
	background-image: url('../../assets/images/mailListOn.png');
}

.expertBuild {
	background-image: url('../../assets/images/expertBuild.png');
}
.expertBuildOn {
	background-image: url('../../assets/images/expertBuildOn.png');
}

.businessEvaluation {
	background-image: url('../../assets/images/businessEvaluation.png');
}
.businessEvaluationOn {
	background-image: url('../../assets/images/businessEvaluationOn.png');
}

.normativeDocuments {
	background-image: url('../../assets/images/normativeDocuments.png');
}
.normativeDocumentsOn {
	background-image: url('../../assets/images/normativeDocumentsOn.png');
}

.forum {
	background-image: url('../../assets/images/forum.png');
}
.forumOn {
	background-image: url('../../assets/images/forumOn.png');
}

.collaborativeWork {
	background-image: url('../../assets/images/collaborativeWork.png');
}
.collaborativeWorkOn {
	background-image: url('../../assets/images/collaborativeWorkOn.png');
}
</style>
