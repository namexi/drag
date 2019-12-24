<template>
  <div>
    <el-form-item label="设置数据源">
      <el-select
        v-model="data.options.dataFrom"
        @change="handledMultiple"
      >
        <el-option
          v-for="item in options"
          :key="item.modelId"
          :label="item.tableName"
          :value="item.modelName"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="表关联">
      <el-select
        v-model="data.options.templateRelated"
        @change="handledMultiple"
      >
        <el-option
          v-for="item in options1"
          :key="item.formId"
          :label="item.name"
          :value="item.formId"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="行为关联">
      <el-select
        v-model="data.options.templateRelated"
        @change="handledMultiple"
      >
        <el-option
          v-for="item in options2"
          :key="item.formId"
          :label="item.name"
          :value="item.formId"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script lang="ts">
  import {_getDataSource} from '@/api/app'
  import { Component, Vue, Prop } from "vue-property-decorator";
  @Component({
    components: {
    },
    computed:{
      options1:{
        get(){
          return this.list;
        },
        set(v){
          return v
        }
      }
    }
  })
  export default class FieldsCompositeSettings extends Vue {
    @Prop({
      required: true,
      type:Object
    }) private data!: Object;
    @Prop({
      required: false,
      type: Array
    }) private list!: Array<any>;
    options:any= null;
    // options1:any = null;
    options2:any = [{
      formId:"onlyRead",
      name:'只读'
    },{
      formId:'save',
      name: '提交'
  },{
      formId:'directCall',
      name:"直接调用"
    }];
    handledMultiple(){}
    created(){
      this.options1 = this.list;
      _getDataSource().then(res =>{
        console.log(res)
        if (res.status) this.options = res.data
      })
    }
  }
// export default {
//   name: "fieldsCompositeSettings",
//   props: ["data"],
//   data() {
//     return {
//       options: []
//     };
//   },
//   methods: {
//     handledMultiple() {}
//   }
// };
</script>

<style scoped></style>
