<template>
    <div class="kss-prescription">
        <el-tabs class="dr-tab" :value="label" @tab-click="handleClick">
            <el-tab-pane label="西药处方" name="1"></el-tab-pane>
            <el-tab-pane label="中药处方" name="2"></el-tab-pane>
        </el-tabs>
        <div class="main">
            <div class="header">
                <div class="filterItem">
                    <div class="label">药房：</div>
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
                <el-button type="primary" class="addTable" @click="addTable">新增处方</el-button>
            </div>
            <div class="content">
                <el-table :data="item.options.defaultValue" border show-summary style="width: 100%">
                    <el-table-column prop="id" label="处方号" width="80"></el-table-column>
                    <el-table-column prop="name" label="药品名称" width="180">
                        <template slot-scope="scope">
<!--                            <el-select-->
<!--                                    v-model="scope.value"-->
<!--                                    multiple-->
<!--                                    filterable-->
<!--                                    remote-->
<!--                                    reserve-keyword-->
<!--                                    placeholder="请输入关键词"-->
<!--                                    :remote-method="remoteMethod"-->
<!--                                    :loading="loading"-->
<!--                            >-->
<!--                                <el-option-->
<!--                                        v-for="item in options"-->
<!--                                        :key="item.value"-->
<!--                                        :label="item.label"-->
<!--                                        :value="item.value"-->
<!--                                ></el-option>-->
<!--                            </el-select>-->
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount1" label="规格"></el-table-column>
                    <el-table-column prop="amount2" label="单位"></el-table-column>
                    <el-table-column prop="amount3" label="药品数量"></el-table-column>
                    <el-table-column prop="amount4" label="单次用量"></el-table-column>
                    <el-table-column prop="amount5" label="用量单位"></el-table-column>
                    <el-table-column prop="amount6" label="途径"></el-table-column>
                    <el-table-column prop="amount7" label="频次"></el-table-column>
                    <el-table-column prop="amount8" label="用药天数"></el-table-column>
                    <el-table-column prop="amount9" label="实收(元)"></el-table-column>
                    <el-table-column prop="amount10" label="药房"></el-table-column>
                    <el-table-column prop="amount11" label="说明"></el-table-column>
                    <el-table-column prop="amount12" label="支付方式"></el-table-column>
                    <el-table-column prop="amount13" label="编辑">
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
        name: "ElPrescription",
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
