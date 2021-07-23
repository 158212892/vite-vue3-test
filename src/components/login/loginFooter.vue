<template>
  <div class="footer">
    <p class="footer-msg">
      ©CopyRight 2020-2020 XX有限公司 版权所有
    </p>
  </div>
</template>
<script>
export default {
  name: "loginFooter",
  props: {}
};
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 20px 0;
  width: 100%;
  background-color: rgb(13, 116, 219);
}

.footer .footer-msg {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-size: 1.08rem;
  color: #fff;
}

.footer .footer-msg a {
  color: #428bca;
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>