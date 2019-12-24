<template>
    <el-table :data="data" class="process-table">
        <!--        <el-table-column type="selection" width="55"> </el-table-column>-->
        <el-table-column prop="name" label="模板名称" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="formData.componentName" label="模板类型" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.formData.componentName === 'KssForm'? '元件模板':'复合模板'}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="formData.area" label="区域类型" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.formData.area ==='1'? '工作区' :'辅助区'}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="enableUse" label="创建者账户" align="center">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                align="center"
        >
            <template slot-scope="scope">
                <el-button
                        @click="handleView(scope.row, scope.$index, data)"
                        type="text"
                        size="small"
                >预览</el-button>
                <el-button
                        @click="handleEdite(scope.row, scope.$index, data)"
                        type="text"
                        size="small"
                        v-if="scope.row.change"
                >编辑</el-button
                >
                <el-button
                        @click="handleClick(scope.row, scope.$index, data)"
                        type="text"
                        size="small"
                        class="danger"
                >删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "AuxiliaryArea",
        props:["data",'handleView','handleClick','handleEdite'],
        methods:{
            formatter(row){
                let date = new Date(row.createTime);
                return date.toLocaleDateString()
            }
        }
    }
</script>

<style scoped>

</style>
