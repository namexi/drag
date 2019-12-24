<template>
  <div>
    <div class="configuration-header">
      <div>
        <el-button size="small" icon="el-icon-download" @click="handelImport"
          >导入模板</el-button
        >
      </div>

      <div class="right">
        <el-button size="small" @click="dialogVisible = true">预览</el-button>
        <el-button size="small" type="primary" @click="handelSave"
          >保存</el-button
        >
      </div>
    </div>
    <div class="configuration-main">
      <div class="left">
        <ksaas-drag-ele
          v-for="(basicComponents, i) in dargComponents"
          :key="i"
          :basicComponents="basicComponents"
          title="basicComponents.title"
          :checkMove="() => true"
        ></ksaas-drag-ele>
      </div>
      <div class="main-connect">
        <ksaas-drag-placement
          v-model="dragForm"
          :handleSelected="handleSelected"
          :handleAdd="handleAdd"
          :handleMove="handleMove"
        ></ksaas-drag-placement>
      </div>
      <div class="right" v-if="true">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="模版属性">
            <KsaasFieldsConfig :data.sync="fieldsConfig" :list="list1"></KsaasFieldsConfig>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
            title="预览"
            :visible.sync="dialogVisible"
            :fullscreen="true"
            center
    >
    <layoutConfigDialog v-model="dragForm"></layoutConfigDialog>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {Getter, State} from "vuex-class";
import { layoutComponents } from "@/data/config.ts";
import { deepCopy } from "@/tool/utils/function.ts";
import dragPlacement from "./dragConfigurations.vue";
import {_saveFrom,_getFrom,_savePreviewFrom, _getPreviewFrom, _putFrom, _putPreviewFrom} from '@/api/app'
import layoutConfigDialog from './layoutConfigDialog.vue'

// let newArr:Array<any> = []
@Component({
  components: {
    KsaasFieldsConfig: () => import("./fieldsConfig.vue"),
    KsaasDragPlacement: dragPlacement,
    layoutConfigDialog
  },
  watch:{
    dragForm:{
      deep:true,
      handler(v1,v2){
        // console.log(v1)
      }
    }
  }
})
export default class Configurations extends Vue {
  @Getter getFormName:any;
  @Getter getAre:any;
  dargComponents: any = null;
  dragForm: Array<any> = [];
  activeName: any = null;
  fieldsConfig: any = null;
  list:Array<any> = [];
  list1:Array<any> = [];
  dialogVisible:any = false;
  formId:any=null;
  toolsSplit(arr:Array<any> = [],newArr:Array<any> = []):Array<any> {
   for (let i =0; i< arr.length; i++ ) {
     newArr.push(arr[i])
   }
    return newArr
  }
  handelImport() {}
  handelSave() {
    const { dragForm } = this;
    let data: any = null;
    if (dragForm.length > 0) {
      const { plotArea, name } = dragForm[0];
      data = {
        name,
        plotArea,
        list: [...dragForm[0].columns[0].children]
      };
    }
    if (this.formId) {
      _putFrom({...data,componentName:'combinTemplate',area:this.getAre,formName:this.getFormName},this.formId).then(
              res =>{
                if (res.status) {
                  _putPreviewFrom({
                    formData:this.dragForm,
                    name:this.getFormName
                  },this.formId).then(res => {
                    if (res.status) this.$Message({
                      message:res.message,
                      type: "success"
                    })
                    this.$router.push('temp')
                  })
                }
              }
      )
    } else {
      _saveFrom({...data,componentName:'combinTemplate',area:this.getAre,formName:this.getFormName}).then((res:any) => {
        if (res.status) {
          let _id = res.data._id;
          _savePreviewFrom({
            formData:this.dragForm,
            _id,
            name:this.getFormName
          }).then(res => {
            if (res.status) this.$Message({
              message:res.message,
              type: "success"
            });
            this.dragForm = []
          });

        }
      });
    }
  }
  handleClick() {}
  handleAdd(v:any){
    this.toolsSplit(v,this.list);
    console.log(this.list,'添加后的单元')
  }
  handleMove(v:any,data:any) {
    // let columsI=arguments[0];
    // let columnsChildI = arguments[2];
    // let ChildI = arguments[3];
    // let dataI = arguments[1];
    // let data;
    // let arr;
    // let moveSlecet = this.dragForm[columsI].columns[columnsChildI].children[ChildI];
    // if (arguments[arguments.length-2] >0) {
    //   let ChildIs = arguments[arguments.length-1];
    //   // data = moveSlecet.children[ChildI].list
    //   // console.log(this.dragForm[columsI].columns[columnsChildI].children[ChildI].children[ChildIs].list)
    //   arr = this.dragForm[columsI].columns[columnsChildI].children[ChildI].children[ChildIs].list.splice(dataI,1)
    // } else {
    //   // data = moveSlecet.list
    //   arr = this.dragForm[columsI].columns[columnsChildI].children[ChildI].list.splice(dataI,1)
    // }
    // 删除要删除源数据
    let arr = data.splice(v,1);
    // 删除没有更改原始数据
    console.log(this.list,'执行了删除操作');
    let {list} = this;
    let arrFn = (el:any) => el.formId === arr[0].formId;
    let index =  list.findIndex(arrFn);
    if(index !== -1) this.list.splice(index,1);
    for (let i = 0; i<this.list.length; i++){
      for(let j=i+1; j<this.list.length; j++){
        if (this.list[i].formId === this.list[j].formId) {
          this.list.splice(i,1);
          j--
        }
      }
    }
    console.log(this.list,'删除后的list',data)
    this.fieldsConfig = {
      right:{
        components: null
      }
    }
  }
  handleSelected(v: any, data: any) {
    this.fieldsConfig = data;
    if (this.formId) {
      this.list.push(data)
    }
    console.log(this.list,'当前选中元素')
    // 删除重复元素
    for (let i = 0; i<this.list.length; i++){
      for(let j=i+1; j<this.list.length; j++){
        if (this.list[i].formId === this.list[j].formId) {
          this.list.splice(i,1);
          j--
        }
      }
    }
    // 排除自己
    this.list1 = this.list.filter(item =>{
      return item.formId !== data.formId
    })
    console.log(this.list1,'我是筛选后的右侧选择的')
  }
  created() {
    this.dargComponents = deepCopy(layoutComponents);
    _getFrom('componentName=KssForm').then(res => {
      if (res.status) {
        this.$set(this.dargComponents[1].list,0, {...this.dargComponents[1].list[0],list:res.data.list});
        // console.log(this.dargComponents[1].list[0])
      }
    });
    this.formId = sessionStorage.getItem("formId");
    if (this.formId) {
      _getPreviewFrom(this.formId).then(res =>{
        if (res.status) {
          this.dragForm = res.data.formData;
          this.$store.dispatch('app/setFormName', res.data.name)
        }
      })
    } else {
      this.$store.dispatch('app/setFormName', '未命名表名')
    }
  }
  destroyed() {
    // this.formId = sessionStorage.getItem("formId");
    if (this.formId) {
      sessionStorage.removeItem("formId");
      // this.basicComponents.list = layoutComponents.list;
    }
  }
}
</script>

<style scoped></style>
