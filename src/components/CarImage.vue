<template>
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
                <td></td>
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
import { ref } from 'vue';
import axios from 'axios';
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
        axios.put(`${kajartaUrl}/image/modify/${selectImageId.value}`,formData)
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
    
</style>


<!-- CarImage.vue -->
<!-- <template>
    <div id="carouselExampleIndicators" class="carousel slide navbarBody" data-bs-ride="carousel" data-bs-interval="4000">
      <div class="carousel-indicators">
        <button
          v-for="(image, index) in images"
          :key="index"
          type="button"
          :data-bs-target="'#carouselExampleIndicators'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0 ? 'true' : 'false'"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
      <div class="carousel-inner">
        <div v-for="(image, index) in images" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img :src="`${path}${image.id}`" class="d-block w-100">
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
  </template>
  
  <script setup>
  const props = defineProps({
    images: {
      type: Array,
      required: true
    }
  });
  
  const path = import.meta.env.VITE_PHOTO;
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
   -->