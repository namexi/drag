<template>
  <div>
    <ksaas-config-item :data="data">
      <el-form-item label="类型">
        <el-select v-model="data.options.multiple" @change="handledMultiple">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="占位内容">
        <el-input
          v-model="data.options.placeholder"
          placeholder="请输入表单占位内容"
        ></el-input>
      </el-form-item>
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
          <el-button type="text" @click="dialogVisible = true">批量编辑</el-button>
        </el-form-item>
      </div>
      <div v-if="value">
        <el-form-item label="字典选择">
          <el-select v-model="remoteOptions" @change="handelChange">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </ksaas-config-item>
    <el-form-item label="是否可搜索">
      <el-switch
        v-model="data.options.filterable"
        active-color="#13ce66"
        inactive-color="#BBC5CA"
      >
      </el-switch>
    </el-form-item>
    <KsaasBatchediting v-model="dialogVisible" :list="data.children.options" :handleSave="handleSave"></KsaasBatchediting>
    <el-dialog title="输入字典名称" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="字典名称">
          <el-input v-model="form.name" autocomplete></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handleSave1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {_getDictionary, _saveDictionary} from '@/api/app.ts'
export default {
  name: "fieldsSelect",
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
      form: {
        name:''
      },
      value: false,
      dialogVisible: false,
      dialogFormVisible1:false,
      options: [
        {
          value: false,
          label: "单选"
        },
        {
          value: true,
          label: "多选"
        }
      ],
      options1: [
        {
          value: false,
          label: "自定义"
        },
        {
          value: true,
          label: "字典"
        }
      ],
      options2: [
        {
          label: "",
          value: ""
        }
      ],
      remoteOptions:null
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
    handledMultiple(v) {
      if (v) return (this.data.options.defaultValue = []);
      return (this.data.options.defaultValue = "");
    },
    handledOptions(v){},
    handleSave(v){
      console.log(v);
      this.dialogFormVisible1 = true
    },
    handleSave1(){
      this.dialogFormVisible1 = false;
      let {name} = this.form;
      let { options } = this.data.options
      _saveDictionary({name, data: options}).then(res =>{
        if (res.status) {
          this.$Message({
            message: `${res.message}`,
            type: "success"
          });
          let { id } = res.data
          this.data.options.dictionaryId = id
        }
      })
    },
    handelChange(v){
      this.remoteOptions = v.name;
      if (v.data || v.data.length > 0) {
        this.data.children.options = v.data
      }
      this.data.options.dictionaryId = v._id
    }
  },
  created() {
    _getDictionary().then(
            res => {
              if (res.status) {
                this.options2 = res.data;
                // console.log(res.data)
              }

            }
    )
  }
};
</script>

<style scoped></style>
