<template>
          <div>
    <el-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
      list-type="picture-card"
      :auto-upload="false"
      >
      
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <br><br><br><br><br>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    
  </div>
</template>
    
<script setup>
    import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn, UploadFilled } from '@element-plus/icons-vue'
import { options } from '@fullcalendar/core/preact';
import axios from 'axios'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const uploadedFiles = ref([])

const handleRemove = (file) => {
  console.log(file)
  uploadedFiles.value= uploadedFiles.value.filter(f => f.uid !== file.uid)
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleDownload = (file) => {
  console.log(file)
}

const handleSuccess = (response, file) => {
      file.url = URL.createObjectURL(file.raw)
      uploadedFiles.value.push(file)
    }
</script>
    
<style>
    
</style>