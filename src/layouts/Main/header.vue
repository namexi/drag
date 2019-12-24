<template>
    <layoutsHeader>
        <div>
            <i class="el-icon-arrow-left" @click="handelGoBack"></i>
        </div>
        <slot/>
    </layoutsHeader>
</template>

<script>
    import layoutsHeader from "../layoutsHeader";
    export default {
        name: "MainHeader",
        components:{
            layoutsHeader
        },
        methods:{
            handelGoBack() {
                this.$router.go(-1)
                // this.$router.push("temp");
            }
        }
    }
</script>

<style scoped lang="less">
    .el-icon-arrow-left {
        font-size: 27px;
        padding-right: 33px;
        padding-left: 30px;
        border-right: 1px solid #ebedef;
        vertical-align: middle;
    }
</style>
