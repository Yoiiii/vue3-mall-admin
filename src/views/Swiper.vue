<template>
  <el-card class="swiper-container">
    <el-table
      :load="loading"
      :data='tableData'
      tooltip-effect="dark"
      style="width:100%"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="轮播图"
        width="200"
      >
        <template #default="scope">
          <img :src="scope.row.carouselUrl" alt="轮播图" style="width:150px;height:150px">
        </template>
      </el-table-column>
      
    </el-table>
  </el-card>
</template>

<script>
export default {
  name:'Swiper'
}
</script>