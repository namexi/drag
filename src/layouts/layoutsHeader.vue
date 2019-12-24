<template>
    <div class="global-header">
        <slot></slot>
        <div class="adminInfo">
            <div class="info">
                <div class="name-icon">{{getUserName.slice(0 , 1)}}</div>
                <div class="username">{{getUserName}}</div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Getter } from 'vuex-class'

    @Component
    export default class LayoutsHeader extends Vue {
        @Getter getUserName:any;
        static ComponentName: string = "LayoutsHeader";
    }

</script>

<style scoped lang="less">
    .global-header{
        display: flex;
        .adminInfo{
            flex:1;
            .info{
                text-align: right;
                line-height: 64px;
                .name-icon {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    border-radius: 50%;
                    background: #e6f7ff;
                    margin: 0 12px 0 20px;
                }
                .username{
                    margin: 0 24px 0 0;
                    display: inline-block;
                }
            }

        }
    }
</style>
