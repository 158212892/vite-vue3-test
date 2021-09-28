import {defineComponent, useSlots} from "vue";

export default defineComponent({
    name: "test2",
    inheritAttrs: true,
    props: {},
    setup(props, {slots}) {
        const slotA = <div>{slots.default?.()} </div>
        return function () {
            return new Array(4).fill(<slotA>I'm test2</slotA>);
        };
    },
});


