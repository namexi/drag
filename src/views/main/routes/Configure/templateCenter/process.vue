<template>
  <div>
    <el-table
            ref="filterTable"
            :data="tableData"
            class="process-table"
    >
      <el-table-column prop="name" label="模板名称" align="center">
      </el-table-column>
      <el-table-column
              align="center"
              prop="state"
              label="流程状态"
              :filters="[
          { text: '已发布', value: '0' },
          { text: '未发布', value: '1' },
          { text: '已下线', value: '2' },
          { text: '无权限', value: '3' }
        ]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <span>
            <i
                    class="statusFlag"
                    :class="
                scope.row.state === '1'
                  ? 'bgprimary'
                  : scope.row.state === '0'
                  ? 'bgsuccess'
                  : scope.row.state === '2'
                  ? 'bgoffline'
                  : 'bgwarning'
              "
            ></i
            >{{
              scope.row.state === "1"
                ? "未发布"
                : scope.row.state === "0"
                ? "已发布"
                : scope.row.state === "2"
                ? "已下线"
                : "未设置权限"
            }}</span
          >
        </template>
      </el-table-column>

      <el-table-column prop="authority" label="权限范围" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.authority.length > 0">
            <span v-for="(item, i) in scope.row.authority" :key="i">
              {{ item.deptName }}
            </span>
          </span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              prop="createTime"
              label="时间"
              :formatter="formatter"
      >
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
                  @click.native.prevent="preview(scope.row, tableData)"
                  type="text"
                  size="small"
                  class="warning"
          >
            预览
          </el-button>
          <el-button
                  v-if="scope.row.state === '1' && scope.row.state !== '3'"
                  @click.native.prevent="publish(scope.row, tableData)"
                  type="text"
                  size="small"
                  class="success"
          >
            发布
          </el-button>
          <el-button
                  v-if="scope.row.state === '3'"
                  @click.native.prevent="Permission(scope.row._id, tableData)"
                  type="text"
                  size="small"
          >
            权限
          </el-button>
          <el-button
                  v-if="scope.row.state !== '0'"
                  @click.native.prevent="deleteRow(scope.row, tableData)"
                  type="text"
                  size="small"
                  class="danger"
          >
            删除
          </el-button>
<!--          <el-button-->
<!--                  v-if="scope.row.state !== '2' && scope.row.state !== '3'"-->
<!--                  @click.native.prevent="offLine(scope.row, tableData)"-->
<!--                  type="text"-->
<!--                  size="small"-->
<!--                  class="warning"-->
<!--          >-->
<!--            下线-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import {_getProcessesList, _deleteProcesses, _releaseProcesses} from '@/api/app.ts'
  @Component({
    components: {
    }
  })
  export default class App extends Vue {

    tableData:any=[];
    // 流程列表查询
    getProcessList() {
      _getProcessesList().then(res => {
        this.tableData = res.data.list;
      });
    }
    // 预览
    preview(){}
    // 流程删除
    deleteRow(row:any) {
      const id = row._id;
      this.$confirm(`删除后不可恢复，确定删除该流程？`, `删除流程`, {
        confirmButtonText: "删除",
        confirmButtonClass: "bgdanger",
        type: "error"
      })
              .then(() => {
                _deleteProcesses(id).then(res => {
                  if (res.status) {
                    this.getProcessList();
                    this.$Message({
                      message: `${res.message}`,
                      type: "success"
                    });
                  }
                });
              })
              .catch(() => {});
    }

    // 流程发布
    publish(row:any) {
      const id = row._id;
      this.$confirm(
              `上线后将不可再更改相关配置，请确认。`,
              `上线${row.formName}`,
              { confirmButtonText: "上线", type: "info" }
      )
              .then(() => {
                _releaseProcesses(id).then(res => {
                  if (res.status) {
                    this.getProcessList();
                    this.$Message({
                      message: `${res.message}`,
                      type: "success"
                    });
                  }
                });
              })
              .catch(() => {});
    }
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    }
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    }
    formatter(row:any) {
      let date = new Date(row.createTime);
      return date.toLocaleDateString()
    }
    filterTag(value:any, row:any) {
      return row.state === value;
    }
    filterHandler(value:any, row:any, column:any) {
      const property = column["property"];
      return row[property] === value;
    }
    created(){
      this.getProcessList()
    }
  }
</script>

<style scoped></style>
