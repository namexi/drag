<template>
  <el-dialog
    title="预览"
    :visible.sync="dialogVisible1"
    :fullscreen="true"
    center
  >
    <el-form
      :model="{ list }"
      :label-position="config.labelPosition"
      :label-width="config.labelWidth + 'px'"
      label-suffix=":"
    >
      <el-row>
        <el-col :span="config.col" v-for="(item, key) in list" :key="key">
          <el-form-item
            :prop="'list.' + key + '.options' + '.defaultValue'"
            :label="item.name"
            class="drag-el"
            :key="key"
            :rules="item.rules"
          >
            <form-item-hoc
              :el="item.type"
              :type="item.options.elType"
              :props="item.options.props"
              :options="item.options.options"
              :options1="item.options"
              v-model="item.options.defaultValue"
              :disabled="item.options.disabled"
              :placeholder="item.options.placeholder"
              :multiple="item.options.multiple"
              :filterable="item.options.filterable"
            >
              <template v-if="item.children">
                <form-item-hoc
                  v-for="(childItem, key) in item.children.options"
                  :el="item.children.type"
                  :key="key"
                  :label="childItem.label"
                  :value="childItem.value"
                  :style="{
                    display: item.options.inline ? 'inline-block' : 'block'
                  }"
                  >{{ childItem.value }}</form-item-hoc
                >
              </template>
            </form-item-hoc>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import FormItemHoc from "@/tool/utils/formItem.js";
export default {
  name: "ConfigDialog",
  data() {
    return {
      models: {},
      list: null
    };
  },
  components: {
    FormItemHoc
  },
  props: ["dragFormList", "config", "dialogVisible"],
  computed: {
    dialogVisible1: {
      get() {
        return this.dialogVisible;
      },
      set(v) {
        this.$emit("dialog", v);
      }
    }
  },
  methods: {
    fromModle(list) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const key = item.propsKey;
        const { defaultValue } = item.options;
        if (key) this.models[key] = defaultValue;
      }
    }
  },
  watch: {
    dragFormList: {
      handler(val) {
        if (val.length > 0) {
          this.models = {
            list: val
          };
          this.list = val;
        }
      },
      deep: true
    }
  },
  created() {
    console.log(this.dialogVisible1)
  }
};
</script>

<style scoped></style>
