<template>
    <el-dialog title="选项设置" :visible.sync="dialogVisible" width="30%" class="editing">
            <div class="optionsBody">
                <ksaas-tree v-model="list"></ksaas-tree>
            </div>
            <span slot="footer" class="dialog-footer">
      <el-button @click="handleSave1" size="small">存为字典</el-button>
      <el-button type="primary" @click="dialogVisible = false" size="small"> 确 定 </el-button>
    </span>
        </el-dialog>
</template>

<script>
    export default {
        name: "KsaasTreeDialog",
        model: {
            prop: "data",
            event: "change"
        },
        props: {
            "data":Boolean,
            'list':Array,
            'handleSave': {
                type: Function,
                default: () => () => {}
            }
        },
        computed: {
            dialogVisible: {
                get() {
                    return this.data;
                },
                set(v) {
                    this.$emit("change", v);
                }
            }
        },
        methods:{
            handleSave1(){
                console.log(this.list);
                this.dialogVisible = false;
                this.handleSave(this.list);
            }
        }
    }
</script>

<style scoped>

</style>
