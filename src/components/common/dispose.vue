<template>
    <div class="kss-prescription">
        <div class="main">
            <div class="header">
                <div class="filterItem">
                    <div class="label">院区：</div>
                    <div class="value">
                        <el-cascader v-model="pharmacy" :options="options" @change="pharmacyChange"></el-cascader>
                    </div>
                </div>
                <div class="filterItem">
                    <div class="label">检索方式：</div>
                    <div class="value">
                        <el-select v-model="searchType" placeholder="请选择">
                            <el-option label="拼音首字母" value="01"></el-option>
                            <el-option label="五笔头" value="02"></el-option>
                            <el-option label="代码" value="03"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="content">
                <el-table :data="item.options.defaultValue" border show-summary style="width: 100%">
                    <el-table-column prop="id" label="处置号" width="80"></el-table-column>
                    <el-table-column prop="name" label="项目名称" width="180">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount1" label="类别"></el-table-column>
                    <el-table-column prop="amount2" label="单位"></el-table-column>
                    <el-table-column prop="amount3" label="数量"></el-table-column>
                    <el-table-column prop="amount7" label="频次"></el-table-column>
                    <el-table-column prop="amount8" label="医生说明"></el-table-column>
                    <el-table-column prop="amount9" label="执行科室"></el-table-column>
                    <el-table-column prop="amount10" label="实收(元)"></el-table-column>
                    <el-table-column prop="amount12" label="支付方式"></el-table-column>
                    <el-table-column prop="amount13" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="delectRow(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .kss-prescription {
        .el-tabs {
            height: 100%;
        }
        .el-tabs__header {
            margin: 0;
            .el-tabs__nav {
                border-radius: 0;
                border-right: 0;
                .el-tabs__item {
                    width: 98px;
                    padding: 0;
                    text-align: center;
                    &.is-active {
                        background-color: #FFFFFF;
                    }
                }
            }
        }
        .el-tabs__nav-scroll {
            background-color: #FFFFFF;
        }
        .el-tabs__content {
            position: absolute;
            width: 100%;
            top: 41px;
            bottom: 0;
            overflow-y: scroll;
        }
        .main {
            padding: 16px 20px;
            .header {
                text-align: left;
                margin-bottom: 20px;
                .filterItem {
                    display: inline-block;
                    color: #404351;
                    & > div {
                        display: inline-block;
                    }
                    & + .filterItem {
                        margin-left: 24px;
                    }
                    .label {
                        margin-right: 8px;
                        color: #686E82;
                    }
                }
                .addTable {
                    margin-left: 16px;
                }
            }
            thead th {
                background-color: #F8F9F9;
                font-size: 14px;
                font-weight: 500;
                color: #404351;
            }
            tbody td{
                height: 40px;
                line-height: 40px;
                padding: 5px 0;
            }
        }
    }
</style>

<script type="text/babel">
    export default {
        name: "ElDispose",
        props: {
            item: {
                type: Object,
                default() {
                    return {
                        type: "Prescription",
                        options: {
                            defaultValue: [{ id: 1 }]
                        }
                    };
                }
            },
            change: Function
        },

        data() {
            return {
                label: "1",
                searchType: "01",
                pharmacy: "",

                loading: false,
                options: []
            };
        },

        methods: {
            handleClick(val) {},
            pharmacyChange() {},
            remoteMethod(query) {
                if (query !== "") {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options = this.list.filter(item => {
                            return (
                                item.label
                                    .toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1
                            );
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            addTable() {
                console.log("addTable");
                this.item.options.defaultValue = (
                    this.item.options.defaultValue || []
                ).push({ id: 4 });
            },
            delectRow(index) {
                this.item.options.defaultValue.splice(index, 1);
            }
        },

        computed: {}
    };
</script>
