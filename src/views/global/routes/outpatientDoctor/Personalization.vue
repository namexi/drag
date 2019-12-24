<template>
    <el-form :model="form">
        <el-form-item label="联系电话:" label-width="120">
            <el-input v-model="form.name" autocomplete="off" placeholder="11位手机号" size="mini"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Personalization",
        data(){
            return {
                form: {
                    name:''
                }
            }
        }
    }
</script>

<style scoped>

</style>
