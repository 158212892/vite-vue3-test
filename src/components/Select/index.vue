<template>
  <!-- 下拉框 -->
  <div class="myStyle">
    <el-select
      filterable
      clearable
      size="mini"
      v-if="options.length !== 0"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event)"
      :placeholder="placeholder"
    >
      <el-option
        v-for="item in options"
        :key="item[optionVal]"
        :label="item[label] || item"
        :value="item[value] || item"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "MySelect",
  props: {
    options: {
      type: [Array, Number],
      required: true,
    },
    // 绑定value是为了外面也可以传值改变到里面的值双向绑定
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    //optionVal options里面每项对象的值
    optionVal: {
      type: [Number, String],
      default: "optionVal",
    },
    //lable options里面每项对象的标签
    label: {
      type: String,
      default: "lable",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.myStyle {
  .el-input__inner {
    // border: 1px #409eff solid;
  }
  .el-icon-arrow-up:before {
    content: "\e78f";
    font-size: 16px;
    color: #409eff;
  }
}
</style>