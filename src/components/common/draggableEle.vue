<template>
  <div>
    <div v-for="(item, key) in basicComponents.list" :key="key">
      <div class="title">
        <span>{{ item.title }}</span>
      </div>
      <div class="ele-box">
        <draggable
          :list="item.list"
          tag="ul"
          :group="{ name: item.groupName, pull: 'clone', put: false }"
          ghost-class="ghost"
          :sort="false"
          @start="handleStart"
          @end="handleEnd"
          :move="handleMove"
        >
          <li
            v-for="(items, key1) in item.list"
            :key="key1"
            :class="{ 'drag-cursor': items.types !== 'container' }"
          >
            <template v-if="items.types !== 'container'">
              <common-icon :icon="'icon' + items.icon" class="font-icon"></common-icon
              ><b>{{ items.name }}</b>
            </template>
            <template v-else>
              <img
                :src="require('@/assets/' + items.url + '.png')"
                :alt="items.name"
              />
            </template>
          </li>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KsaasDragEle",
  props: {
    basicComponents: {
      type: Object,
      default: () => ({
        list: []
      })
    },
    title: {
      type: String,
      default: "表单"
    },
    checkMove: {
      type: Function,
      default: () => () => true
    },
    handleEnd: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      // basicComponents
    };
  },
  methods: {
    handleStart(v) {
      console.log(v, "start");
    },
    handleMove(v) {
      return this.checkMove(v);
    }
  },
  mounted() {
  }
};
</script>

<style scoped lang="less">
.title {
  height: 56px;
  line-height: 56px;
  margin-left: 12px;
  span {
    height: 24px;
    line-height: 24px;
    display: inline-block;
    font-size: 16px;
    padding-left: 12px;
    font-weight: 500;
    color: #404351;
    border-left: 4px solid #10a2fc;
  }
}
.ele-box {
  margin-left: 4px;
  .drag-cursor {
    min-width: 120px;
    height: 30px;
    line-height: 30px;
    border: 1px solid rgba(220, 225, 228, 1);
    margin-left: 8px;
    margin-top: 8px;
    /*padding: 0 3px;*/
    border-radius: 4px;
  }
  li {
    display: inline-block;

    .font-icon {
      margin-left: 12px;
      width: 17px;
      height: 15px;
    }

    b {
      font-weight: 400;
      padding-left: 5px;
      /*padding-right: 21px;*/
    }
  }
}
</style>
