<template>
  <el-card class="order-container">
    <template #header>
      <el-input
        style="width:200px;margin-right:10px"
        placeholder="请输入订单号"
        v-model="orderNo"
        @change="handleOption"
        size="small"
        clearable
      ></el-input>
      <el-select @change="handleOption" v-model="orderStatus" size="small" style="width:200px;margin-right:10px">
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" size="small" icon="el-icon-s-home" @click="handleConfig()">配货完成</el-button>
      <el-button type="primary" size="small" icon="el-icon-s-home" @click="handleSend()">出库</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="handleClose()">关闭订单</el-button>
    </template>
    <el-table
      :load="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        prop="orderNo"
        label="订单号"
      ></el-table-column>
      <el-table-column
        prop="totalPrice"
        label="订单总价"
      ></el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
      >
        <template #default="scope">
          <span>{{$filters.orderMap(scope.row.orderStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payType"
        label="支付方式"
      >
        <template #default='scope'>
          <span v-if="scope.row.payType==1">微信支付</span>
          <span v-else-if="scope.row.payType==2">支付宝</span>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-popconfirm
            v-if="scope.row.orderStatus ==1"
            title="确定配货完成吗？"
            @confirm="handleConfig(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor:pointer;margin-right:10px">配货完成</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.orderStatus==2"
            title="确定出库吗？"
            @confirm="handleSend(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor:pointer;margin-right:10px;">出库</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="!(scope.row.orderStatus==4||scope.row.orderStatus<0)"
            title="确定关闭吗？"
            @confirm="handleClose(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor:pointer;margin-right:10px">关闭订单</a>
            </template>
          </el-popconfirm>
          <router-link :to="{path:'/order_detail',query:{id:scope.row.orderId}}">订单详情</router-link>
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
import{onMounted,reactive,ref,toRefs} from 'vue'
import {ElMessage} from 'element-plus'
import {getOrdersList,ordersCheckDone,ordersChenkOut,ordersClose} from '@/utils/api'
export default {
  name:'Order',
  setup(){
    const state = reactive({
      loading:false,
      tableData:[],
      multipleSelection:[],
      total:0,
      currentPage:1,
      pageSize:10,
      orderNo:'',
      orderStatus:'',
      option:[{
        value:'',
        label:'全部'
      },{
        value:0,
        label:'待支付'
      },{
        value:1,
        label:'已支付'
      },{
        value:2,
        label:'配货完成'
      },{
        value:3,
        label:'出货成功'
      },{
        value:4,
        label:'交易成功'
      },{
        value:-1,
        label:'手动关闭'
      },{
        value:-2,
        label:'超时关闭'
      },{
        value:-3,
        label:'商家关闭'
      }]
    })
    onMounted(()=>{
      getOrderList()
    })
    const getOrderList =()=>{
      state.loading=true
      getOrdersList(state.currentPage,state.pageSize,state.orderNo,state.orderStatus).then(res=>{
        state.tableData=res.list
        state.total=res.totalCount
        state.currentPage=res.currPage
        state.loading=false
      })
    }
    const handleOption = ()=>{
      state.currentPage =1 
      getOrderList()
    }
    const handleSelectionChange=(val)=>{
      state.multipleSelection=val
    }
    const changePage=(val)=>{
      state.currentPage=val
      getOrderList()
    }
    const handleConfig =(id)=>{
      let params
      if(id){
        params=[id]
      }else{
        if(!state.multipleSelection.length){
          ElMessage.error('请选择项')
          return
        }
        params=state.multipleSelection.map(i=>i.orderNo)
        ordersCheckDone(params).then(()=>{
          ElMessage.success('配货成功')
          getOrderList()
        })
      }
    }
    const handleSend = (id)=>{
      let params
      if(id){
        params=[id]
      }else{
        if(!state.multipleSelection.length){
          ElMessage.error('请选择项')
          return
        }
        params=state.multipleSelection.map(i=>i.orderNo)
        ordersChenkOut(params).then(()=>{
          ElMessage.success('出库成功')
          getOrderList()
        })
      }
    }
    const handleClose =(id)=>{
      let params
      if(id){
        params=[id]
      }else{
        if(state.multipleSelection.length){
          ElMessage.error('请选择项')
        }
        params=state.multipleSelection.map(i=>i.orderNo)
        ordersClose(params).then(()=>{
          ElMessage.success('关闭成功')
          getOrderList()
        })
      }
    }
    return{
      ...toRefs(state),
      handleOption,
      handleSelectionChange,
      changePage,
      handleConfig,
      handleSend,
      handleClose
    }
  }
}
</script>