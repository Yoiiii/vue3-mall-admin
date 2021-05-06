<template>
  <el-card class="swiper-container"> 
    <div class="header">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd"
      >新增</el-button>
      <el-popconfirm
        title="确定要删除吗?"
        confirm-button-text="确定"
        cancel-button-type="取消"
        @confirm="handleDelete"
      >
      <template #reference>
        <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
      </template>
    </el-popconfirm>
    </div>
    <el-table
      :v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="轮播图"
        width="200">
        <template #default="scope">
          <img style="width: 150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column
        label="跳转链接"
        >
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="carouselRank"
        label="排序值"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      >
      </el-table-column> 
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
     />
  </el-card>
  <DialogAddSwiper ref='addSwiper' :reload="getCarouselsList" :type="type"/>
</template>

<script>
import {onMounted,reactive,ref,toRefs} from 'vue'
import {getCarousels,deleteCarousels} from '@/utils/api.js'
import DialogAddSwiper from '@/components/DialogAddSwiper.vue'
import { ElMessage } from 'element-plus'
export default {
  name:'Swiper',
  components:{
    DialogAddSwiper
  },
  setup(){
    const addSwiper = ref(null)
    const state = reactive({
      loading:false,
      tableData:[],
      currentPage:1,
      pageSize:10,
      type:'add',
      total:0,
      multipleSelection:[]
    })
    onMounted(()=>{
      getCarouselsList()
    })
    const handleAdd=()=>{
      state.type='add'
      addSwiper.value.open()
    }
    const handleEdit=(id)=>{
      state.type='edit'
      addSwiper.value.open(id)
    }
    const getCarouselsList = () => {
      state.loading = true
      getCarousels(state.currentPage,state.pageSize)
      .then(res => {
        state.tableData = res.list
        state.loading = false
        state.currentPage=res.currPage
        state.total=res.totalCount
      })
    }
    const handleSelectionChange=(val)=>{
      state.multipleSelection=val
      console.log(val);
    }
    const handleDelete = ()=>{
      if(!state.multipleSelection.length){
        ElMessage.error('请选择项')
        return
      }
      let deletelist = state.multipleSelection.map(i=>i.carouselId)
      deleteCarousels(deletelist).then(()=>{
        ElMessage.success('删除成功')
        getCarouselsList()
      })
    }
    const changePage =(val)=>{
      state.currentPage =val
      getCarouselsList()
    }
    return {
      ...toRefs(state),
      addSwiper,
      handleAdd,
      handleEdit,
      handleSelectionChange,
      handleDelete,
      changePage,
      getCarouselsList
    }
  }
}
</script>

