<template>
  <div>
    <ksaas-config-item :data="data">
      <el-form-item label="类型">
        <el-select v-model="data.options.elType" placeholder="请选择" @change="handledTypes">
          <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
          >
          </el-option>
        </el-select>
    </el-form-item>

      <el-form-item label="占位内容">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="选项设置">
        <el-select v-model="value" placeholder="请选择" @change="handledVales">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-if="value === '1'"
          v-model="data.options.defaultValue"
          prefix-icon="el-icon-date"
          :type="data.options.elType"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="字段权限">
        <el-checkbox v-model="data.options.disabled">不可编辑</el-checkbox>
      </el-form-item>
    </ksaas-config-item>
  </div>
</template>

<script>
export default {
  name: "fieldsDatePicker",
  data() {
    return {
      value: "2",
      value1: "",
      checked: null,
      options: [
        {
          label: "自定义",
          value: "1"
        },
        {
          label: "默认当天",
          value: "2"
        }
      ],
      options1:[
        {
          label:'日期',
          value:'date'
        },
        {
          label:'日期时间',
          value:'datetime'
        }
      ]
    };
  },
  props: ["data"],
  methods:{
    handledTypes(v){
      this.data.options.defaultValue = new Date()
    },
    handledVales(){}
  },
  created() {
    // this.data.options.defaultValue = new Date()
  }
};
</script>
