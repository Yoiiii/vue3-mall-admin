 <template>
  <el-dialog
    :title="type== 'add'?'添加商品':'修改商品'"
    v-model="visible"
    width="400px"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="good-form"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
            <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="ruleForm.link"></el-input>
      </el-form-item>
            <el-form-item label="商品编号" prop="id">
        <el-input type="text" v-model="ruleForm.id"></el-input>
      </el-form-item>
            <el-form-item label="排序值" prop="sort">
        <el-input type="text" v-model="ruleForm.sort"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible=false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive,ref,toRefs} from 'vue'
import {ElMessage} from 'element-plus'
import {getIndexConfigsDetail,addIndexConfigs,editIndexConfigs} from '@/utils/api'
export default {
  name:'DialogAddHotGood',
  props:{
    type:String,
    configType:Number,
    reload:Function
  },
  setup(props){
    const formRef=ref(null)
    const state = reactive({
      visible:false,
      ruleForm:{
        name:'',
        link:'',
        sort:'',
        id:''
      },
      rules:{
        name:[
          {required:'true',message:'名称不能为空',trigger:['change']}
        ],
        id:[
          {required:'true',message:'编号不能为空',trigger:['change']}
        ],
        sort:[
          {required:true,message:'排序不能为空',trigger:['change']}
        ]
      },
      id:''
    })
    const getDetail=(id)=>{
      getIndexConfigsDetail(id).then(res=>{
        console.log(res);
        state.ruleForm={
          name:res.configName,
          id:res.goodeId,
          link:res.redirectUrl,
          sort:res.configRank
        }
      })
    }
    const open = (id)=>{
      state.visible=true
      if(id){
        state.id = id
        getDetail(id)
      }else{
        state.ruleFrom={
          name:'',
          id:'',
          link:'',
          sort:''
        }
      }
    }
    const close = ()=>{
      state.visible= false
    }
    const submitForm=()=>{
      formRef.value.validate((valid)=>{
        if(valid){
          if(state.ruleForm.id<0||state.ruleFrom.id>200){
            ElMessage.error('商品编号不能小于0或者大于200')
            return
          }
          if(props.type=='add'){
            addIndexConfigs(
              props.configType||3,
              state.ruleForm.name,
              state.ruleForm.link,
              state.ruleForm.id,
              state.ruleFrom.sort
            ).then(()=>{
              ElMessage.success('添加成功')
              state.visible=false
              if(props.reload) props.reload()
            })
          }else{
            editIndexConfigs(
              state.id,
              props.configType||3,
              state.ruleForm.name,
              state.ruleForm.link,
              state.ruleForm.id,
              state.ruleFrom.sort
            ).then(()=>{
              ElMessage.success('修改成功')
              state.visible=false
              if(props.reload) props.reload()
            })
          }
        }
      })
    }
    return{
      ...toRefs(state),
      open,
      close,
      formRef,
      submitForm
    }
  }
}
</script>