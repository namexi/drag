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
          ref="dragForm"
          :data="dragForm"
          :dragConfigData="dragConfig"
          v-model="dragFormSelect"
          :handleClick="handleClickEl"
          :handleAdd="handleAdd"
          :handleEnd="handleEnd"
          :handelDel="handelDel"
          :handelCopy="handelCopy"
        ></ksaas-drag-placement>
      </div>
      <div class="right">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="字段属性">
            <KsaasFieldsConfig :data.sync="fieldsConfig"></KsaasFieldsConfig>
          </el-tab-pane>
          <el-tab-pane label="表单属性">
            <Ksaas-form-config
              v-model="dragForm.config"
              v-if="dragForm.list.length"
            ></Ksaas-form-config>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <config-dialog
      :dialogVisible.sync="dialogVisible"
      :dragFormList="dragForm.list"
      :config="dragForm.config"
      @dialog="setdialog"
    ></config-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {Getter} from "vuex-class";
import { basicComponents } from "@/data/config";
import { deepCopy } from "@/tool/utils/function";
import ConfigDialog from "./Configdialog.vue";
import {_saveFrom,_savePreviewFrom,_getPreviewFrom, _putFrom, _putPreviewFrom} from '@/api/app'

@Component({
  components: {
    KsaasFieldsConfig: () => import("./fieldsConfig.vue"),
    KsaasFormConfig: () => import("./formConfig.vue"),
    ConfigDialog
  }
})
export default class Configuration extends Vue {
  @Getter getFormName:any;
  @Getter getAre:any;
  dargComponents = basicComponents;
  dragForm: any = {
    list: [],
    config: {
      labelWidth: 100,
      labelPosition: "right",
      size: "small",
      col: 24
    },
    formName: this.getFormName
  };
  dragConfig: any = null;
  dragFormSelect: any = {
    propsKey: null
  };
  fieldsConfig: any = null;
  activeName: any = null;
  dialogVisible: boolean = false;
  formId:any = null;
  handelImport() {}
  handelPreview() {}
  handelSave() {
    this.dragForm.formName = this.getFormName;
    // _saveFrom({...this.dragForm,componentName:'KssForm',area:this.getAre}).then((res:any) => {
    //   console.log(res)
    // })
    if (this.formId) {
      _putFrom({...this.dragForm,componentName:'KssForm',area:this.getAre},this.formId).then(
              res =>{
                if (res.status) {
                  _putPreviewFrom({
                    formData:this.dragForm,
                    name:this.getFormName
                  },this.formId).then(res => {
                    if (res.status) this.$Message({
                      message:res.message,
                      type: "success"
                    });
                    this.$router.push('temp')
                  })
                }
              }
      )
    } else {
      _saveFrom({...this.dragForm,componentName:'KssForm',area:this.getAre}).then((res:any) => {
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
            this.dragForm.list = []
            this.$store.dispatch('app/setFormName', '未命名表名');
          });

        }
      });
    }

      // console.log(this.dragForm)
  }
  handleAdd(v: any) {
    const newIndex = v.newIndex;
    const propsKey = Date.parse(new Date()) + Math.ceil(Math.random() * 99999);
    this.$set(this.dragForm.list, newIndex, {
      ...this.dragForm.list[newIndex],
      propsKey: `prop${propsKey}`
    });

    // 接受后深拷贝
    this.dragConfig = deepCopy(this.dragForm.list);
    this.dragForm.list = [...this.dragConfig];
    this.dragFormSelect = this.dragForm.list[newIndex];
    this.fieldsConfig = this.dragConfig[v.newIndex];
  }
  handleEnd(v: any) {
    this.dragConfig = deepCopy(this.dragForm.list);
    this.dragForm.list = [...this.dragConfig];
    this.fieldsConfig = this.dragConfig[v.newIndex];
    return true;
  }
  handelDel(v: any) {
    this.dragForm.list.splice(v, 1);
    const len = this.dragForm.list.length;
    this.fieldsConfig = len >= 1 ? this.dragForm.list[len - 1] : { right: {} };
    this.dragFormSelect = this.dragForm.list[len - 1];
  }
  handleClickEl(v: number) {
    this.dragFormSelect = this.dragForm.list[v];
    this.dragConfig = deepCopy(this.dragForm.list);
    this.dragForm.list = [...this.dragConfig];
    this.fieldsConfig = this.dragConfig[v];
  }
  handleClick() {}
  handelCopy(v: number) {
    const { list } = this.dragForm;
    const propsKey = Date.parse(new Date()) + Math.ceil(Math.random() * 99999);
    const copyEl = {
      ...list[v],
      options: { ...list[v].options },
      propsKey: `prop${propsKey}`,
      right: {
        ...list[v].right
      }
    };
    // this.$set(this.dragForm.list, v+1, copyEl );

    list.splice(v, 0, copyEl);
    this.dragConfig.splice(v, 0, copyEl);
    this.dragFormSelect = list[v + 1];
    this.dragForm.list = [...this.dragConfig];
    this.fieldsConfig = this.dragConfig[v + 1];
  }
  setdialog(v: boolean) {
    this.dialogVisible = v;
  }
  created() {
    this.formId = sessionStorage.getItem("formId");
    if (this.formId) {
      _getPreviewFrom(this.formId).then(res =>{
        if (res.status) {this.dragForm = res.data.formData;this.$store.dispatch('app/setFormName', res.data.name)}
      })
    } else {
      this.$store.dispatch('app/setFormName', '未命名表名')
    }
  }
  destroyed() {
    this.formId = sessionStorage.getItem("formId");
    if (this.formId) {
      sessionStorage.removeItem("formId");
      // this.basicComponents.list = layoutComponents.list;
      this.formId = null;
    }
  }
  // @Watch('dragForm',{ immediate: true, deep: true })
  // changedragForm(val: any, oldVal:any){
  //     const { list } = val;
  //    if (list) {
  //        this.dragConfig = deepCopy(list);
  //    }
  // }
}
</script>

<style scoped></style>
