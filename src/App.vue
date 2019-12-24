<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {_getUserInfo} from '@/api/user'
@Component({
  components: {
  }
})
export default class App extends Vue {
  created(){
    _getUserInfo().then(
            (res) =>{
              console.log(res)
            }
    );

  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
