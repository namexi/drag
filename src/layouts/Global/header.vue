<template>
    <LayoutsHeader>
        <div class="global-header">
            <div class="logo">
                <img src="@/assets/hlogo.png" alt="" >
            </div>
            <div class="nav">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :active-text-color="activeTextColor">
                    <el-menu-item index="/outpatientDoctor">门诊医生</el-menu-item>
                    <el-menu-item index="/dictionary">字典维护</el-menu-item>
                </el-menu>
            </div>
        </div>
    </LayoutsHeader>

</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import LayoutsHeader from '../layoutsHeader.vue'

    @Component({
        components: {
            LayoutsHeader
        }

    })
    export default class GlobalHeader extends Vue {
        $router:any;
        static ComponentName: string = "GlobalHeader";
        activeIndex :string = '/outpatientDoctor';
        activeTextColor:string = "#10A2FC";
        handleSelect(key:string){
            this.$router.push(key)
        }
    }

</script>

<style scoped lang="less">
    .global-header{
        display: flex;
        .logo{
            height: 40px;
            margin: 12px 0 12px 13px;
            width: 172px;
            padding:0 27px 0 11px;
            border-right: 1px solid #DCE1E4;
        }
        .nav{
            margin-left: 40px;
        }
    }
</style>
