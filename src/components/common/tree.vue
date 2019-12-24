<template>
    <el-tree
            :data="value"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @check-change="handleChange">
      <span class="custom-tree-node" slot-scope="{ node, data }">
          <input v-if="node.data.edit" v-model="node.data.label" @blur="node.data.edit = false" v-focus></input>
           <span v-else>{{node.label}}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
            Append
          </el-button>
          <el-button
                  v-if="data.$treeNodeId !== 1"
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            Delete
          </el-button>
            <el-button
                  type="text"
                  size="mini"
                  @click="node.data.edit = true">
            edit
          </el-button>
        </span>
      </span>
    </el-tree>
</template>

<script>
    let id = 1000;
    export default {
        name: "ksaasTree",
        model:{
            prop:'value',
            event:'change'
        },
        props:['value'],
        data() {
            return {
                data: JSON.parse(JSON.stringify(this.value))
            }
        },
        methods: {
            append(data) {
                const newChild = { id: id++, label: '请编辑内容', edit: false, children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            handleChange(data, checked, indeterminate){
                console.log(data)
            }
        },
        directives: {
            focus: {
                // 指令的定义
                inserted: function (el) {
                    el.focus()
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
