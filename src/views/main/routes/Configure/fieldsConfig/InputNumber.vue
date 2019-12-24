<template>
  <ksaas-config-item :data="data">
    <el-form-item label="最小值">
      <el-input type="number" v-model.number="data.options.min"></el-input>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input type="number" v-model.number="data.options.max"></el-input>
    </el-form-item>
    <el-form-item label="步长">
      <el-input type="number" v-model.number="data.options.step"></el-input>
    </el-form-item>
  </ksaas-config-item>
</template>

<script>
export default {
  name: "fieldsInputNumber",
  props: ["data"]
};
</script>

<style scoped></style>
