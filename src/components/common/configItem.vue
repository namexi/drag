<template>
  <div>
    <el-form-item label="标题">
      <el-input v-model="data.name" />
    </el-form-item>
    <slot></slot>
    <el-form-item label="校验" v-if="!required">
      <el-checkbox v-model="data.options.required" @change="handleChange">必填</el-checkbox>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "KsaasConfigItem",
  data() {
    return {
      value: "",
      value1: "",
      options: [
        {
          label: "自定义",
          value: "1"
        },
        {
          label: "默认值",
          value: "2"
        }
      ]
    };
  },
  props: ["data","required"],
  methods:{
    handleChange(v){
      if (v) return this.data.rules=
      { "required": true, "message": `${this.data.name}必须填写` };
      return this.data.rules = []
    }
  }
};
</script>
