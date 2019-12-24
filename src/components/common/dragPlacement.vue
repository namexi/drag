<template>
  <div class="dragplacement-box">
    <div class="drag-placement" v-if="data.list.length === 0">
      <div>点击或拖拽左侧按钮添加字段</div>
    </div>
    <el-form
      :label-width="data.config.labelWidth + 'px'"
      :label-position="data.config.labelPosition"
      :size="data.config.size"
      label-suffix=":"
    >
      <draggable
        group="dragEl"
        ghost-class="ghost"
        animation="200"
        handle=".el-icon-rank"
        :list="data.list"
        @add="handleAdd"
        @end="handleEnd"
        class="drag-placement-main"
      >
        <transition-group name="fade" tag="div" class="drag-form-list">
          <el-form-item
            :span="col"
            v-for="(item, key) in data.list"
            :label="item.name"
            class="drag-el"
            :class="{
              is_req: item.options.required,
              active: dragFormSelect.propsKey === item.propsKey
            }"
            :key="key"
            @click.native.stop="handleClick(key)"
          >
            <span v-if="dragFormSelect.propsKey === item.propsKey">
              <i class="el-icon-rank ps-ab dragEl-icon drag-cursor"></i>
            </span>
            <form-item-hoc
              :el="item.type"
              :type="item.options.elType"
              v-model="item.options.defaultValue"
              :disabled="item.options.disabled"
              :placeholder="item.options.placeholder"
              :options1="item.options"
            >
              <template v-if="item.children">
                <form-item-hoc
                  v-for="(childItem, key) in item.children.options"
                  :el="item.children.type"
                  :key="key"
                  :options="item.options.options"
                  :label="childItem.label"
                  :value="childItem.value"
                  :style="{
                    display: item.options.inline ? 'inline-block' : 'block'
                  }"
                  >{{ childItem.value }}</form-item-hoc
                >
              </template>
            </form-item-hoc>
            <div
              class="ps-ab dragEl-operating"
              v-if="dragFormSelect.propsKey === item.propsKey"
            >
              <i class="el-icon-delete" @click.stop="handelDel(key)"></i>
              <i
                class="el-icon-document-copy"
                @click.stop="handelCopy(key)"
              ></i>
            </div>
          </el-form-item>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import hoc from "@/tool/utils/formItem.js";
export default {
  name: "KsaasDragPlacement",
  model: {
    prop: "dragFormSelect",
    event: "change"
  },
  props: {
    data: Object,
    dragFormSelect: {
      type:Object,
      default: () => ({
        propsKey:''
      })
    },
    handleClick: Function,
    handleAdd: Function,
    handleEnd: Function,
    handelDel: Function,
    handelCopy: Function,
    dragConfigData: Array,
    col: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      dragItem: ""
    };
  },
  methods: {
    // handelCopy(v) {
    //     const { list } = this.data
    //     const propsKey = Date.parse( new Date() ) + '_' + Math.ceil(Math.random() * 99999);
    //     const copyEl = {
    //         ...list[v],
    //         options: {...list[v].options},
    //         propsKey,
    //         right:{
    //             ...list[v].right
    //         }
    //     };
    //     console.log(copyEl)
    //     this.$set(this.data.list, v+1, copyEl );
    //     // this.$set(this.dragConfig, v+1, copyEl );
    //     this.$nextTick(() =>{
    //         this.$emit('change', copyEl)
    //     })
    // }
  },
  components: {
    FormItemHoc: hoc
  }
};
</script>

<style scoped lang="less">
.drag-placement {
  position: absolute;
  width: 300px;
  text-align: center;
  left: 50%;
  margin-left: -150px;
  top: 50%;
  /*margin-top: 45%;*/
}
</style>
