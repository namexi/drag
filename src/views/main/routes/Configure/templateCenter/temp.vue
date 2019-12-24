<template>
  <div class="main-table">
    <div class="main-connect">
      <div class="main-ribbon">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 20px;" size="mini" @change="handleChange">
          <el-radio-button label="WorkArea">工作区列表</el-radio-button>
          <el-radio-button label="AuxiliaryArea">辅助区列表</el-radio-button>
        </el-radio-group>
        <div class="ribbon-btn">
          <el-button  icon="el-icon-tickets" size="mini" @click="$router.push('configuration')">创建元件模板</el-button>
          <el-button icon="el-icon-tickets" size="mini" @click="$router.push('configurations')">创建复合模板</el-button>
        </div>
      </div>
      <component  :is="$options.components[tabPosition]" :data="tableData" :handleView="handleView" :handleCreate="handleCreate" :handleClick="handleClick" :handleEdite="handleEdite"></component>
    </div>
    <ConfigDialog
            :dialogVisible.sync="dialogVisible"
            :dragFormList="dragFormList"
            :config="config"
            @dialog="setdialog"></ConfigDialog>
    <el-dialog
            title="预览"
            :visible.sync="dialogVisible1"
            :fullscreen="true"
            center
    >
      <layoutConfigDialog v-model="layoutDragForm"></layoutConfigDialog>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { State, Getter} from "vuex-class";
  import {_getFrom, _deleteFrom, _getPreviewFrom} from '@/api/app'
  import ConfigDialog from '../Configdialog.vue'
  import layoutConfigDialog from '../layoutConfigDialog.vue'

  @Component({
    components: {
      WorkArea:()=> import('./WorkArea.vue'),
      AuxiliaryArea: ()=> import('./AuxiliaryArea.vue'),
      ConfigDialog,
      layoutConfigDialog
    },
    computed:{
      tabPosition:{
        get(){
          return this.area
        },
        set(v){
          this.$store.dispatch('app/setAreaPosition', v)
        }
      }
    }
  })
  export default class Temp extends Vue {
    @State(state => state.app.areaPosition) area:any;
    @Getter getAre:any;
    tableData:Array<any>=[];
    dragFormList:any= null;
    layoutDragForm:any=null;
    config:any = {
        labelPosition:''
    };
    dialogVisible:any = false;
    dialogVisible1:any = false;
    handleClick(row:any,index:any,data:any){ // 删除
      this.$confirm(`确定删除${row.name}？`, `删除模版`, {
        confirmButtonText: "删除",
        confirmButtonClass: "bgdanger",
        type: "error"
      }).then(() => {
          _deleteFrom(row._id).then(res =>{
            if (res.status) {
              data.splice(index, 1);
              // this.initData(this.getAre)
            }
          });
      })
    }
    // tabPosition:string = sessionStorage.getItem("area")|| 'WorkArea';
    handleclick() {}

    handleChange(v:string){
      this.initData(this.getAre)
    }

    handleView(row:any){ // 预览
      if (row.formData.componentName !== 'combinTemplate') {
        this.dialogVisible= true
        const {list,config} = row.formData;
        this.dragFormList= [...list];
        this.config= {...config};
      } else {
        let id =row._id
        _getPreviewFrom(id).then(res =>{
          if (res.status) {
            this.dialogVisible1 =true;
            this.layoutDragForm = res.data.formData
          }
        })
      }
    }

    handleEdite(row:any) { //编辑
      sessionStorage.setItem("formId", row._id);
      // configuration 元件  configurations 复合
      row.formData.componentName === 'combinTemplate'? this.$router.push('configurations') : this.$router.push('configuration')
    }

    handleCreate(row:any) { // 创建至流程
      const formId = row._id;
      const proList ={
        "formId": row._id,
        "qualification": "limit",
        "name": row.name,
        "componentName": row.formData.componentName,
        "icon": row.icon
      };
      this.$confirm(`确定使用[${row.name}]创建流程吗？`, "创建流程", {
        type: "warning"
      })
              .then(() => {
                sessionStorage.setItem("mainList", JSON.stringify(proList));
                this.$router.push("procconfiguration");
              })
              .catch(() => {
                sessionStorage.removeItem("mainList");
              });
    }
    // get isComponent(){
    //   return this.$options.components[this.tabPosition]
    // }
    initData(v:string){
      _getFrom(null,`area=${v}`).then(res =>{
        if (res.status) {
          const {data} = res;
          this.$store.dispatch('app/setServersName',data.serversName)
          this.tableData = data.list
        }
      })
    }
    setdialog(v:any){
      this.dialogVisible=v
    }
    created(){
      this.initData(this.getAre)
    }
  }
</script>

<style scoped lang="less">
  .main-connect{
    padding: 28px 32px;
    .main-ribbon{
      display: flex;

      .ribbon-btn {
        flex: 1;
        text-align: right;
      }
    }
  }
</style>
