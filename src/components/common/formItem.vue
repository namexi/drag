<template>
    <el-form
            :model="{ list }"
            :label-position="config.labelPosition"
            :label-width="config.labelWidth + 'px'"
            label-suffix=":"
    >
    <el-row>
        <el-col :span="config.col" v-for="(item, key) in dragData" :key="key">
            <el-form-item
                    :prop="'list.' + key + '.options' + '.defaultValue'"
                    :label="item.name"
                    class="drag-el"
                    :key="key"
                    :rules="item.rules"
            >
                <form-item-hoc
                        :el="item.type"
                        :type="item.options.elType"
                        :props="item.options.props"
                        :options="item.options.options"
                        :options1="item.options"
                        v-model="item.options.defaultValue"
                        :disabled="item.options.disabled"
                        :placeholder="item.options.placeholder"
                        :multiple="item.options.multiple"
                        :filterable="item.options.filterable"
                >
                    <template v-if="item.children">
                        <form-item-hoc
                                v-for="(childItem, key) in item.children.options"
                                :el="item.children.type"
                                :key="key"
                                :label="childItem.label"
                                :value="childItem.value"
                                :style="{
                    display: item.options.inline ? 'inline-block' : 'block'
                  }"
                        >{{ childItem.value }}</form-item-hoc
                        >
                    </template>
                </form-item-hoc>
            </el-form-item>
        </el-col>
    </el-row>
    </el-form>
</template>

<script>
    import FormItemHoc from "@/tool/utils/formItem.js";
    export default {
        name: "KsaasFormItem",
        model: {
            prop: "list",
            event: "drag"
        },
        props:['config','list'],
        components: {
            FormItemHoc
        },
        computed:{
            dragData:{
                get(){
                    return this.list
                },
                set(v){
                    return v
                }
            }
        }
    }
</script>

<style scoped>

</style>
