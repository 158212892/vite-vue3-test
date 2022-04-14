<script>
/**
 *@description 一个悬浮按钮组件
 */
import { reactive, onMounted, onUnmounted, h } from "vue";
import { camelTo_ } from "@/utils/strTool";
export default {
  name: "JHoverBtn",
  props: {
    bgColor: {
      type: String,
      default: "deepskyblue",
    },
    autoHide: {
      type: Boolean,
      default: true,
    },
    clickDis: {
      type: Number,
      default: 10,
    },
    showWidth: {
      type: Number,
      default: 15,
    },
    width: {
      type: Number,
      default: 80,
    },
    radius: {
      type: Boolean,
      default: true,
    },
    btnStyle: {
      type: Object,
      default: () => {},
    },
    text: {
      default: "悬浮按钮",
    },
    zIndex: {
      type: Number,
      default: 999,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      startX: "",
      startY: "",
      clickStatus: false,
      isClick: true,
    });

    function getStyle(res = "") {
      res += "background-color:" + props.bgColor + ";";
      res += "width:" + props.width + "px;";
      res += "height:" + props.width + "px;";
      // res += "line-height:" + props.width + "px;";
      res += "z-index:" + props.zIndex + ";";
      if (props.radius) {
        res += "border-radius: 50% 50%;";
      }
      let btnStyle = props.btnStyle;
      for (let k in btnStyle) {
        res += camelTo_(k) + ":" + btnStyle[k] + ";";
      }
      return res;
    }
    //阻止默认事件
    function preventEvent() {
      document.getElementById("j-hover-btn").ondragstart = function () {
        return false;
      };
      document.getElementById("j-hover-btn").onselectstart = function () {
        return false;
      };
    }
    function windowPreventEvent() {
      window.ondragstart = function () {
        return false;
      };
      window.onselectstart = function () {
        return false;
      };
    }
    function windowPreventEventCancel() {
      window.ondragstart = null;
      window.onselectstart = null;
    }
    function itemClick(event) {
      state.startX = event.pageX - window.scrollX;
      state.startY = event.pageY - window.scrollY;
      state.clickStatus = true;
      windowPreventEvent();
    }
    //鼠标抬起时
    function handleMouseup(event) {
      if (state.clickStatus) {
        const endX = event.pageX - window.scrollX,
          endY = event.pageY - window.scrollY;
        if (state.isClick) {
          emit("hoverBtnClick");
        } else {
          if (!props.autoHide) return;
          const width = document.body.offsetWidth;
          const height = document.body.offsetHeight;
          const dom = document.getElementById("j-hover-btn");
          if (endX < props.width / 2) {
            dom.style.left = -(props.width - props.showWidth) + "px";
          } else if (endX > width - props.width / 2) {
            dom.style.left = width - props.showWidth + "px";
          }
        }
        state.clickStatus = false;
        state.isClick = true;
        windowPreventEventCancel();
      }
    }

    function handleMouseover(event) {
      if (state.clickStatus) {
        const endX = event.pageX - window.scrollX,
          endY = event.pageY - window.scrollY;
        const dom = document.getElementById("j-hover-btn");
        if (
          Math.abs(endX - state.startX) > props.clickDis ||
          Math.abs(endY - state.startY) > props.clickDis
        ) {
          state.isClick = false;
        }
        dom.style.left = endX - props.width / 2 + "px";
        dom.style.top = endY - props.width / 2 + "px";
      }
    }
    onMounted(() => {
      preventEvent();
      window.addEventListener("mouseup", handleMouseup);
      window.addEventListener("mouseover", handleMouseover);
    });
    onUnmounted(() => {
      // 移除事件
      window.removeEventListener("mouseup", handleMouseup);
      window.removeEventListener("mouseover", handleMouseover);
    });

    return () =>
      h(
        "div",
        {
          class: "j-hover-btn",
          style: getStyle(),
          id: "j-hover-btn",
          onMousedown: itemClick,
        },
        props.text
      );
  },
};
</script>

<style lang="scss" scoped>
.j-hover-btn {
  text-align: center;
  cursor: pointer;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
