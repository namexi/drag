<template>
  <div>
    <ksaas-config-item :data="data">
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
      <!--      <el-form-item :inline="true" label="选项设置">-->
      <!--        <div-->
      <!--          v-for="(domain, index) in dynamicValidateForm.domains"-->
      <!--          :key="domain.key"-->
      <!--        >-->
      <!--          <el-input-->
      <!--            v-model="domain.value"-->
      <!--            :placeholder="'选项' + index"-->
      <!--          ></el-input-->
      <!--          ><el-button-->
      <!--            type="text"-->
      <!--            icon="el-icon-delete"-->
      <!--            @click.prevent="removeDomain(domain)"-->
      <!--          ></el-button>-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item>-->
      <!--        <el-button type="text" @click="addDomain">添加选项</el-button>-->
      <!--      </el-form-item>-->
    </ksaas-config-item>
    <!--    <el-form-item label="布局设置">-->
    <!--      <el-radio-group v-model="checkboxGroup3" size="small">-->
    <!--        <el-radio-button label="1">单列</el-radio-button>-->
    <!--        <el-radio-button label="2">双列</el-radio-button>-->
    <!--      </el-radio-group>-->
    <!--    </el-form-item>-->
  </div>
</template>

<script>
export default {
  name: "fieldsTextareaInput",
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
      },
      checkboxGroup3: null,
      radio:'1'
    };
  },
  methods: {
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>
