<template>
  <div class="header-content">
    <div class="logo-part">
      <!-- <img src="@/assets/logo-2.png" width="60" height="30" /> -->
      <span>{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginHeader",
  props: {
    title: String
  }
};
</script>
<style scoped>
.header-content {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 6px 0;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 2px #ddd;
  text-align: left;
}
.header-content .logo-part {
  margin-left: 10px;
  font-size: 18px;
  color: #999;
  line-height: 80px;
}

.header-content .logo-part span{
  margin-left: 10px;
  font-size: 30px;
  color: #000;
  line-height: 80px;
}

.header-content .logo-part img {
  vertical-align: middle;
}
</style>