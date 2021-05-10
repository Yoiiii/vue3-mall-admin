<template>
  <div class="add">
    <el-card class="add-container">
      <el-form :model="goodForm" :rules="rules" ref="goodRef" label-width="100px" class="goodForm">
        <el-form-item required label="商品分类">
          <el-cascader :placeholder="defaultCate" style="width:300px" :props="category" @change="handleChangeCate"></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input style="width:300px" v-model="goodForm.goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input style="width:300px" type="textarea"  v-model="goodsForm.goodsIntro" placeholder="请输入商品简介(100字)"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="originalPrice">
          <el-input type="number" min="0" style="width:300px" v-model="goodForm.originalPrice" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input type="number" min="0" style="width:300px" v-model="goodsForm.sellingPrice" placeholder="请输入商品"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input type="number" min="0" style="width:300px" v-model="goodsForm.stockNum" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tag">
          <el-input style="width:300px" v-model="goodForm.tag" placeholder="请输入商品小标签"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="goodsSellStatus">
          <el-radio-group v-model="goodForm.goodsSellStatus"> 
            <el-radio label="0">上架</el-radio>
            <el-radio label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item required label="商品主图" prop="goodsCoverImg">
          <el-upload
            class="avatar-upload"
            :action="uploadImgServer"
            accept="jpg,jpeg,png"
            :headers="{token:token}"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleUrlSuccess"
          >
            <img src="goodsForm.goodsCoverImg" class="avatar" alt="" style="width:100px;height:100px;border:1px solid #e9e9e9;" v-if="goodForm.goodsCoverImg">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情内容">
          <div ref="editor"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{id?'立刻修改':'立刻创建'}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {reactive,ref,toRefs,onMounted,onBeforeUnmount,getCurrentInstance} from 'vue'
import WangEditor from 'wangeditor'
import {getCategories,getGoodsDetail} from '@/utils/api'
import {ElMessage} from 'element-plus'
import {useRoute,useRouter} from 'vue-router'
import {loaclGet,uploadImgServer,uploadImgsServer} from '@/utils'
export default {
  name:'AddGood',
  setup(){
    const {proxy} =getCurrentInstance()
    const editor =ref(null)
    const goodRef =ref(null)
    const route = useRoute()
    const router =useRouter()
    const {id} = route.query
    const state = reactive({
      uploadImgServer,
      token:loaclGet('token') || '',
      id:id,
      defaultCata:'',
      goodForm:{
        goodsName:'',
        goodsIntro:'',
        originalPrice:'',
        sellingPrice:'',
        stockNum:'',
        goodsSellStatus:'0',
        goodsCoverImg:'',
        tag:''
      },
      rules:{
        goodsName:[
          {required:'true',message:'请填写商品名称',trigger:['change']}
        ],
        originalPrice:[
          {required:'true',message:'请填写商品价格',trigger:['change']}
        ],
        sellingPrice:[
          {required:'true',message:'请填写商品售价',trigger:['change']}
        ],
        stockNum:[
          {required:'true',message:'请填写商品库存',trigger:['change']}
        ]
      },
      categoryId:'',
      category:{
        lazy:true,
        lazyLoad(node,resolve){
          const {level=0,value}=none
          getCategories(1,1000,level+1,value||0).then(res=>{
            const list =res.list
            const nodes=list.map(item=>({
              value:item.categoryId,
              label:item.categoryName,
              leaf:level>1
            }))
            resolve(nodes)
          })
        }
      }
    })
    let instance
    onMounted(() => {
      instance = new WangEditor(editor.value)
      instance.config.showLinkImg=false
      instance.config.showLinkImagAlt=false
      instance.config.showLinkImgHref=false
      instance.config.uploadImgMaxSize= 2*1024*1024
      instance.config.uploadFileName='file'
      instance.config.uploadImgHeader={
        token:satate.token
      }
      instance.config.uploadImgHooks={
        customInsert:function(insertImgFn,result){
          console.log('result,result');
          if(result.data&& result.data.length){
            result.data.forEach(item=>insertImgFn(item))
          }
        }
      }
      instance.config.uploadImgServer= uploadImgsServer
      Object.assign(instance.config,{
        onchange(){
          console.log('change');
        },
      })
      instance.create()
      if(id){
        getGoodsDetail(id).then(res=>{
          const {goods,firstCategory,secondCategory,thirdCategory}= res
          state.goodForm = {
            goodsName:good.goodsName,
            goodsIntro:good.goodsIntro,
            originalPrice:good.originalPrice,
            stockNum:good.stockNum,
            goodsSe
          }
        })
      }
    })
  }
}
</script>