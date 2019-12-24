<template>
        <el-form :model="form">
            <el-form-item label="服务名称:" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="用于展示在展示菜单栏显示" size="mini"></el-input>
            </el-form-item>
        </el-form>
</template>

<script>
    export default {
        name: "createService",
        props:{
            form:{
                type:Object,
                default:() =>  ({
                    name:''
                })
            }
        },
        data(){
            return {
                formLabelWidth:'120'
            }
        }
    }
</script>

<style scoped>

</style>
