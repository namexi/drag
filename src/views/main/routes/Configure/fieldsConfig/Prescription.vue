<template>
    <ksaas-config-item :data="data" :required="true">
        <el-form-item :label="nameObj[0]">
            <el-select
                    v-model="data.options.filter1Dictionary
              "
            >
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item._id"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="nameObj[1]">
            <el-select
                    v-model="data.options.projectDictionary"
            >
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item._id"
                >
                </el-option>
            </el-select>
        </el-form-item>
    </ksaas-config-item>
</template>

<script>
    import {_getDictionary} from '@/api/app.ts'
    export default {
        name: "prescription",
        props:{
            data: Object,
            nameObj:{
                type:Array,
                default: () => (['药房','药品库'])
            }
        },
        data(){
            return {
                options:[]
            }
        },
        created(){
            _getDictionary().then(
                res => {
                    if (res.status) {
                        this.options = res.data;
                    }

                }
            )
            // console.log(this.data)
        }
    }
</script>

<style scoped>

</style>
