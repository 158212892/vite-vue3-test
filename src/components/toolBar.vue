<!-- @author Shiyn/   huangmx 20200807优化-->
<template>
  <div class="top-right-btn">
    <el-row>
      <el-tooltip
        class="item"
        effect="dark"
        :content="showSearch ? '隐藏搜索' : '显示搜索'"
        placement="top"
      >
        <el-button circle :icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle :icon="Refresh" @click="refresh()" />
      </el-tooltip>
    </el-row>
  </div>
</template>
<script setup>
import { Search, Refresh } from "@element-plus/icons-vue";
const props = defineProps({
  showSearch: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:showSearch", "queryTable"]);

//搜索
const toggleSearch = () => emit("update:showSearch", !props.showSearch);

//刷新
const refresh = () => emit("queryTable");
</script>
