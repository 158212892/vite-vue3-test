/**
 * @about 关于列表筛选 基础  搜索和重置功能 （重置需要在 state 加 static_form）、及 tab 切换
 * @createTime 2021/9/1 10:30、2021/10/11 14:40
 * @author why
 */

import { ref, onMounted } from "vue";

const useListFilter = (
    state: { search_form: { current?: number,pageNum?:number }; static_form: any },
    getList: () => void
): any => {
    // 搜索
    const getSearch = (): void => {
        if(state.search_form.current) state.search_form.current = 1;
        if(state.search_form.pageNum) state.search_form.pageNum = 1;
        getList();
    };
    // 重置
    const clearData = (): void => {
        state.search_form = Object.assign({}, state.static_form);
        getList();
    };

    return {
        getSearch,
        clearData,
    };
};

//切换 Tab
const useChangeTab = (
    initial: string | number | null = null,
    key: string = "value",
    getList: () => void
): any => {
    const tab_tac = ref<string | number | null>(null);

    const changeTab = (item: { [x: string]: any }): void => {
        tab_tac.value = item[`${key}`];
        getList();
    };

    //初始数据
    onMounted(() => {
        if (initial) {
            tab_tac.value = initial;
        }
    });

    return {
        tab_tac,
        changeTab,
    };
};

export { useListFilter, useChangeTab };
