<template>
  <div>
    <el-form label-position="top" size="mini">
      <component v-bind:is="fieldsConfigComponent" :data="data" :list="list"></component>
    </el-form>
  </div>
</template>

<script>
import { VueComponents, VueComponentsName } from "./fieldsConfig/index.js";

export default {
  name: "fieldsConfig",
  props: {
    data: Object,
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      module: null
    };
  },

  computed: {
    fieldsConfigComponent() {
      let a = this.module;
      return this.$options.components[a];
    }
  },

  components: {
    ...VueComponents
  },

  watch: {
    data: {
      deep: true,
      handler(v) {
        if (!v.right.component) return (this.module = "");
        const a = VueComponentsName.find(el => {
          return el.name === v.right.component;
        });
        this.module = a.name;
      }
    }
  }
};
</script>

<style scoped></style>
