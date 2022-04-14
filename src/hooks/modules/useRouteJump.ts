/**
 * @about before route jump
 */
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { ref } from "vue";

class RouteJump { 
    router = useRouter();
    private current_router: string;
    private link_msg: string;

    //构造函数
    constructor(msg: string = "是否退出当前界面？") {
        this.link_msg = msg;
    };
    /** 获取当前页路由 */
    public getCurrentRouter = (): string => {
        this.current_router = this.router.currentRoute.value.path;
        return this.current_router;
    };
    /** 路由跳转之前 */
    public funRouteBefore = (link: string): Boolean => {
        this.getCurrentRouter();
        if (
            this.current_router ==
            "/index/work/IntelligentReview/upload_file_info"
        ) {
            ElMessageBox.confirm(this.link_msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.router.push({
                        path: link,
                    });
                    return true;
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "已取消跳转",
                    });
                });
        } else {
			console.log(link);
            this.router.push({
                path: link,
            });
            return false;
        }
    };
};

/** 传入接口 */
interface IncomingFun {}
/** 传出接口 */
interface Outgoing {
    useRouteBefore: (link: string) => void;
    current_router: any;
    getRouteLink: () => string;
}

const useRouteJump = (
    msg: string = "是否退出当前界面？"
): Outgoing => {
    const router = useRouter();
    // console.log(router.currentRoute.value);

    /** 当前路由地址 */
    const current_router = ref<string>("");

    /** 获取路由地址 */
    const getRouteLink = (): string => {
        current_router.value = router.currentRoute.value.path;
        return current_router.value;
    };

    /** 路由跳转之前 */
    const useRouteBefore = (link: string): Boolean => {
        //获取当前路由
        getRouteLink();

        if (
            current_router.value ==
            "/index/work/IntelligentReview/upload_file_info"
        ) {
            ElMessageBox.confirm(msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    router.push({
                        path: link,
                    });
                    return true;
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "已取消跳转",
                    });
                });
        } else {
            router.push({
                path: link,
            });

            return false;
        }
    };

    return {
        useRouteBefore,
        current_router,
        getRouteLink,
    };
};

export { RouteJump, useRouteJump };
