<template>
<h2>主圖</h2>
<img :src="`${path}${mainImageUrl}`" type="button" @click="mainPicClick()">


<h2>清單圖</h2>
<div class="image-gallery">
<div v-for="listImageId in listImageUrl" :key="listImageId.id" class="image-wrapper">
<img :src="`${path}${listImageId.imageId}`" alt="" class="uniform-image" @click="listPicClick(listImageId.imageId)" type="button">
</div>
</div>


 <!-- 主圖 -->
 <div class="dialog-wrapper">
    <el-dialog v-model="newDialogVisible" title="選擇主圖" width="600px" class="centered-dialog">
      <div class="dialog-content">
        <div class="upload-section">
          <div class="upload-header">
            <label for="images">檔案：</label>
            <FileUpload class="btn btn-primary" accept=".jpg,.png,.jpeg" input-id="images" input-name="images"
              v-model="images" :multiple="false">
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
        <el-button type="primary" @click="Commit(mainImageUrl)">確認修改</el-button>
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
                  <td><el-button type="danger" @click="deleteFile(image.id)">刪除檔案</el-button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="listPicCommit(listImageId)">執行修改</el-button>
      </span>
    </el-dialog>
  </div>

    <!-- =========Modal=========== -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
        <table>
            <tr>
                <td>檔案：</td>
                <td>
                    <FileUpload class="btn btn-primary"	accept=".jpg,.png,.jpeg"
                                input-id="images" input-name="images" v-model="images"
                                :multiple="true">
                        選擇檔案
                    </FileUpload>
                </td>
                <td>
                </td>
            </tr>

            <tr v-for="(image, index) in images" :key="image.id">
                <td></td>
                <td>{{ image.name }}</td>
                <td><input type="button" value="刪除檔案" @click="deleteFile(image.id)"></td>
            </tr>
        </table>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="domultiple()" data-bs-dismiss="modal">確認上傳</button>
      </div>
    </div>
  </div>
</div>
</template>
    
<script setup>
import FileUpload from 'vue-upload-component'
import { ref ,onMounted} from 'vue';
import axios from 'axios';
import axiosapi from '@/plugins/axios';
import { faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { date } from 'quasar';
const kajartaUrl = import.meta.env.VITE_API_URL;
    const path = import.meta.env.VITE_PHOTO;
    const props=defineProps(["imageByCarIdDatas","mainImageUrl","listImageUrl","carId"])
const emits=defineEmits(["uploadImage"]);
const newDialogVisible = ref(false);
const listDialogVisible = ref(false);


const selectImageId=ref(null);
function handleClick(imageId) {
  console.log("imageId="+imageId);
  selectImageId.value=imageId;
  console.log("selectImageId="+selectImageId.value);
}
  
//圖片上傳code

    const images = ref([])

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

    function domultiple(id,isListPic,isMainPic,carId) {
        if (!validate(images.value)) {
          images.value = [];
            return;
        }
        // 利用File物件產生上傳用的HTML Form資料
        let formData = new FormData();
        for(let i = 0; i < images.value.length; i++) {
            formData.append("image", images.value[i].file);
            formData.append("isListPic", isListPic.value);
            formData.append("isMainPic", isMainPic.value);
            formData.append("carId", carId);
        }
        console.log("formData", formData);

        for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}
console.log(`File name: ${images.value[0].name}`);
    console.log(`File size: ${images.value[0].size} bytes`);
    console.log(`File type: ${images.value[0].type}`);
        //使用Axios上傳檔案
        axiosapi.put(`/image/modify/${id}`,formData)
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                location.reload();
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "新增失敗" + error.message,
                icon: "error"
            });
        });
    }

    function deleteFile(id) {
        for (let i = 0; i < images.value.length; i++) {
            if (images.value[i].id === id) {
              images.value.splice(i, 1);
                break;
            }
        }
        console.log("images.value", images.value);
    }


    const isListPic=ref(null);
    const isMainPic=ref(null);
    const carId=props.carId;
    function mainPicClick() {
        newDialogVisible.value = true;
    }

function Commit(id) {
        isListPic.value = 0
        isMainPic.value = 1
    domultiple(id,isListPic,isMainPic,carId)
}

const listImageId=ref(null);
function listPicClick(id){
    listDialogVisible.value = true;
    listImageId.value=id;
}

function listPicCommit(listImageId) {
        isListPic.value = 1
        isMainPic.value = 0
    domultiple(listImageId,isListPic,isMainPic,carId)
}
</script>
    
<style>
    
</style>


<!-- 


<div id="carouselExampleIndicators" class="carousel slide navbarBody">
    <div class="carousel-indicators">
        <button 
        v-for="(imageByCarIdData,index) in imageByCarIdDatas"
        :key="index"
        type="button" 
        :data-bs-target="'#carouselExampleIndicators'" 
        :data-bs-slide-to="index" 
        :class="{active: index === 0}"
        :aria-current="index===0 ? 'true':'false'" 
        :aria-label="'Slide'+(index+1)"></button>
    </div>
    <div class="carousel-inner" >
        <div 
        :class="['carousel-item', {active:index===0}]" 
        v-for="(imageByCarIdData,index) in imageByCarIdDatas" :key="index">
            <img 
            :src="`${path}${imageByCarIdData.id}`" 
            class="d-block w-100" 
            @click="handleClick(imageByCarIdData.id)"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            >
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
  </div>

 -->

<!-- =========Modal=========== -->
<!-- <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <div>
    <table>
        <tr>
            <td>檔案：</td>
            <td>
                <FileUpload class="btn btn-primary"	accept=".jpg,.png,.jpeg"
                            input-id="images" input-name="images" v-model="images"
                            :multiple="true">
                    選擇檔案
                </FileUpload>
            </td>
            <td>
                <label>是否為清單小圖</label>
<select id="isListPic" name="isListPic" @change="doInput('isListPic',$event)" required>
  <option value="" disabled>是否為清單小圖</option>
  <option value="1">是</option>
  <option value="2">否</option>
</select> 
            </td>
        </tr>

        <tr v-for="(image, index) in images" :key="image.id">
            <td></td>
            <td>{{ image.name }}</td>
            <td><input type="button" value="刪除檔案" @click="deleteFile(image.id)"></td>
        </tr>
    </table>
    </div>

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" @click="domultiple()" data-bs-dismiss="modal">確認上傳</button>
  </div>
</div>
</div>
</div> -->



<!-- 

<script setup>
import FileUpload from 'vue-upload-component'
import { ref } from 'vue';
import axios from 'axios';
import axiosapi from '@/plugins/axios';
import { faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { date } from 'quasar';
const kajartaUrl = import.meta.env.VITE_API_URL;
    const path = import.meta.env.VITE_PHOTO;
    const props=defineProps({
      imageByCarIdDatas: {
            type: Array,
    required: true
        }
        })
const emits=defineEmits(["uploadImage"]);

console.log("gggggggggggg",props.imageByCarIdDatas);

const selectImageId=ref(null);
function handleClick(imageId) {
  console.log("imageId="+imageId);
  selectImageId.value=imageId;
  console.log("selectImageId="+selectImageId.value);
}
  
//圖片上傳code

    const images = ref([])

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
        // 利用File物件產生上傳用的HTML Form資料
        let formData = new FormData();
        for(let i = 0; i < images.value.length; i++) {
            formData.append("image", images.value[i].file);
        }
        console.log("formData", formData);

        for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}
console.log(`File name: ${images.value[0].name}`);
    console.log(`File size: ${images.value[0].size} bytes`);
    console.log(`File type: ${images.value[0].type}`);
        //使用Axios上傳檔案
        axiosapi.put(`/image/modify/${selectImageId.value}`,formData)
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                location.reload();
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "新增失敗" + error.message,
                icon: "error"
            });
        });
    }





    function deleteFile(id) {
        for (let i = 0; i < images.value.length; i++) {
            if (images.value[i].id === id) {
              images.value.splice(i, 1);
                break;
            }
        }
        console.log("images.value", images.value);
    }

</script>
    
<style>
    
</style> -->