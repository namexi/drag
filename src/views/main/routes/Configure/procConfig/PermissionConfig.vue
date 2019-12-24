<template>
    <div>
        <div class="title">
            <span>权限设置</span>
            <el-button
                    type="text"
                    icon="el-icon-arrow-right"
                    class="titleBtn"
                    @click="handleClick"
            ></el-button>
        </div>
        <div class="connect" v-for="(items, key) in pathLabelList" :key="key">
            <i class="statusFlag bgprimary"></i>
            <span v-for="(item, i) in items.pathLabels" :key="i"
            >{{ item }} {{ i === items.pathLabels.length - 1 ? "" : "/" }}
      </span>
        </div>
        <permission-config-dialog
                :dialogFormVisible.sync="dialogFormVisible"
                v-model="pathLabelList"
                @dialog="setdialog"
        ></permission-config-dialog>
    </div>
</template>

<script>
    import PermissionConfigDialog from "./PermissionConfigDialog";

    export default {
        name: "PermissionConfig",
        data() {
            return {
                dialogFormVisible: false,
                formLabelWidth: "90px",
                form: {
                    options: []
                },
                // 加载
                loading: false,
                value: null
            };
        },
        model: {
            prop: "data",
            event: "change"
        },
        props: ["data"],
        computed: {
            pathLabelList: {
                get() {
                    return this.data;
                },
                set(v) {
                    this.$emit("change", v);
                }
            }
        },
        methods: {
            // 权限设置
            handleClick() {
                this.dialogFormVisible = true;
            },

            setdialog(v) {
                console.log(v)
                this.dialogFormVisible = v;
            }
        },
        components: {
            PermissionConfigDialog
        }
    };
</script>

<style scoped lang="less">
    .title {
        /*margin-top: 26px ;*/
        position: relative;
        span {
            font-size: 16px;
            font-weight: 500;
        }
        .titleBtn {
            position: absolute;
            right: 19px;
            top: 0;
            bottom: 0;
            i.el-icon-arrow-right {
                &::before {
                    font-weight: 500;
                }
            }
        }
    }
    .connect {
        min-height: 24px;
        line-height: 24px;
        margin-left: 14px;
        margin-right: 24px;
    }
</style>
