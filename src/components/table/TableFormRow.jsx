/**
 *! @property tableColumns 渲染表头来源
 *! @property tableData 数据来源
 * @property rules 校验规则来源
 *
 * @property children 渲染子级表头来源
 * @property type 走默认渲染： index（index/数字/方法）===序号，selection===复选框，expand===展开按钮;
 * @property type 走插槽渲染： label===纵向标签，value===值
 *
 * todo 行编辑卡顿，多行保存显示问题，单元格编辑
 */

import { ref, defineComponent, reactive, getCurrentInstance } from "vue";
import "./TableFormRow.scss";

// 数据格式化
function valueFormat(val, type, toFixed, unit) {
  switch (type) {
    case "number":
      return numberFormat(val, toFixed, unit);
    case "money":
      return moneyFormat(val, toFixed, unit);
    default:
      return val;
  }
}

// 格式化数据--限制输入数字
export function numberFormat(val, toFixed = 2) {
  // 先把非数字的都替换掉，除了数字和.
  val = val.replace(/[^\d.]/g, ""); // 保证只有出现一个.而没有多个.
  val = val.replace(/\.{2,}/g, "."); // 必须保证第一个为数字而不是.
  val = val.replace(/^\./g, ""); // 保证.只出现一次，而不能出现两次以上
  val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  if (!val && val !== 0) return null;
  return val;
}

// 金额预览--整数千位分隔符
export function moneyFormat(num, toFixed = 4, unit = "") {
  let value = parseFloat(num);
  if (isNaN(value)) return null;
  else {
    value = num.toFixed(toFixed).toString();
    let separatingSymbol = ","; //分隔符
    var numpart = String(value).split(".");
    numpart[0] = numpart[0].replace(
      new RegExp("(\\d)(?=(\\d{3})+$)", "ig"),
      `$1${separatingSymbol || ""}`
    );
    return numpart.join(".") + unit;
  }
}

export default defineComponent({
  inheritAttrs: false,
  name: "TableFormRow",
  props: {
    // 表头
    tableColumns: {
      type: Array,
      default: () => [],
    },
    // 表单
    tableData: {
      type: Array,
      default: () => [],
    },
    // 校验规则
    rules: {
      type: Object,
      default: () => ({}),
    },
    // 表格属性
    tableProps: {
      type: Object,
      default: () => ({}),
    },

    // 表单控制
    formItemSlotConfig: {
      type: Object,
      default: () => ({}),
    },
    // 分页相关-用于计算序号
    pages: {
      type: Object,
      default: () => ({
        current: 1,
        size: 20,
        total: 0,
      }),
    },
  },
  setup: (props, { attrs, emit, slots, expose }) => {
    const formRef = ref();
    const tableRef = ref();

    // 表格内置列
    const defaultColumnTypes = ["index", "selection", "expand"];
    // 表格默认属性
    const defaultTableProps = {
      class: "custom",
      height: "100%",
      style: { width: "100%" },
      highlightCurrentRow: "highlight-current-row",
      border: "border",
      resizable: "resizable",
      stripe: true,
    };
    // 表格列默认属性
    const defaultColumnProps = {
      minWidth: "",
      width: "",
      headerAlign: "center",
      align: "center",
      sortable: false,
      //  showOverflowTooltip: true,
    };
    // 行校验
    const rowValidateField = async (index /*,行index*/) => {
      const fields = Object.keys(props.rules).map(
        (t) => `tableData.${index}.${t}`
      );
      let flag = true;
      await formRef.value.validateField(fields, (valid) => {
        if (!valid) return (flag = false);
      });
      return flag;
    };
    // 获取表插槽
    const getSlot = (scope, t) => {
      switch (t.type) {
        case "label": //纵向标签
          return scope.row[t.prop];
        case "value": //数据
          return (
            <el-form-item
              class={scope.row.isEdit ? "" : "onPreview"}
              rules={props.rules[t.prop] || []}
              prop={`tableData.${scope.$index}.${t.prop}`}
            >
              {getFormItemSlot(scope, t)}
            </el-form-item>
          );
        case "customIndex":
          return (
            scope.$index + 1 + (props.pages.current - 1) * props.pages.size
          );
        // case "" || undefined || null: //默认插槽 废弃
        //   return <>{slots.default?.(scope)}</>;
        default:
          //其他插槽
          return slots[t.type]?.(scope);
      }
    };
    // 获取表单项插槽
    const getFormItemSlot = (scope, t) => {
      //  return console.log(t.formItemSlotConfig?.type);
      if (!t.formItemSlotConfig?.type)
        return (
          <el-input
            placeholder=""
            clearable
            vModel={scope.row[t.prop]}
            disabled={!scope.row.isEdit}
          ></el-input>
        );
      else
        switch (t.formItemSlotConfig.type) {
          case "select":
            return (
              <el-select
                v-model={scope.row[t.prop]}
                clearable
                placeholder=""
                style="width: 100%;"
                disabled={!scope.row.isEdit}
              >
                {(t.formItemSlotConfig.selectArr || []).map((p) => (
                  <el-option
                    key={p[t.formItemSlotConfig.selectValue || "dictValue"]}
                    label={p[t.formItemSlotConfig.selectLabel || "dictLabel"]}
                    value={p[t.formItemSlotConfig.selectValue || "dictValue"]}
                  ></el-option>
                ))}
              </el-select>
            );
          case "cascader":
            return (
              <el-cascader
                options={t.formItemSlotConfig.selectArr || []}
                v-model={scope.row[t.prop]}
                show-all-levels={false}
                disabled={!scope.row.isEdit}
                props={
                  t.formItemSlotConfig.selectProps || {
                    //联级结构配置选项
                    expandTrigger: "hover",
                    checkStrictly: false,
                    children: "children",
                    label: "label",
                    value: "value",
                    emitPath: false,
                  }
                }
                //
                placeholder=""
                clearable
              ></el-cascader>
            );
          // case "date":
          //   return <>{slots.action?.(scope)}</>;
          default:
            return scope.row.isEdit ? (
              <el-input
                type={t.formItemSlotConfig.inputType || "text"}
                placeholder=""
                clearable
                vModel={scope.row[t.prop]}
                onInput={(value) => {
                  // 如果有值
                  if (value) {
                    scope.row[t.prop] = valueFormat(
                      value,
                      t.formItemSlotConfig?.inputValueFormat?.type
                    );
                  } else scope.row[t.prop] = null;
                }}
              ></el-input>
            ) : (
              valueFormat(
                scope.row[t.prop],
                t.formItemSlotConfig?.inputValueFormat?.previewType,
                t.formItemSlotConfig?.inputValueFormat?.toFixed,
                t.formItemSlotConfig?.inputValueFormat?.unit
              )
            );
        }
    };
    // 获取次级列插槽
    const getSubColumn = (arr = []) =>
      arr.map((q, j) => (
        <el-table-column
          key={j}
          label={q.label ? q.label : ""}
          {...defaultColumnProps}
          {...q.columnProps}
          prop={q.prop || ""}
          vSlots={{
            default: (scope) => getSlot(scope, q) || scope.row[q.prop],
            ...q.vSlots,
          }}
        />
      ));

    // 获取表格插槽
    const getTableColumn = (t, i) => (
      <el-table-column
        key={i}
        label={t.label || ""}
        type={t.type}
        {...defaultColumnProps}
        {...t.columnProps} //接收表格列属性
        prop={t.prop || ""}
        vSlots={{
          default: (scope) =>
            t.children?.length ? getSubColumn(t.children) : getSlot(scope, t),
          ...t.vSlots,
        }}
      />
    );

    expose({ formRef, tableRef, rowValidateField });

    return () => (
      <el-form
        ref={formRef}
        model={{ tableData: props.tableData }}
        // rules={{ tableData: props.tableData.map((t) => props.rules) }}
        style={{ height: "100%", width: "100%" }}
      >
        <el-table
          ref={tableRef}
          {...defaultTableProps}
          {...attrs}
          {...props.tableProps} //接收表格属性
          data={props.tableData}
        >
          {props.tableColumns.map((t, i) => getTableColumn(t, i))}
        </el-table>
      </el-form>
    );
  },
});
