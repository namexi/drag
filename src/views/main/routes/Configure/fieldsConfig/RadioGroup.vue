<template>
  <div>
    <ksaas-config-item :data="data">
      <el-form-item label="选项设置">
        <el-select v-model="value" @change="handledOptions">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <div v-if="!value">
        <el-form-item :inline="true">
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
<!--          <el-button type="text" @click="dialogVisible = true">批量编辑</el-button>-->
        </el-form-item>
      </div>
      <div v-if="value">
        <el-form-item label="字典选择">
          <el-select v-model="data.options.remoteOptions">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="布局设置">
        <el-radio-group v-model="data.options.inline" size="small">
          <el-radio-button :label="false">竖排</el-radio-button>
          <el-radio-button :label="true">横排</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </ksaas-config-item>
<!--    <KsaasBatchediting v-model="dialogVisible" :list="data.children.options"></KsaasBatchediting>-->
  </div>
</template>

<script>
export default {
  name: "fieldsRadioGroup",
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
      value: false,
      dialogVisible: false,
      options1: [
        {
          value: false,
          label: "自定义"
        },
        // {
        //   value: true,
        //   label: "字典"
        // }
      ],
      options2: []
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
    },
    handledOptions(v) {}
  }
};
</script>
