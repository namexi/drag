<template>
    <div class="el-table">
        <table style="width: 100%;" border="0" class="el-table__header">
<!--            <div class="el-table--border"></div>-->
            <thead>
            <tr class="">
                <th colspan="1" rowspan="1"  class=" is-leaf" v-for="(item,i) in options1.options" :key="i" v-if="options1.showListHeader">
                    <div class="cell">{{item.label}}</div>
                </th>
            </tr>
        </thead>
        </table>
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tbody>
            <tr class="el-table__row" v-for="(items, i) in data" :key="i" v-if="options1.showListHeader">
                <td rowspan="1" colspan="1" v-for="(item, index) in options1.options" :key="index">
                    <div class="cell">{{items[item.value]}}</div>
                </td>
            </tr>
            <tr v-if="!options1.showListHeader"  v-for="(items, i) in data" :key="i">
                <td  rowspan="1" colspan="1" v-for="(el,key) in items" :key="key">
                    <div class="cell">{{items[key]}}</div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/babel">
    export default {
        name: "ElUlList",
        props: ["options1","value","postEmit"],
        mounted() {},
        data() {
            return {
                select: "",
            };
        },
        methods: {
            handleClick(item) {
                this.select = item.id;
                this.postEmit && this.postEmit(item);
            }
        },
        computed:{
            data:{
                get(){
                    return this.value
                },
                set(v){
                    return v
                }
            }
        },
        mounted() {
            console.log(this.options1)
        }
    };
</script>

<style lang="less" scoped>
    .kss-form-list {
        border-top: 1px solid #DCE1E4;
        li {
            padding: 0 16px;
            text-align: left;
            color: #686E82;
            border-bottom: 1px solid #DCE1E4;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            display: flex;
            &:hover {
                background-color: #ebedef;
            }
            &.select {
                background: rgba(228, 244, 254, 1);
            }
            span {
                text-align: center;
                flex: 1;
            }
        }
    }
</style>
