<template>
  <div class="footer">
    <div class="left">Copyright © 2021 Yoi. All rights reserved.</div>
    <div class="right">
      <a target="_blank" href="https://github.com/Yoiiii/vue3-mall-admin">vue3-admin {{state}} Version {{ver}}</a>
    </div>
  </div>
</template>

<script>
import config from '~/config'
import {reactive,toRefs} from 'vue'
export default {
  name:"Footer",
  setup(){
    const state=reactive({
      state:"",
      ver:""
    })
    state.state=config[import.meta.env.MODE].state
    state.ver = config[import.meta.env.MODE].ver
    return {
      ...toRefs(state)
      
      }
  }
}
</script>

<style scoped>
.footer {
  height: 50px;
  border-top: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>