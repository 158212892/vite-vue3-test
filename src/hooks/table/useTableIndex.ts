/**
 * @about table 序号格式化 子级式
 *  1,
 *  1-1,
 *  1-2,
 *  ...
 *  @createTime 2021/12/8 10:22
 *  @author why
 */

import { computed } from "vue";

/** 传入接口 */
interface propsType {
  tableData: Array<any>;
  search_form: {
    current: number;
    size: number;
  };
}

const useTableIndexFormat = (props: propsType, /** 单个item 子级key */children_key: string) => {
  const useFormatTableIndex = computed(() => {
    return function (index: number, row: { oid: string }): string {
      if (props.tableData.length && row.oid) {
        let formatIndex: string = "";
        for (let i: number = 0; i < props.tableData.length; i++) {
          if (row.oid == props.tableData[i].oid) {
            formatIndex = i + 1 + (props.search_form.current - 1) * props.search_form.size + "";
            break;
          } else {
            for (let b: number = 0; b < props.tableData[i][`${children_key}`].length; b++) {
              if (row.oid == props.tableData[i][`${children_key}`][b].oid) {
                formatIndex = "<span style='opacity: 0.7;'>&nbsp;&nbsp;&nbsp;&nbsp;" + (i + 1 + (props.search_form.current - 1) * props.search_form.size) + "-" + (b + 1) + "</span>";
                break;
              }
            }
          }
        }
        return formatIndex;
      } else {
        return "";
      }
    };
  });

  return {
    useFormatTableIndex,
  };
};

export { useTableIndexFormat };
