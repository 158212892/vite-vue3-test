<template>
  <div class="my-breadcrumb">
    <i class="img-br"></i>
    <span class="title">您所在的位置：</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="{ path: item.path }">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadcrumbs: [],
    };
  },
  mounted() {
    this.reduceArr(this.$route.matched);
  },
  methods: {
    //   筛选重复数组对象
    reduceArr(arrObj) {
      var obj = {};
      let arr = arrObj.reduce(function (item, next) {
        if (!obj[next.meta.title]) {
          item.push(next);
          obj[next.meta.title] = true;
        }
        return item;
      }, []);
      this.breadcrumbs = arr;
    },
  },
  watch: {
    $route(newVal) {
      this.reduceArr(newVal.matched);
    },
  },
};
</script>
<style lang="scss" scoped>
.my-breadcrumb {
  font-size: 0.16rem;
  padding: 10px 0 0 20px;
  .img-br {
    width: 9px;
    height: 12px;
    margin-right: 5px;
    display: inline-block;
    background: url("../assets/images/img-br.png");
    background-size: 100% 100%;
  }
  .title {
    vertical-align: text-top;
    line-height: 1;
  }
  .el-breadcrumb {
    font-size: 12px !important;
    display: inline-block;
  }
  .el-breadcrumb__separator {
    margin: 0 2px !important;
  }
}
</style>