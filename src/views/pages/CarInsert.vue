<template>
  <!-- ===============================拖曳上傳=============================== -->
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
  
  <br><br><br><br>
  <div class="d-flex flex-row">
    <div class="p-2">
      <div class="d-flex flex-column">
  <!-- =======================品牌======================= -->
    <label>品牌</label>
    <select id="brand" required>
      <option>選擇你要的品牌</option>
      <option>BMW</option>
      <option>袋鼠會吃人</option>
      <option>唐人街拳法</option>
    </select> 
  
  <!-- =======================車型======================= -->
    <label for="suspension">車型</label>
    <select id="suspension" required>
      <option option value="" disabled>選擇你要的車型</option>
      <option value="suspension 1">轎車</option>
      <option value="suspension 2">休旅車</option>
      <option value="suspension 3">敞篷車</option>
      <option value="suspension 4">跑車</option>
      <option value="suspension 5">吉普車</option>
      <option value="suspension 6">掀背車</option>
    </select> 
  
  <!-- =======================馬力======================= -->
    <label for="hp">馬力</label>
    <input type="text"  id="hp" required />
  
  <!-- =======================扭力======================= -->
    <label for="torque">扭力</label>
    <input type="text"  id="torque" required />
  
  <!-- =======================排氣量======================= -->
    <label for="displacement">排氣量</label>
    <select id="displacement" required>
      <option option value="" disabled>選擇你要的排氣量</option>
      <option value="displacement 1">1200cc以下</option>
      <option value="displacement 2">1201cc-1800cc</option>
      <option value="displacement 3">1801cc-2400cc</option>
      <option value="displacement 4">2401cc-3000cc</option>
      <option value="displacement 5">3001cc-4200cc</option>
      <option value="displacement 6">4201cc-5400cc</option>
    <option value="displacement 7">5401cc以上</option>
    </select> 
  
  
  <!-- =======================變速系統======================= -->
    <label for="transmission">變速系統</label>
    <select id="transmission" required>
      <option option value="" disabled>選擇你要的引擎燃料</option>
      <option value="transmission 1">自排</option>
      <option value="transmission 2">手排</option>
      <option value="transmission 3">手自排</option>
      <option value="transmission 4">自手排</option>
    </select> 
  
  <!-- =======================驅動方式======================= -->
  <label for="rearWheel">驅動方式</label>
  <div class="d-flex flex-row align-items-center">
   <input type="radio" name="rearWheel">前驅
   <input type="radio" name="rearWheel">後驅
   <input type="radio" name="rearWheel">四驅
  </div>
  <!-- =======================引擎燃料======================= -->
    <label for="gasoline">引擎燃料</label>
    <select id="gasoline" required>
      <option option value="" disabled>選擇你要的引擎燃料</option>
      <option value="gasoline 1">汽油</option>
      <option value="gasoline 2">柴油</option>
      <option value="gasoline 3">油電複合</option>
      <option value="gasoline 4">純電</option>
    </select> 
  
  <!-- =======================車門數======================= -->
    <label for="door">車門數</label>
    <select id="door" required>
      <option option value="" disabled>選擇你要的車門數</option>
      <option value="door 1">二門</option>
      <option value="door 2">三門</option>
      <option value="door 3">四門</option>
      <option value="door 4">五門</option>
      <option value="door 5">六門</option>
    </select> 
  
  <!-- =======================乘客數======================= -->
    <label for="passenger">乘客數</label>
    <select id="passenger" required>
      <option option value="" disabled>選擇能容納的乘客數</option>
      <option value="passenger 1">二人座</option>
      <option value="passenger 2">四人座</option>
      <option value="passenger 3">五人座</option>
      <option value="passenger 4">七人座以上</option>
    </select> 
  
  <!-- =======================顏色======================= -->
    <label for="color">顏色</label>
    <input type="text"  id="color" required />
  
  <!-- =======================里程數======================= -->
        <label>里程數</label>
        <input type="text" v-model="milage" required />
  
  <!-- =======================出廠年份======================= -->
        <label>年分</label>
        <input type="text" v-model="productionYear" required />
  </div>
</div>


  <div class="p-2">
    <div class="d-flex flex-column">
  <!-- =======================賣家======================= -->
    <label for="customer">賣家</label>
    <input type="text"  id="customer" required />
  
  <!-- =======================管理銷售員======================= -->
    <label for="employee">管理銷售員</label>
    <input type="text"  id="employee" required />
  
  <!-- =======================議價空間======================= -->
    <label for="negotiable">議價空間</label>
    <input type="text"  id="negotiable" required />
  
  <!-- =======================車況評分======================= -->
    <label for="conditionScore">車況評分</label>
    <input type="text"  id="conditionScore" required />
  
  <!-- =======================停放分店======================= -->
    <label for="branch">停放分店</label>
    <input type="text"  id="branch" required />
  
  <!-- =======================狀態======================= -->
    <label for="staste">狀態</label>
    <select id="passenger" required>
      <option option value="" disabled>選擇能容納的乘客數</option>
      <option value="passenger 1">二人座</option>
      <option value="passenger 2">四人座</option>
      <option value="passenger 3">五人座</option>
      <option value="passenger 4">七人座以上</option>
    </select> 
  
  <!-- =======================售價======================= -->
        <label>價格</label>
        <input type="text" v-model="price" required />
  
  <!-- =======================型號======================= -->
      <label>車輛名稱搜尋</label>
      <input type="text" v-model="selectName" required />
  
  <!-- =======================是否改裝======================= -->
    <label for="customerId">是否改裝</label>
    <input type="text"  id="customerId" required />
  </div>
  </div>
</div>

  
  <button type="submit">新增草稿</button>
  <button type="submit">取消</button>
</template>
    
<script setup>
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn, UploadFilled } from '@element-plus/icons-vue'


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