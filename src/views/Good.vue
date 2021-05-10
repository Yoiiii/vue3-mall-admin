<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
          >新增商品</el-button
        >
      </div>
    </template>
    <el-table
      :loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="goodsId" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsName" label="商品名"> </el-table-column>
      <el-table-column prop="goodsIntro" label="商品简介"> </el-table-column>
      <el-table-column width="150px" label="商品图片">
        <template #default="scope">
          <img style="width:100px;height:100px" :key="scope.row.goodsId" :src="$filters.prefix(scope.row.goodsCoverImg)" alt="商品主图">
        </template>   
      </el-table-column>
      <el-table-column prop="stockNum" label="商品库存"></el-table-column>
      <el-table-column prop="sellingPrice" label="商品售价"></el-table-column>
      <el-table-column  label="上架状态">
        <template #default="scope">
          <span style="color:green;" v-if="scope.row.goodsSellStatus ==0">销售中</span>
          <span style="color:red" v-else>已下架</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor:pointer;margin-right:10px" @click="handleEdit(scope.row.goodsId)">修改</a>
          <a style="cursor:pointer;margin-right:10px" v-if="scope.row.goodsSellStatus==0" @click="handleStatus(scope.row.goodsId,1)">下架</a>
          <a style="cursro:pointer;margin-right:10px" v-else @click="scope.row.goodsSellStatus(scope.row.goodsId,0)">上架</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="total>pageSize"
      background
      layout="prev,pager,next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
     />
  </el-card>
</template>

<script>
import {onMounted,reactive,ref,toRefs,getCurrentInstance}from 'vue'
import {getGoodsList,editGoodStatus}from '@/utils/api'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
export default {
  name:'Good',
  setup(){
    const app = getCurrentInstance()
    const router = useRouter()
    const state = reactive({
      loading:false,
      tableData:[],
      total:0,
      currentPage:1,
      pageSize:10
    })
    onMounted(()=>{
      getGoodList()
    })
    const getGoodList= ()=>{
      state.loading=true
      getGoodsList(state.currentPage,state.pageSize).then(res=>{
        state.tableData= res.list
        state.total=res.totalCount
        state.currentPage=res.currPage
        state.loading=false
        app.ctx.goTop()
      })
    }
    const handleAdd =()=>{
      router.push({path:'/add'})
    }
    const handleEdit =(id)=>{
      router.push({path:'/add',query:{id}})
    }
    const changePage =(val)=>{
      console.log(val);
      state.currentPage=val
      getGoodList()
    }
    const handleStatus = (id,status)=>{
      editGoodStatus(id,status).then(()=>{
        ElMessage.success('修改成功')
        getGoodList()
      })
    }
      return {
    ...toRefs(state),
    handleAdd,
    handleEdit,
    getGoodList,
    changePage,
    handleStatus
  }
  }

}
</script>