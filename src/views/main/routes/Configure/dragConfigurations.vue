<template>
  <div class="dragplacement-box">
    <div class="drag-placement" v-if="dragData.length === 0">
      <div>拖拽左侧布局容器</div>
    </div>
    <draggable
      v-model="dragData"
      group="dragEl"
      v-bind="{
        group: 'dragEl',
        ghostClass: 'ghost',
        animation: 200,
        handle: '.drag-widget'
      }"
      class="drag-placement-main"
    >
      <transition-group
        name="fade"
        tag="div"
        class="drag-form-list"
        v-for="(items, index) in data"
        :key="index"
      >
        <!--        第一层-->
        <layout-container-hoc
          :el="item.type"
          v-for="(item, key) in items.columns"
          :key="key + index"
          class="drag-el"
          :class="item.className"
        >
          <!--          第二层-->
          <draggable
            v-for="(children, childrenIndex) in item.children"
            v-model="children.list"
            :tag="'el-' + children.type"
            :style="children.style"
            v-bind="{
              group: children.groupName,
              ghostClass: 'ghostHeader',
              animation: 200
            }"
            :key="childrenIndex"
            @add="handleAdd(children.list)"
          >
            <template v-if="!children.children">
                            <span
                              style="{display: inline-block; text-align: center; width: 90%; position: absolute; color: #FFFFFF; font-weight: 700;}"
                              >{{ children.connect }}</span
                            >
              <layout-container-hoc
                v-for="(childrenItem, childrenI) in children.list"
                :key="childrenI"
                :el="childrenItem.type"
                :style="children.options"
                class="drag-container"
                @click="handleSelected(childrenI, childrenItem)"
                >{{ childrenItem.name }}
<!--                @click="handleMove(index,childrenI, key ,childrenIndex)"-->
                <i
                  class="el-icon-circle-close dragDel"
                  @click.stop="handleMove(childrenI, children.list)"
                ></i
              ></layout-container-hoc>
            </template>
            <!--         第三层嵌套   -->
            <draggable
              v-else
              v-for="(comp, i) in children.children"
              v-model="comp.list"
              :tag="'el-' + comp.type"
              :style="comp.style"
              v-bind="{
                group: comp.groupName,
                ghostClass: 'ghost',
                animation: 200
              }"
              :key="i"
              @add="handleAdd(comp.list)"
            >
              <span
                style="{
                display: inline-block;
                position: absolute;
                right: 0;
                margin:auto;
                top: 0;left: 0;
                paddingTop: 50%;
                right:0;
                bottom: 0;
                color: #FFFFFF;
                font-weight: 700;
                }"
                >{{ comp.connect }}</span
              >
              <layout-container-hoc
                v-for="(compItem, itemI) in comp.list"
                :key="itemI"
                :el="compItem.type"
                :style="comp.options"
                class="drag-container"
                @click="handleSelected(itemI, compItem)"
                >{{ compItem.name }}
<!--                @click="handleMove(index,itemI, key,childrenIndex,i)"-->
                <i
                  class="el-icon-circle-close dragDel"
                  @click.stop="handleMove(itemI,comp.list)"
                ></i
              ></layout-container-hoc>
              <!--              <span v-if="!children.children">{{ children.connect }}</span>-->
            </draggable>
          </draggable>
        </layout-container-hoc>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
// import LayoutContainerTemp from "./LayoutContainerTemp";
import hoc from "@/tool/utils/formItem.js";

export default {
  name: "dragPlacement",
  data() {
    return {
      list: []
    };
  },
  model: {
    prop: "data",
    event: "drag"
  },
  props: {
    data: Array,
    handleSelected: {
      type: Function,
      default: () => () => {}
    },
    handleAdd:{
      type: Function,
      default: () => () => {}
    },
    handleMove:Function
  },
  components: {
    // LayoutContainerTemp
    LayoutContainerHoc: hoc
  },
  computed: {
    dragData: {
      get() {
        return this.data;
      },
      set(v) {
        this.$emit("drag", v);
      }
    }
  }
};
</script>

<style scoped lang="less">
.dragplacement-box .drag-placement-main .drag-form-list .drag-el {
  margin: 16px;
  height: calc(100% - 32px);
  padding: 16px;
  width: calc(100% - 32px);
}
.dragplacement-box .drag-placement-main .drag-form-list .drag-el:hover {
  background: rgba(255, 255, 255, 0);
}
/*.list-complete-item {*/
/*  width: 60px;*/
/*  .drag-el {*/
/*    padding: 1px 1px 1px 1px;*/
/*  }*/
/*}*/
</style>
