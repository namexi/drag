<template>
  <div>
    <ksaas-config-item :data="data">
      <el-form-item label="数据类型">
        <el-select v-model="data.options.dataType" placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="占位内容">
        <el-input
          v-model="data.options.placeholder"
          placeholder="请输入表单占位内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="字段权限">
        <el-checkbox v-model="data.options.disabled">不可编辑</el-checkbox>
      </el-form-item>
      <el-form-item label="回填设置">
        <el-radio v-model="radio" label="1">否</el-radio>
        <el-radio v-model="radio" label="2">是</el-radio>
        <el-select v-if="radio==='2'" v-model="data.options.dataType" placeholder="选择数据源">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </ksaas-config-item>
  </div>
</template>

<script>
export default {
  name: "fieldsInput",
  props: ["data"],
  data(){
    return {
      options:[
        {
        value: 'Number',
        label: '数字'
        },
        { value: 'string',
          label: '字符串'
        }
      ],
      radio:'1'
    }
  }
};
</script>
