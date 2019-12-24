<template>
  <div>
    <ksaas-config-item :data="data">
      <el-form-item label="类型">
        <el-select
          v-model="data.options.props.multiple"
          @change="handledMultiple"
        >
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
        <el-input v-model="data.options.placeholder"></el-input>
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
        <el-form-item>
          <el-button @click="dialogVisible = true" size="medium"
            >设置选项</el-button
          >
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
      <el-form-item label="是否可搜索">
        <el-switch
          v-model="data.options.filterable"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    </ksaas-config-item>
    <ksaas-tree-dialog
      v-model="dialogVisible"
      :list="data.options.options"
      :handleSave="handleSave"
    ></ksaas-tree-dialog>
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

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import {_getDictionary, _saveDictionary} from '@/api/app.ts'

  @Component({
    components: {
    }
  })
  export default class FieldsCascader extends Vue{
    @Prop({
      required: true,
      type:Object
    }) private data!: any;
    dialogVisible = false;
    dialogFormVisible1 = false;
      value = false;
      options = [
        {
          value: false,
          label: "单选"
        },
        {
          value: true,
          label: "多选"
        }
      ];
      options1 = [
        {
          value: false,
          label: "自定义"
        },
        {
          value: true,
          label: "字典"
        }
      ];
      options2= null;
      form= {
        name:''
      };
    remoteOptions=null;
    handledMultiple(v:any) {}
    handledOptions() {}
    handleSave(v:any){
      console.log(v);
      this.dialogFormVisible1 = true

    }
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
    }
    handelChange(v:any){
      this.remoteOptions = v.name;
      if (v.data || v.data.length > 0) {
        this.data.options.options = v.data
      }
      this.data.options.dictionaryId = v._id
    }
    created(){
      _getDictionary('2','true',"cascader").then(
              res => {
                if (res.status) {
                  this.options2 = res.data;
                }
              }
      )
    }
  }
</script>

<style scoped></style>
