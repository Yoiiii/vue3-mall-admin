<template>
  <el-table
    :load="loading"
    :data="tableData"
    tooltip-effect="dark"
    style="width:100%"
    @selection-change="handleSelectionChange"
  >
    <slot name='column'></slot>
  </el-table>
  <el-pagination 
    background
    layout="prev,pager,next"
    :total="total"
    :page-size="PageSize"
    :current-page="currentPage"
    @current-change="changePge"
    />
</template>

<script>
import {onMounted,reactive,toRefs} from 'vue'
export default {
  name:'Table',
  props:{
    action:Function,
  },
  setup(props) {
    const state = reactive({
      loading:false,
      tableData:[],
      total:0,
      currentPage:1,
      pageSize:10,
      multipleSelection:[],
    })
    onMounted(()=>{
      getList()
    })
    const getList=()=>{
      action(state.currentPage,state.pageSize).then(res=>{
        state.tableData=res.list
        state.total=res.currPage
        state.loading=false
      })
    }
    const handleSelectionChange=(val)=>{
      state.multipleSelection=val
    }
    const changePage = (val)=>{
      state.currentPage=val
      getList()
    }
    return {
      ...toRefs(state),
      changePage,
      handleSelectionChange,
      getList,
      multipleSelection
    }
  }
}
</script>