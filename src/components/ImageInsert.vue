<template>
    <div>
      <!-- 图片上传 -->
      <el-upload
        class="upload-demo"
        action="#" 
        list-type="picture-card" 
        :auto-upload="false"
        drag
      >
        <el-icon><Plus /></el-icon>
  
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><ZoomIn /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <el-icon><Download /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
  
      <!-- 上传提示 -->
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
  
      <!-- 图片预览对话框 -->
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { Delete, Download, Plus, ZoomIn, UploadFilled } from '@element-plus/icons-vue'
  import type { UploadFile } from 'element-plus'
  
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const disabled = ref(false)
  
  const handleRemove = (file: UploadFile) => {
    console.log(file)
  }
  
  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
  }
  
  const handleDownload = (file: UploadFile) => {
    console.log(file)
  }
  </script>
  
  <style>

</style>