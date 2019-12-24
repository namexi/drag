<template>
    <div>
        <div class="configuration-header">
            <div>
<!--                <el-button size="small" icon="el-icon-download" @click="handelImport"-->
<!--                >导入模板</el-button-->
<!--                >-->
            </div>

            <div class="right">
                <el-button size="small" @click="dialogVisible = true">预览</el-button>
                <el-button size="small" >提交至审核</el-button>
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
                ></ksaas-drag-placement>
            </div>
            <div class="right" v-if="true">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="权限设置">
                        <KsaasPermissionConfig
                                v-model="pathLabelList"
                        ></KsaasPermissionConfig>
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
    import { Component, Vue } from "vue-property-decorator";
    import {Getter} from 'vuex-class';
    import KsaasFieldsConfig from './fieldsConfig.vue'
    import { proclayoutComponents } from '@/data/config'
    import dragPlacement from "./dragConfigurations.vue";
    import PermissionConfig from "./procConfig/PermissionConfig.vue";
    import {_saveProcesses, _getFrom, _getPreviewFrom} from '@/api/app';
    import layoutConfigDialog from './layoutConfigDialog.vue'
    let v:any = null;
    @Component({
        components: {
            'KsaasDragPlacement':dragPlacement,
            'KsaasPermissionConfig': PermissionConfig,
            KsaasFieldsConfig,
            layoutConfigDialog
        }
    })
    export default class ProcConfig extends Vue {
        @Getter getFormName:any;
        dialogVisible:boolean=false;
        activeName:any="";
        dragForm:Array<any>= [];
        dargComponents:Array<any>=proclayoutComponents;
        fieldsConfig={};
        pathLabelList:any= null;
        findeName(array:Array<any>, value:string) {
            array.forEach(items => {
                if (items.children) return this.findeName(items.children, value);
                if (items.type === value) {
                    v = items;
                }
            });
            return v;
        }
        handleClick(){}
        handelSave(){
            if (this.dragForm[0].columns[0].children[0].list.length === 0 || this.dragForm[0].columns[0].children[1].children[0].list.length=== 0) {
                return this.$notify({
                    title: "不能提交空页面！",
                    message:'',
                    type: 'warning'
                });
            }
            const formArea = this.findeName(this.dragForm[0].columns, "Main");
            const asideArea = this.findeName(this.dragForm[0].columns, "Aside");
            const headerArea = this.findeName(this.dragForm[0].columns, "Header");
            const plotArea = this.dragForm[0].plotArea;
            const authority = this.pathLabelList
                ? this.pathLabelList.map((items:any) => {
                    return {
                        deptName: items.label,
                        deptCode: items.value
                    };
                })
                : [];
            if (
                formArea.list.length === 0 ||
                asideArea.list.length === 0 ||
                headerArea.list.length === 0
            ) {
                return this.$notify.error({
                    title: "所有区域不能为空！",
                    message:''
                });
            }
            _saveProcesses({
                "name": this.getFormName,
                "serviceId" : "bingli", // 全局
                "appId" : "1936ea45afda4165a1672d525980d4ae", // 全局
                "state" : "1",
                formArea,
                asideArea,
                headerArea,
                authority,
                plotArea
            }).then(res => console.log(res))
        }
        handleSelected(){}
        created(){
            _getFrom(null,"area=2").then(res => {
                if (res.status) this.$set(this.dargComponents[0].list,0, {...this.dargComponents[0].list[0],list:res.data.list})
            })
            const MainList:any = sessionStorage.getItem("mainList");
            this.dragForm = [
                {
                        name: "布局容器",
                        types: "container",
                        qualification: "limit",
                        url: "Layout01_Normal",
                        plotArea: "senior1",
                        columns: [
                            {
                                type: "Container",
                                list: [],
                                className: "is-vertical",
                                children: [
                                    {
                                        type: "Header",
                                        groupName: "dragButton",
                                        list: [],
                                        connect: "操作按钮区域",
                                        style: {
                                            // 外层容器样式

                                            // height: "60px",
                                            // color: "#fff",
                                            fontSize: "16px",
                                            fontWeight: 500
                                        },
                                        options: {
                                            // 拖拽元素样式
                                            display: "inline-block",
                                            width: "100px",
                                            lineHeight: "50px",
                                            textAlign: "center",
                                            background: "#fff",
                                            marginRight: "4px",
                                            borderRight: "1px solid #e9eef3"
                                        }
                                    },
                                    {
                                        type: "Container",
                                        list: [],
                                        children: [
                                            {
                                                type: "Aside",
                                                groupName: "dragFeatures",
                                                list: [],
                                                connect: "辅助模板区域",
                                                style: {
                                                    position: "relative",
                                                    width: "224px",
                                                    // color: "#fff",
                                                    fontSize: "16px",
                                                    marginRight: "8px",
                                                    fontWeight: 500
                                                },
                                                options: {
                                                    display: "block",
                                                    marginTop: "8px",
                                                    height: "50px",
                                                    lineHeight: "50px",
                                                    background: "#fff",
                                                    borderBottom: "1px solid #e9eef3"
                                                }
                                            },
                                            {
                                                type: "Main",
                                                list: [],
                                                connect: "主体区域",
                                                style: {
                                                    position: "relative",
                                                    // color: "#fff",
                                                    fontSize: "16px"
                                                },
                                                groupName: "dragFrom",
                                                options: {
                                                    display: "block",
                                                    height: "50px",
                                                    lineHeight: "50px",
                                                    background: "#fff",
                                                    borderBottom: "1px solid #e9eef3"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
            ]
            // if (MainList) {
                let data = JSON.parse(MainList)
                _getPreviewFrom(data.formId).then(res=> {
                    if (res.status) data.formData = res.data.formData
                    this.dragForm[0].columns[0].children[1].children[1].list.push(data)
                })
            // }
            // this.$set(this.dragForm[0].columns[0].children[1].children[1].list,1,{name:222})

            // this.dragForm[0].columns[0].children[1].children[1].list.push({"formId": "ae6d8d98370d4b4ca84ec310669d7bb1",
            //     "qualification": "limit",
            //     "name": "主体表",
            //     "componentName": "",
            //     "icon": "icon-form-outline"})
        }
        destroyed() {
            let Mainlist = sessionStorage.getItem("mainList");
            if (Mainlist) {
                sessionStorage.removeItem("mainList");
                // this.basicComponents.list = layoutComponents.list;
                Mainlist = null;
            }
        }
    }
</script>

<style scoped>

</style>
