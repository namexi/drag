<template>
    <div>
        <h2>门诊医生站</h2>
        <div>
            助力行业客户依托实体自主搭建门诊医生系统，最大化提升医院协同效率，打造医疗服务新模式
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="dialogFormVisible = true">创建服务</el-button>
        </div>
        <div v-for="(item, i) in list" :key="i"  class="services-box">
            <i class="el-icon-circle-close" @click="handelDelete(item._id)"></i>
            <div @click="handelClick(item._id)" style="height: 100%">
                {{item.name}}
            </div>

        </div>
        <el-dialog title="自主创建" :visible.sync="dialogFormVisible">
            <el-dialog
                    :visible.sync="innerVisible"
                    append-to-body
                    :before-close="handleClose"
                    center>
                <div slot="title" >
                    <h2 style="margin-bottom: 16px">个性化定制</h2>
                    <span style="font-size: 14px;color: #686E82;">别客气,请联系我们！</span>
                </div>
                <personalization></personalization>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="() => {dialogFormVisible = false; innerVisible = false}" size="mini">确定创建</el-button>
                </div>
            </el-dialog>
            <createService :form="form"></createService>
            <div slot="footer" class="dialog-footer">
                <el-button @click="() => innerVisible = true" size="mini">个性化设置</el-button>
                <el-button type="primary" @click="handleSave" size="mini">确定创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {_getApplications, _saveApplications, _deleteApplications} from '@/api/app'
    import createService from './createService.vue'
    import Personalization from './Personalization.vue'
    export default {
        name: "index",
        data(){
            return {
                list:[],
                dialogFormVisible:false,
                innerVisible:false,
                form:{
                    name:''
                }
            }
        },
        methods:{
            init(){
                _getApplications().then(res=>{
                    this.list = res.data
                })
            },
            handelClick(id) {
                this.$store.dispatch('app/setServicesId',id);
                this.$router.push('/temp')
            },
            handleClose(){
                this.dialogFormVisible = false;
                this.innerVisible = false
            },
            handleSave(){
                _saveApplications({name: this.form.name}).then(res =>{
                    if (res.status) {
                        this.init();
                        this.dialogFormVisible = false;
                        this.$Message({
                            message:res.message,
                            type: "success"
                        })
                    }
                })

            },
            handelDelete(id){
                _deleteApplications(id).then(
                    res =>{
                        if (res.status) {
                            this.init();
                            this.$Message({
                                message:res.message,
                                type: "success"
                            })
                        }
                    }
                )
            }
        },
        created() {
          this.init()
        },
        components:{
            createService,
            Personalization
        }
    }
</script>

<style scoped lang="less">
    .services-box {
        height: 240px;
        width: 200px;
        display: inline-block;
        background: #fff;
        margin-left:32px ;
        margin-top: 10px;
    }

</style>
