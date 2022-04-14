<script setup>
/**
 * @description 动态渲染表格
 * @author:lgb
 * @property {Array}  tableColumns 表头
 * @property {Array} tableData 表格数据
 *
 */
import {ref} from "vue"
const props = defineProps({
  tableColumns: {
    type: Array,
    default: () => [],
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  tableProps: {
    type: Object,
    default: () => ({}),
  },
});

const tableRef = ref(null);

console.log(props);
defineExpose({ tableRef });
</script>
<template>
  <el-table
    ref="tableRef"
    :data="tableData"
    v-bind="{ ...tableProps }"
    style="width: 100%"
    height="100%"
    border
    stripe
  >
    <!-- v-infinite-scroll="tableProps['v-infinite-scroll']" -->
    <el-table-column
      v-for="(item, i) in tableColumns"
      :key="i"
      :label="item.label"
      :width="item.labelWidth ? item.labelWidth : ''"
      :type="item.type"
      :align="item.align"
      :prop="item.prop"
    >
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>
// :deep(.el-table) {
//   .el-table__header-wrapper,
//   .el-table__fixed-header-wrapper {
//     th {
//       word-break: break-word;
//       color: #ffffff;
//       // height: 40px;
//       font-size: 13px;
//       padding: 4px 0;
//       background-color: #409eff;
//       .cell {
//         padding: 0;
//       }
//     }
//   }
//   .el-table__body-wrapper {
//     .el-button [class*="el-icon-"] + span {
//       margin-left: 1px;
//     }
//     td {
//       padding: 0;
//       .cell {
//         padding: 0;
//         line-height: 40px;
//       }
//     }
//     .el-form-item {
//       padding: 0;
//       margin: 0;

//       .el-input .el-input__inner {
//         // border-color: transparent;
//       }
//     }
//     .el-form-item__label {
//       // padding: 0 0 0 12px;
//     }
//   }
// }
</style>
