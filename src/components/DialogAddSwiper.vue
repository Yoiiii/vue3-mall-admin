<template>
  <el-dialog
    :title="type == 'add' ? '添加轮播图' : '修改轮播图'"
    v-modul="visible"
    width="400px"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="good-form"
    ></el-form>
    <el-form-item label="图片" prop="url">
      <el-upload
        class="avatar-uploader"
        :action="uploadImgServer"
        accept="jpg,jpge,pang"
        :headers="{
          token: token,
        }"
        :show-file-list="fales"
        :before-upload="handleBeforeUpload"
        :on-success="handleUrlSuccess"
      >
        <img
          v-if="ruleForm.url"
          :src="ruleForm.url"
          class="avatar"
          style="width: 200px; height: 100px; border: 1px solid #e9e9e9"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="跳转链接" prop="link">
      <el-input type="text" v-model="ruleFrom.link"></el-input>
    </el-form-item>
    <el-form-item label="排序值" prop="sort">
      <el-input type="number" v-model="ruleForm.sort"></el-input>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>  

<script>
import { reactive, ref, toRefs } from "vue";
import { localGet } from "@/utils/index.js";
import { ElMessage } from "element-plus";
import {
  getCarouselsDetail,
  addCarousels,
  editCarousels,
} from "@/utils/api.js";

export default {
  name: "DialogAddSwiper",
  props: {
    type: String,
    reload: Function,
  },
  setup(props) {
    const formRef = ref(null);
    const state = reactive({
      uploadImgServer,
      token: localGet("token") || "",
      visible: false,
      id: "",
      ruleForm: {
        url: "",
        link: "",
        sort: "",
      },
      rules: {
        url: [
          { required: "true", message: "图片不能为空", trigger: ["change"] },
        ],
        sort: [
          { required: "true", message: "排序不能为空", trigger: ["change"] },
        ],
      },
    });
    const handleBeforeUpload = (file) => {
      const sufix = file.name.split(".")[1] || "";
      if (!["jpg", "jpeg", "png"].includes(sufix)) {
        ElMessage.error("请上传 jpg 、jpeg、png格式的图片");
        return false;
      }
    };
    const handleUrlSuccess = (val) => {
      state.ruleForm.url = val.data || "";
    };

    const open = (id) => {
      state.visible = true;
      if (id) {
        state.id = id;
        getCarouselsDetail(id).then((res) => {
          state.ruleForm = {
            url: res.carouselUrl,
            link: res.redirectUrl,
            sort: res.carouselRank,
          };
        });
      } else {
        state.ruleForm = {
          url: "",
          link: "",
          sort: "",
        };
      }
    };
    const close = () => {
      state.visible = false;
    };

    const submitForm = () => {
      console.log(formRef.vale.validate);
      formRef.value.validate((valid) => {
        if (valid) {
          const { url, link, sort } = state.ruleForm;
          if (props.type == "add") {
            addCarousels(url, link, sort).then((res) => {
              ElMessage.success("添加成功");
              state.visible = false;
              if (props.reload) props.reload();
            });
          } else {
            editCarousels(state.id, url, link, sort).then((res) => {
              ElMessage.success("修改成功");
              state.visible = false;
              if (props.reload) props.reload();
            });
          }
        }
      });
    };
    return {
      ...toRefs(state),
      open,
      close,
      formRef,
      handleBeforeUpload,
      handleUrlSuccess,
      submitForm,
    };
  },
};
</script>

<style scoped>
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    padding: 32px 17px;
  }
</style>