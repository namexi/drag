<template>
    <xd-layout>
        <main-header class="globalLayoutHeader">
            <slot></slot>
        </main-header>
    </xd-layout>
</template>

<script lang="ts">
    import XdLayout from '../index.vue'
    import MainHeader from './header.vue'

    import { Component, Vue } from "vue-property-decorator";
    import { Getter } from 'vuex-class'

    @Component({
        components: {
            XdLayout,
            MainHeader
        }

    })
    export default class Layouts extends Vue {
        $router:any;
        @Getter getServersName:any
        static ComponentName: string = "Layouts";
        activeIndex :string = '/outpatientDoctor';
        activeTextColor:string = "#10A2FC";

    }
</script>

<style scoped>
</style>
