<template>
    <xd-layout>
        <global-header class="globalLayoutHeader"></global-header>
    </xd-layout>
</template>

<script>
    import GlobalHeader from "./header";
    import XdLayout from "../index.vue";
    export default {
        name: "index",
        components:{
            GlobalHeader,
            XdLayout
        }
    }
</script>

<style scoped lang="less">
    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        background-color: #F8F9F9;
        .nav-connect{
            width: 100%;
            height: calc(~'100% - 64px');
            overflow: auto;
        }
    }

</style>
