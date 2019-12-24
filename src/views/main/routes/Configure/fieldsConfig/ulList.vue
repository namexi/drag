<template>
    <ksaas-config-item :data="data" :required="true">
        <el-form-item :inline="true" label="表头设置" v-if="data.options.showListHeader">
            <div
                    v-for="(domain, index) in data.options.options"
                    :key="domain.key"
            >
                <el-input
                        v-model="domain.label"
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
        <el-form-item >
            <el-checkbox v-model="data.options.showListHeader">显示表头</el-checkbox>
        </el-form-item>
    </ksaas-config-item>
</template>

<script>
    export default {
        name: "fieldsUlList",
        props:['data'],
        methods:{
            removeDomain(item) {
                var index = this.data.options.options.indexOf(item);
                if (index !== -1) {
                    this.data.options.options.splice(index, 1);
                }
            },
            addDomain() {
                this.data.options.options.push({
                    value: "",
                    key: Date.now()
                });
            },
        }
    }
</script>

<style scoped>

</style>
