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
          <el-input style="width:300px" type="textarea"  v-model="goodForm.goodsIntro" placeholder="请输入商品简介(100字)"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="originalPrice">
          <el-input type="number" min="0" style="width:300px" v-model="goodForm.originalPrice" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input type="number" min="0" style="width:300px" v-model="goodForm.sellingPrice" placeholder="请输入商品"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input type="number" min="0" style="width:300px" v-model="goodForm.stockNum" placeholder="请输入商品库存"></el-input>
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
import {getCategories,getGoodsDetail,addGood} from '@/utils/api'
import {ElMessage} from 'element-plus'
import {useRoute,useRouter} from 'vue-router'
import {localGet,uploadImgServer,uploadImgsServer} from '@/utils'
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
      token:localGet('token') || '',
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
          const {level=0,value}=node
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
        token:state.token
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
            goodsName:goods.goodsName,
            goodsIntro:goods.goodsIntro,
            originalPrice:goods.originalPrice,
            stockNum:goods.stockNum,
            goodsSellStatus:String(goods.goodsStatus),
            goodsCoverImg:proxy.$filters.prefix(goods.goodsCoverImg),
            tag:goods.tag
          }
          state.categoryId=goods.goodsCategoryId
          state.defaultCate=`${firstCategory.categoryName}/${secondCategory.categoryName}/${thirdCategory.categoryName}`
          if(instance){
            instance.txt.html(goods.goodsDetailContent)
          }
        })
      }
    })
    onBeforeUnmount(()=>{
      instance.destory()
      instance=null
    })

    const submitAdd=()=>{
      goodRef.value.validate((vaild)=>{
        if(vaild){
          addGood(
            state.categoryId,
            state.goodForm.goodsCoverImg,
            instance.txt.html(),
            state.goodForm.goodsIntro,
            state.goodForm.goodsName,
            state.goodForm.goodsSellStatus,
            state.goodForm.originalPrice,
            state.goodForm.sellingPrice,
            state.goodForm.stockNum,
            state.goodForm.tag
          ).then(()=>{
            ElMessage.success(id?'修改成功':'添加成功')
            router.push({path:'/good'})
          })
        }
      })
    }
    const handleBeforeUpload=(file=>{
      const sufix= file.name.split('.')[1]||''
      if(!['jpg','jpeg','png'].includes(sufix)){
        ElMessage.success('请上传jpg、jpeg、png格式的图片')
        return false
      }
    })

    const handleUrlSuccess =( val)=>{
      state.goodForm.goodsCoverImg=val.data || ''
    }

    const handleChangeCate = (val)=>{
      state.categoryId=val[2]||0
    }
    return{
      ...toRefs(state),
      goodRef,
      submitAdd,
      handleBeforeUpload,
      handleUrlSuccess,
      editor,
      handleChangeCate
    }
  }
}
</script>

<style scoped>
.add {
  display: flex;
}
.add-container{
  flex:1;
  height:100%;
}
.avatar-uploader{
  width:100px;
  height: 100px;
  color:#ddd;
  font-size: 30px;
}
.avatar-uploader-icon{
  display: block;
  width: 100px;
  height:100px;
  border:1px sold #e9e9e9;
  padding:32px 17px;
}
</style>