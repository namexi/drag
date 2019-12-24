<template>
    <layouts>
        <div class="header-box">
            <div class="serversname" v-if="this.$route.name.indexOf('configuration') == -1">【{{getServersName}}】</div>
            <div v-else class="inputTitle-box" >
                  <span
                          class="inputTitle"
                          @click="inputFlag = !inputFlag"
                          v-if="inputFlag"
                  >
          {{ formName }}
        </span>
                <el-input
                        v-model="formName"
                        v-if="!inputFlag"
                        class="inputConnect"
                        @blur="inputFlag = !inputFlag"
                ></el-input>
            </div>
        </div>
    </layouts>
</template>

<script lang="ts">
    import Layouts from '@/layouts/Main/index.vue'
    import { Component, Vue } from "vue-property-decorator";
    import {Getter} from "vuex-class";

    @Component({
        components: {
            Layouts
        },
        computed:{
            formName: {
                get(){
                    return this.getFormName
                },
                set(v){
                    this.$store.dispatch('app/setFormName',v)
                }

            }
        }
    })
    export default class Main extends Vue {
        @Getter getServersName:any;
        @Getter getFormName:any;
        dragForm={
            formName: "未命名表名"
        };
        inputFlag= true
        created(){
            this.$route.name === 'procconfiguration'? this.$store.dispatch('app/setFormName','未命名流程') :false
        }

    }
</script>

<style scoped lang="less">
    .inputTitle-box{
        height: 32px;
        .inputTitle {
            box-sizing: border-box;
            margin-left: 33px;
            padding: 0 8px 4px 8px;
            border-bottom: dashed 1px #686e82;
        }
    }

    .header-box{
        width: 50%;
        .serversname{
            text-align: right;
        }
    }

    .inputConnect.el-input {
        position: static;
        width: 200px;
        margin-left: 33px;
    }
</style>
