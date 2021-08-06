<script lang="tsx">
import { defineComponent } from 'vue';

import './index.scss';

export default defineComponent({
  props: ['pathMatch'],

  setup(props, context) {
    let aa = ['val1', 'val2'];
    // console.log('setup');
    // return () => (<div>1{aa}</div>);
    return { a: 'hbbujjk', aa };
  },
  render() {
    // console.log('render');
    const { pathMatch, aa } = this;

    let bb = aa.map((val, i) => <li key={i}> {val} </li>);
    return (
      <div class="css-test1">
        <div>test564645</div>
        <div>{pathMatch}</div>
        <ul>{bb}</ul>
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
// @import './index.scss';
.css-test1 {
  background: yellow;
}
</style>
