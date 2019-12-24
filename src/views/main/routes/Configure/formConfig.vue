<template>
  <el-form label-suffix=":" label-position="top" size="mini">
    <el-form-item label="布局">
      <el-radio-group v-model="dataRido">
        <el-radio-button :label="24">单列</el-radio-button>
        <el-radio-button :label="12">双列</el-radio-button>
        <el-radio-button :label="8">三列</el-radio-button>
        <el-radio-button :label="6">四列</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签对齐">
      <el-radio-group v-model="labelPosition">
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="left">左对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "formConfig",
  model: {
    prop: "data",
    event: "change"
  },
  props: ["data"],
  computed: {
    dataRido: {
      get() {
        return this.data.col;
      },
      set(v) {
        this.$emit("change", {...this.data, col: v});
      }
    },
    labelPosition:{
      get() {
        return this.data.labelPosition;
      },
      set(v) {
        this.$emit("change", {...this.data,labelPosition:v});
      }
    }
  }
};
</script>

<style scoped></style>
