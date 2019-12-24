<template>
    <div class="app-wrapper">
        <slot></slot>
        <router-view class="nav-connect"></router-view>
    </div>
</template>

<script>
    export default {
        name: "XdLayout",
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
