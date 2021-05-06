<template>
  <el-card class="index-container">
    <el-table
      :load="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width:100%"
    >
      <el-table-column
        prop="configName"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        label="跳转链接"
      >
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{scope.row.redirectUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="configRank"
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
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor:pointer;margin-right:10px" @click="handleEdit(scope.row.configId)">修改</a>
          <el-popconfirm
            title="确定删除吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDeleteOne(scope.row.configId)"
          >
            <template #reference>
              <a style="cursor:pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>
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
</template>

<script>
import {onMounted,reactive,ref,toRefs} from 'vue'
import {sueRoute,useRouter} from 'vue-router'
const configTypeMap={
  hot:3,
  new:4,
  recommend:5
}
export default {
  name:'IndexConfig',
  setup(){
    const router = useRouter()
    const route=useRoute()
    const state=reactive({
      loading:false,
      tableData:[],
      total:0,
      currentPage:1,
      pageSize:10,
      type:'add',
      configType:3
    })
    router.beforeEach((to)=>{
      if(['hot','new','recommend'].includes(to.name)){
        state.configType=configTypeMap[to.name]
      }
    })
    onMounted(()=>{

    })
    const unWatch=router.beforeEach((to)=>{
      console.log('to',to.name);
    })

    onUnmounted(()=>{
      unWatch()
    })
  }
}
</script>