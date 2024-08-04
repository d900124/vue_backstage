<template>
  

  <el-dialog v-model="dialogFormVisible" title="車輛資料" width="1000px">
    <div class="dialog-container">
      <!-- 左側區塊 -->
      <div class="left-column">
        <el-form :model="form">
          <!-- 車型 -->
          <el-form-item label="車型" :label-width="formLabelWidth">
            <el-select v-model="form.carinfoId" @change="value => doInput('carinfoId', value)" placeholder="選擇你要的車型"
              required>
              <el-option value="" disabled>選擇你要的車型</el-option>
              <el-option v-for="carinfoData in carinfoDatas" :key="carinfoData.id" :label="carinfoData.modelName"
                :value="carinfoData.id" />
            </el-select>
          </el-form-item>

          <!-- 里程數 -->
          <el-form-item label="里程數" :label-width="formLabelWidth">
            <el-input v-model="form.milage" autocomplete="off" required @input="value => doInput('milage', value)" />
          </el-form-item>

          <!-- 年分 -->
          <el-form-item label="出廠年份" :label-width="formLabelWidth">
            <el-input v-model="form.productionYear" autocomplete="off" required
              @input="value => doInput('productionYear', value)" />
          </el-form-item>

            <!-- 價格 -->
            <el-form-item label="價格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off" required @input="value => doInput('price', value)" />
          </el-form-item>

          <!-- 顏色 -->
          <el-form-item label="顏色" :label-width="formLabelWidth">
            <el-input v-model="form.color" autocomplete="off" required @input="value => doInput('color', value)" />
          </el-form-item>

          <!-- 賣家 -->
          <el-form-item label="賣家" :label-width="formLabelWidth">
            <el-input v-model="form.customerId" autocomplete="off" required
              @input="value => doInput('customerId', value)" />
          </el-form-item>

          <!-- 管理銷售員 -->
          <el-form-item label="管理銷售員" :label-width="formLabelWidth">
            <el-input v-model="form.employeeId" autocomplete="off" required
              @input="value => doInput('employeeId', value)" />
          </el-form-item>
        </el-form>
      </div>

      <!-- 右側區塊 -->
      <div class="right-column">
        <el-form :model="form">
          <!-- 議價空間 -->
          <el-form-item label="議價空間" :label-width="formLabelWidth">
            <el-select v-model="form.negotiable" @change="value => doInput('negotiable', value)" placeholder="選擇議價空間"
              required>
              <el-option value="" disabled>選擇議價空間</el-option>
              <el-option v-for="option in negotiableOptions" :key="option.value" :label="option.label"
                :value="option.value" />
            </el-select>
          </el-form-item>

           <!-- 停放分店 -->
           <el-form-item label="停放分店" :label-width="formLabelWidth">
            <el-select v-model="form.branch" @change="value => doInput('branch', value)" placeholder="選擇停放的分店" required>
              <el-option value="" disabled>選擇停放的分店</el-option>
              <el-option v-for="branch in branches" :key="branch.value" :label="branch.label" :value="branch.value" />
            </el-select>
          </el-form-item>

           <!-- 是否改裝 -->
           <el-form-item label="是否改裝" :label-width="formLabelWidth">
            <el-select v-model="form.remark" @change="value => doInput('remark', value)" placeholder="是否有改裝" required>
              <el-option value="" disabled>是否有改裝</el-option>
              <el-option v-for="option in remarkOptions" :key="option.value" :label="option.label"
                :value="option.value" />
            </el-select>
          </el-form-item>

          <!-- 車況評分 -->
          <el-form-item label="車況評分" :label-width="formLabelWidth">
            <el-input v-model="form.conditionScore" autocomplete="off" required
              @input="value => doInput('conditionScore', value)" />
          </el-form-item>

          <!-- 上架日期 -->
          <el-form-item label="上架日期" :label-width="formLabelWidth">
            <el-input v-model="form.launchDate" autocomplete="off" required
              @input="value => doInput('launchDate', value)" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClick()">
          下一步
        </el-button>
      </div>
    </template>
  </el-dialog>


    <!-- 主圖 -->
  <div class="dialog-wrapper">
    <el-dialog v-model="newDialogVisible" title="選擇主圖" width="600px" class="centered-dialog">
      <div class="dialog-content">
        <div class="upload-section">
          <div class="upload-header">
            <label for="images">檔案：</label>
            <FileUpload class="btn btn-primary" accept=".jpg,.png,.jpeg" input-id="images" input-name="images"
              v-model="images" :multiple="true">
              選擇檔案
            </FileUpload>
          </div>
          <div class="file-list">
            <table>
              <tbody>
                <tr v-for="(image, index) in images" :key="image.id">
                  <td>{{ image.name }}</td>
                  <td><el-button type="danger" @click="deleteFile(index)">刪除檔案</el-button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpload">下一步</el-button>
      </span>
    </el-dialog>

    <!-- 清單 -->
    <el-dialog v-model="listDialogVisible" title="選擇清單圖" width="600px" class="centered-dialog">
      <div class="dialog-content">
        <div class="upload-section">
          <div class="upload-header">
            <label for="images">檔案：</label>
            <FileUpload class="btn btn-primary" accept=".jpg,.png,.jpeg" input-id="images" input-name="images"
              v-model="images" :multiple="true">
              選擇檔案
            </FileUpload>
          </div>
          <div class="file-list">
            <table>
              <tbody>
                <tr v-for="(image, index) in images" :key="image.id">
                  <td>{{ image.name }}</td>
                  <td><el-button type="danger" @click="deleteFile(index)">刪除檔案</el-button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="listUpload">下一步</el-button>
      </span>
    </el-dialog>
  </div>





</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import axios from 'axios'
import axiosapi from '@/plugins/axios';
import FileUpload from 'vue-upload-component'
import Swal from 'sweetalert2';


const props = defineProps(["modelValue", "carinfoData"]);
const emits = defineEmits(["customInsert", "update:modelValue"]);
const kajartaUrl = import.meta.env.VITE_API_URL;

const carinfoDatas = ref([]);
const dialogFormVisible = ref(true);
const newDialogVisible = ref(false);
const listDialogVisible = ref(false);
const formLabelWidth = '140px';

const branches = [
  { value: '1', label: '台北市' },
  { value: '2', label: '台中市' },
  { value: '3', label: '高雄市' }
];
const negotiableOptions = [
  { value: '1', label: '5%' },
  { value: '2', label: '10%' },
  { value: '3', label: '15%' },
  { value: '4', label: '20%' }
];
const remarkOptions = [
  { value: '1', label: '有' },
  { value: '0', label: '無' }
];

const form = reactive({
  carinfoId: '',
  color: '',
  milage: '',
  productionYear: '',
  customerId: '',
  employeeId: '',
  negotiable: '',
  conditionScore: '',
  branch: '',
  state: 1,
  price: '',
  remark: '',
  launchDate: '',
});

function doInput(key, event) {
  let value;
  if (event && event.target) {
    value = event.target.value;
  } else if (event !== undefined) {
    value = event;
  } else {
    console.error(`Invalid event object passed to doInput for key: ${key}`, event);
    return;
  }
  emits('update:modelValue', {
    ...props.modelValue,
    [key]: value
  });
}

onMounted(function () {
  callCarinfoFind();
});

function callCarinfoFind() {
  axiosapi.get(`/carinfo/list`)
    .then(function (response) {
      if (response && response.data) {
        console.log("response", response);
        carinfoDatas.value = response.data.list;
      } else {
        console.error("Invalid response data structure:", response);
      }
    })
    .catch(function (error) {
      console.error("Error fetching data:", error, response);
      Swal.fire({
        text: "查詢失敗：" + error.message,
        icon: "error"
      });
    });
}

// 圖片上傳相關code
const images = ref([]);
const isListPic = ref('');
const isMainPic = ref('');
const carId = ref('');

function validate(selected) {
  console.log("selected", selected)
  if (selected.length == 0) {
    alert("請選擇檔案");
    return false;
  }
  for (let i = 0; i < selected.length; i++) {
    let uploadFile = selected[0];
    if (uploadFile.size > 10000000) {
      alert("檔案大小超出限制(10M)");
      return false;
    }
  }
  return true;
}
function domultiple() {
  if (!validate(images.value)) {
    images.value = [];
    return;
  }

}


function handleClick() {
  dialogFormVisible.value = false;
  emits('customInsert');
  setTimeout(() => {
    axios.get(`${kajartaUrl}/car/latest-car`)
      .then((response) => {
        carId.value = response.data.id;
        newDialogVisible.value = true;
        isListPic.value = '0'
        isMainPic.value = '1'
      })
      .catch((error) => {
        console.error('Failed to get the latest car ID:', error);
      });
  }, 0);
}

function handleUpload() {

  let formData = new FormData();

  images.value.forEach(image => {
    formData.append("images", image.file);
  });
  if (!validate(images.value)) {
    images.value = [];
    return;
  }
  formData.append("isListPic", isListPic.value);
  formData.append("isMainPic", isMainPic.value);
  formData.append("carId", carId.value);

  axios.post(`${kajartaUrl}/image/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  images.value = [];
  newDialogVisible.value = false;
  setTimeout(() => {
    listDialogVisible.value = true;
    isListPic.value = '1'
    isMainPic.value = '0'
  }, 0);

}

function listUpload() {
 
  let formData = new FormData();
  images.value.forEach(image => {
    formData.append("images", image.file);
  });
  if (!validate(images.value)) {
    images.value = [];
    return;
  }
  formData.append("isListPic", isListPic.value);
  formData.append("isMainPic", isMainPic.value);
  formData.append("carId", carId.value);

  axios.post(`${kajartaUrl}/image/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  listDialogVisible.value = false;
  Swal.fire({
    icon: "success",
    text: "車輛新增成功",
  })
}


function deleteFile(index) {
  images.value.splice(index, 1);
}
</script>

<style scoped>
.dialog-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.left-column,
.right-column {
  flex: 1;
  max-width: 48%;
}

.el-form-item {
  margin-bottom: 15px;
}

.dialog-footer {
  text-align: right;
}

.dialog-content {
  padding: 20px;
}

.upload-section {
  display: flex;
  flex-direction: column;
}

.upload-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.upload-header label {
  margin-right: 10px;
}

.file-list {
  margin-top: 10px;
}

.file-list table {
  width: 100%;
  border-collapse: collapse;
}

.file-list td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.dialog-footer {
  text-align: right;
}
</style>