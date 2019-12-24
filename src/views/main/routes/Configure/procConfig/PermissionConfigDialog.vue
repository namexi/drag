<template>
    <el-dialog
            title="选择可使用模板的科室"
            :visible.sync="dialogFormVisible1"
            :fullscreen="true"
    >
        <el-form :model="form">
            <el-form-item>
                <el-cascader-panel
                        ref="myCascader"
                        v-model="value1"
                        placeholder="试试搜索：科室名称"
                        :options="form.options"
                        filterable
                        :props="props"
                >
                </el-cascader-panel>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handelEmpty">清 空</el-button>
            <el-button type="primary" @click="handelConfirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { _getAuthList } from "@/api/procConfig.js";

    export default {
        name: "PermissionConfigDialog",
        props: ["dialogFormVisible", "data"],
        model: {
            prop: "data",
            event: "change"
        },

        data() {
            return {
                form: {
                    options: null
                },
                value1: null,
                props: { multiple: true }
            };
        },
        methods: {
            // 清空
            handelEmpty() {
                this.$refs.myCascader.clearCheckedNodes();
                this.value1 = null;
            },

            // 确定
            handelConfirm() {
                this.pathLabelList = this.$refs.myCascader.getCheckedNodes();
                this.dialogFormVisible1 = false;
            }
        },
        created() {
            _getAuthList().then(res => {
                if (res.status) this.form.options = res.data;
            });
        },
        computed: {
            pathLabelList: {
                get() {
                    return this.data;
                },
                set(v) {
                    this.$emit("change", v);
                }
            },
            dialogFormVisible1: {
                get() {
                    return this.dialogFormVisible;
                },
                set(v) {
                    this.$emit("dialog", v);
                }
            }
        }
    };
</script>

<style scoped></style>
