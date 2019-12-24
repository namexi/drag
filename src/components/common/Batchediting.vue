<template>
  <el-dialog
    title="批量编辑"
    :visible.sync="dialogVisible"
    width="30%"
    class="editing"
  >
    <span>每行对应一个选项</span>
    <div class="editingBody">
      <ul>
        <li v-for="(item, key) in list" :key="key">
          {{ item.key }}: {{ item.value || "未填写映射值" }}
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleSave1" size="small"
        >存为字典</el-button
      >
      <el-button type="primary" @click="dialogVisible = false" size="small">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "KsaasBatchediting",
  model: {
    prop: "data",
    event: "change"
  },
  props: ["data", "list","handleSave"],
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
};
</script>

<style scoped lang="less">
.editingBody {
  border: 1px solid #dce1e4;
  border-radius: 4px;
  margin-top: 8px;
  ul {
    margin: 12px;
    li {
      margin: 0 0 3px 0;
    }
  }
}
</style>
