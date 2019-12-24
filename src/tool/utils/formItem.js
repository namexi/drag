/**
 * Created by Xd on 2019/11/27.
 */

export default {
    render(h) {
        // 将插槽内容转化为模板数组
        const slots = Object.keys(this.$slots)
            .reduce((arr, key) => arr.concat(this.$slots[key]), [])
            .map(vnode => {
                vnode.context = this._self;
                return vnode;
            });
        return h(
            this.el ? `el-${this.el}` : "span",
            {
                // domProps: {
                //   value: this.value
                // },
                on: this.$listeners,
                props: this.$props,
                scopedSlots: this.$scopedSlots,
                attrs: this.$attrs
            },
            slots
        );
    },
    model: {
      prop: "value",
      event: "change"
    },
    props: ["el", "value"]
};
