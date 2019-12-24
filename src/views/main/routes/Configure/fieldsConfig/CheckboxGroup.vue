<template>
  <div>
    <ksaas-config-item :data="data">
      <el-form-item label="占位内容">
        <el-input
          v-model="data.options.placeholder"
          placeholder="请输入表单占位内容"
        ></el-input>
      </el-form-item>
      <el-form-item :inline="true" label="选项设置">
        <div
          v-for="(domain, index) in data.children.options"
          :key="domain.key"
        >
          <el-input
            v-model="domain.value"
            :placeholder="'选项' + index"
          ></el-input
          ><el-button
            type="text"
            icon="el-icon-delete"
            @click.prevent="removeDomain(domain)"
          ></el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="addDomain">添加选项</el-button>
      </el-form-item>
    </ksaas-config-item>
    <el-form-item label="布局设置">
      <el-radio-group v-model="data.options.inline" size="small">
        <el-radio-button :label="false">竖排</el-radio-button>
        <el-radio-button :label="true">横排</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script >
  // import {_getDictionary, _saveDictionary} from '@/api/app.ts'
export default {
  name: "fieldsCheckboxGroup",
  props: ["data"],
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        email: ""
      }
    };
  },
  methods: {
    removeDomain(item) {
      var index = this.data.children.options.indexOf(item);
      if (index !== -1) {
        this.data.children.options.splice(index, 1);
      }
    },
    addDomain() {
      this.data.children.options.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

<style scoped></style>
