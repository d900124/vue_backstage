<template >
<div>
    <el-upload
    class="upload-demo"
    drag
    multiple
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    list-type="picture-card"
    action="http://localhost:8080/kajarta/image/createImage"
    :auto-upload="false"
    :data="uploadData"
    ref="upload"
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


  <!-- <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :file-list="fileList"
    ref="upload"
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

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog> -->

  <!-- =======================圖片上傳區塊======================= -->






  <div v-for="file in uploadedFiles" :key="file.uid">
  <img :src="file.url" alt="Uploaded image" />
  <p>{{ file.url }}</p> <!-- Debug URL -->
</div>



  
</div>
<label>是否為清單小圖</label>
    <select name="isListPic" :value="modelValue.isListPic"  @change="doInput('isListPic',$event)" required>
      <option option value="" disabled>是否為清單小圖</option>
      <option value="1">是</option>
      <option value="2">否</option>
    </select> 

<label>是否為產品主圖</label>
<select name="isMainPic" :value="modelValue.isMainPic"  @change="doInput('isMainPic',$event)" required>
      <option option value="" disabled>是否為產品主圖</option>
      <option value="1">是</option>
      <option value="2">否</option>
    </select> 

<label>carId</label>
<input type="text" name="carId" :value="modelValue.carId" @input="doInput('carId',$event)" required />

        <div class="d-flex flex-row">
    <div class="p-2">
      <div class="d-flex flex-column">
  <!-- =======================品牌======================= -->
    <label>品牌</label>
    <select name="brand" :value="modelValue.brand" @change="doInput('brand',$event)" required>
      <option value="" disabled>選擇品牌</option>
      <option value="1">HONDA</option>
      <option value="2">TOYOTA</option>
      <option value="3">MAZDA</option>
      <option value="4">BENZ</option>
      <option value="5">PORSCHE</option>
      <option value="6">BMW</option>
      <option value="7">VOLSWAGEN</option>
      <option value="8">NISSAN</option>
      <option value="9">SUBARU</option>
    </select> 
  
  <!-- =======================車型======================= -->
    <label >車型</label>
    <select name="suspension" :value="modelValue.suspension"  @change="doInput('suspension',$event)" required>
      <option value="" disabled>選擇車型</option>
      <option value="1">轎車</option>
      <option value="2">休旅車</option>
      <option value="3">敞篷車</option>
      <option value="4">跑車</option>
      <option value="5">吉普車</option>
      <option value="6">掀背車</option>
    </select> 
  
  <!-- =======================馬力======================= -->
    <label >馬力</label>
    <input type="text" name="hp" :value="modelValue.hp" @input="doInput('hp',$event)" required />
  
  <!-- =======================扭力======================= -->
    <label >扭力</label>
    <input type="text" name="torque" :value="modelValue.torque" @input="doInput('torque',$event)" required />
  
  <!-- =======================排氣量======================= -->
    <label>排氣量</label>
    <select name="cc" :value="modelValue.cc"  @change="doInput('cc',$event)" required>
      <option option value="" disabled>選擇你要的排氣量</option>
      <option value="1">1200cc以下</option>
      <option value="2">1201cc-1800cc</option>
      <option value="3">1801cc-2400cc</option>
      <option value="4">2401cc-3000cc</option>
      <option value="5">3001cc-4200cc</option>
      <option value="6">4201cc-5400cc</option>
      <option value="7">5401cc以上</option>
    </select> 
  
  
  <!-- =======================變速系統======================= -->
    <label>變速系統</label>
    <select  name="transmission" :value="modelValue.transmission"  @change="doInput('transmission',$event)" required>
      <option value="" disabled>選擇你要的引擎燃料</option>
      <option value="1">自排</option>
      <option value="2">手排</option>
      <option value="3">手自排</option>
      <option value="4">自手排</option>
    </select> 
  
  <!-- =======================驅動方式======================= -->
  <label >驅動方式</label>
  <select name="rearwheel" :value="modelValue.rearwheel"  @change="doInput('rearwheel',$event)" required><
      <option value="" disabled>選擇你要的驅動方式</option>
      <option value="1">前驅</option>
      <option value="2">後驅</option>
      <option value="3">四驅</option>
  </select>
  <!-- =======================引擎燃料======================= -->
    <label for="gasoline">引擎燃料</label>
    <select name="gasoline" :value="modelValue.gasoline"  @change="doInput('gasoline',$event)" required>
      <option value="" disabled>選擇你要的引擎燃料</option>
      <option value="1">汽油</option>
      <option value="2">柴油</option>
      <option value="3">油電複合</option>
      <option value="4">純電</option>
    </select> 
  
  <!-- =======================車門數======================= -->
    <label for="door">車門數</label>
    <select id="door" name="door" :value="modelValue.door"  @change="doInput('door',$event)" required>
      <option value="" disabled>選擇你要的車門數</option>
      <option value="1">二門</option>
      <option value="2">三門</option>
      <option value="3">四門</option>
      <option value="4">五門</option>
      <option value="5">六門</option>
    </select> 
  
  <!-- =======================乘客數======================= -->
    <label for="passenger">乘客數</label>
    <select name="passenger" :value="modelValue.passenger"  @change="doInput('passenger',$event)" required>
      <option value="" disabled>選擇能容納的乘客數</option>
      <option value="1">二人座</option>
      <option value="2">四人座</option>
      <option value="3">五人座</option>
      <option value="4">七人座以上</option>
    </select> 
  
  <!-- =======================顏色======================= -->
    <label>顏色</label>
    <input type="text" name="color" :value="modelValue.color" @input="doInput('color',$event)" required />
  
  <!-- =======================里程數======================= -->
        <label>里程數</label>
        <input type="text" name="milage" :value="modelValue.milage" @input="doInput('milage',$event)" required />
  
  <!-- =======================出廠年份======================= -->
        <label>年分</label>
        <input type="text" name="productionYear" :value="modelValue.productionYear" @input="doInput('productionYear',$event)" required />
  </div>
</div>


  <div class="p-2">
    <div class="d-flex flex-column">
  <!-- =======================賣家======================= -->
    <label for="customer">賣家</label>
    <input type="text" name="customerId" :value="modelValue.customerId" @input="doInput('customerId',$event)" required />
  
  <!-- =======================管理銷售員======================= -->
    <label for="employee">管理銷售員</label>
    <input type="text" name="employeeId" :value="modelValue.employeeId" @input="doInput('employeeId',$event)" required />
  
  <!-- =======================議價空間======================= -->
    <label for="negotiable">議價空間</label>
    <select name="negotiable" :value="modelValue.negotiable"  @change="doInput('negotiable',$event)" required>
      <option value="" disabled>選擇能容納的乘客數</option>
      <option value="1">5%</option>
      <option value="2">10%</option>
      <option value="3">15%</option>
      <option value="4">20%</option>
    </select> 
  
  <!-- =======================車況評分======================= -->
    <label for="conditionScore">車況評分</label>
    <input type="text" name="conditionScore" :value="modelValue.conditionScore" @input="doInput('conditionScore',$event)" required />
  
  <!-- =======================停放分店======================= -->
    <label for="branch">停放分店</label>
    <select name="branch" :value="modelValue.branch"  @change="doInput('branch',$event)" required>
      <option value="" disabled>選擇能容納的乘客數</option>
      <option value="1">台北市</option>
      <option value="2">台中市</option>
      <option value="3">高雄市</option>
    </select> 
  
  <!-- =======================狀態======================= -->
    <label for="state">狀態</label>
    <input type="text"  name="state" :value="modelValue.state" @input="doInput('state',$event)" required />
  
  
  <!-- =======================售價======================= -->
        <label>價格</label>
        <input type="text" name="price" :value="modelValue.price" @input="doInput('price',$event)" required />
  
  <!-- =======================型號======================= -->
      <label>車輛型號</label>
      <input type="text" name="modelname" :value="modelValue.modelname" @input="doInput('modelname',$event)" required />
  
  <!-- =======================是否改裝======================= -->
    <label >是否改裝</label>
    <select name="remark" :value="modelValue.remark"  @change="doInput('remark',$event)" required>
      <option value="" disabled>是否有改裝</option>
      <option value="1">有</option>
      <option value="2">無</option>
    </select> 

    <label >上架日期</label>
    <input type="text"  name="launchDate" :value="modelValue.launchDate" @input="doInput('launchDate',$event)" required />

    <label >carinfoId</label>
    <input type="text" name="carinfoId" :value="modelValue.carinfoId" @input="doInput('carinfoId',$event)" required />
  </div>
  </div>
</div>


<div v-for="file in uploadedFiles" :key="file.uid">
    <img :src="file.url" alt="Uploaded image" />
</div>
  

<button @click="submitForm">新增草稿</button>
</template>
    
<script lang='ts' setup >
import { ref } from 'vue'
import axios from 'axios'
import { UploadFilled } from '@element-plus/icons-vue'
// import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
// import  { UploadFile } from 'element-plus'

const props = defineProps(["modelValue"]);
const emits = defineEmits(["customInsert","update:modelValue"]);

const uploadData = ref({
  carId: 1
});

function doInput(key,event) {
    // emits('update:modelValue',{
    //     ...props.modelValue,
    //     [key]:event.target.value
    // });

    // uploadData.value[key] = event.target.value;

    const value = event.target.value;
    
    emits('update:modelValue', {
        ...props.modelValue,
        [key]: value
    });

    if (key !== 'images') {
        uploadData.value[key] = value;
    }


}



const dialogImageUrl = ref('')
const dialogVisible = ref(false)
// const disabled = ref(false)
// const fileList = ref([])
const uploadedFiles = ref([])

const handleRemove = (file) => {
  console.log('Removed file:', file)
  uploadedFiles.value = uploadedFiles.value.filter(f => f.uid !== file.uid)
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
  console.log("Preview file:", file);
}

const handleSuccess = (response, file) => {
      // file.url = URL.createObjectURL(file.raw)
      // console.log("File raw data:", file.raw);
      console.log("File successfully uploaded:", file);
      uploadedFiles.value.push(file);
    }

// const handleDownload = (file) => {
//   console.log('Download file:', file)
// }






function submitForm() {
    console.log("Uploaded Files Before Submit:", uploadedFiles.value);

    const formData = new FormData();

    // 添加表单字段
    Object.keys(props.modelValue).forEach(key => {
        formData.append(key, props.modelValue[key]);
    });

    // 添加文件
    uploadedFiles.value.forEach(file => {
        formData.append('images', file.raw, file.name);
    });

    // 调试输出
    // for (let [key, value] of formData.entries()) {
    //     console.log("formData",key, value);
    // }

    // 发送请求
    axios.post('http://localhost:8080/kajarta/image/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log("Response:", response);
    })
    .catch(error => {
        console.log("Error:", error);
    });
}


   // Emit the combined data
    emits('customInsert', {
        additionalData: props.modelValue
    });


   // Emit the combined data
    emits('customInsert', {
        additionalData: props.modelValue
    });



</script>
    
<style>

</style>