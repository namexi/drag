<template>
    <div>
        <el-menu
                mode="horizontal"
                :router="true"
                :default-active="activeIndex"
                active-text-color="#10A2FC"
                class="el-menu-demo"
        >
            <el-menu-item
                    v-for="(item, key) in navList"
                    :index="item.path"
                    :key="key"
            >{{ item.title }}</el-menu-item
            >
        </el-menu>
        <router-view class="nav-connect"></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { State } from 'vuex-class'

    @Component
    export default class Index extends Vue {
        @State(state => state.app.tempCenterNavList) navList:any;

        activeIndex='/temp';

    }
</script>

<style scoped>

</style>
