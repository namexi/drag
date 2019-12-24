<template>
 <div class="layoutComponent">
        <div v-for="(items, index) in dragData" :key="index">
            <!--        第一层-->
            <layout-container-hoc
                    :el="item.type"
                    v-for="(item, key) in items.columns"
                    :key="key + index"
                    class="drag-el"
                    :class="item.className"
            >
                <!--          第二层-->
                <layout-container-hoc
                        v-for="(children, childrenIndex) in item.children"
                        v-model="children.list"
                        :el="children.type"
                        :style="children.style"
                        style="{background: #FFFFFF !important;}"
                        :key="childrenIndex"
                >
                    <template v-if="!children.children">
                        <div v-for="(childrenItem, childrenI) in children.list" :key="childrenI">
                            <ksaas-form-item  v-model="childrenItem.formData.list" :config="childrenItem.formData.config"></ksaas-form-item>
                        </div>
                    </template>
                    <!--         第三层嵌套   -->
                    <layout-container-hoc
                            v-else
                            v-for="(comp, i) in children.children"
                            v-model="comp.list"
                            :el="comp.type"
                            :style="comp.style"
                            :key="i"
                    >
                        <div v-for="(childrenItem, childrenI) in comp.list" :key="childrenI">
                            <ksaas-form-item  v-model="childrenItem.formData.list" :config="childrenItem.formData.config"></ksaas-form-item>
                        </div>
                    </layout-container-hoc>
                </layout-container-hoc>
            </layout-container-hoc>
        </div>
 </div>
</template>

<script>
    import hoc from "@/tool/utils/formItem.js";
    import {_getFormData} from '@/api/procConfig'
    export default {
        name: "layoutConfigDialog",
        model: {
            prop: "data",
            event: "drag"
        },
        props:["data"],
        computed: {
            dragData: {
                get() {
                    return this.data;
                },
                set(v) {
                    this.$emit("drag", v);
                }
            }
        },
        components:{
            LayoutContainerHoc: hoc
        },
        methods:{
            async getFormData(id){
               let res = await _getFormData(id);
                if (res.status) return res.data.formData
                console.log(res)
            }
        },
        created() {
            // this.getFormData('172d9d4f098a42c181c64d3f3ceee4ad')
        }
    }
</script>

<style scoped lang="less">
.el-main {
    text-align: left;
}
</style>
