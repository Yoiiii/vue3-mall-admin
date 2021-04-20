<template>
  <div class="header">
    <div class="left">
      <span style="font-size: 20px">{{name}}</span>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
  name:"Header",
  setup(){
    //获取路由实例
    const router = useRouter()
    const state =reactive({
      name:''
    })
    router.afterEach((to)=>{
      state.name = to.meta.title
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>